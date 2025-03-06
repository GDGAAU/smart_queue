const dbConnection = require("../../config/db"); // Ensure the path is correct
const { StatusCodes } = require("http-status-codes");

const nodemailer = require("nodemailer");



const createAppointment = async (req, res) => {
    const { name, email, phone, department, doctor, appointment_date, appointment_time, standby, has_lab_results } = req.body;
  
    if (!name || !email || !phone || !department || !doctor || !appointment_date || !appointment_time) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "All fields are required: name, email, phone, department, doctor, appointment_date, appointment_time."
      });
    }
  
    try {
      // Directly insert the appointment since we are already displaying only available slots to users
      await dbConnection.query(
        "INSERT INTO Appointments (name, email, phone, department, doctor, appointment_date, appointment_time, standby, has_lab_results) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [name, email, phone, department, doctor, appointment_date, appointment_time, standby, has_lab_results]
      );
  
      return res.status(StatusCodes.CREATED).json({ message: "Appointment created successfully" });
    } catch (error) {
      console.error("Error creating appointment:", error.message);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong, please try again later."
      });
    }
  };
  

const getAppointments = async (req, res) => {
  try {
    // Fetch all appointments from the database
    const [appointments] = await dbConnection.query("SELECT * FROM Appointments");

    return res.status(StatusCodes.OK).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong, please try again later."
    });
  }
};


const getAvailableTimesForDepartment = async (req, res) => {
    const { department, appointment_date } = req.query;
  
    try {
      // Fetch booked slots for the selected department and date
      const [bookedAppointments] = await dbConnection.query(
        "SELECT appointment_time FROM Appointments WHERE department = ? AND appointment_date = ?",
        [department, appointment_date]
      );
  
      // AI-estimated slot duration per department (Example: Cardiology takes 30 mins)
      const departmentDurations = {
        "Cardiology": 30,
        "Dermatology": 20,
        "General": 15,
        "Laboratory": 10, // Laboratory results take less time
      };
  
      const slotDuration = departmentDurations[department] || 20; 
  
      // Generate all possible slots based on opening hours
      const generateTimeSlots = (start, end, interval) => {
        const slots = [];
        let currentTime = new Date(`1970-01-01T${start}:00`);
        const endTime = new Date(`1970-01-01T${end}:00`);
  
        while (currentTime < endTime) {
          slots.push(currentTime.toTimeString().substring(0, 5)); 
          currentTime.setMinutes(currentTime.getMinutes() + interval);
        }
  
        return slots;
      };
  
      // Define working hours (Example: 9 AM - 5 PM)
      const allSlots = generateTimeSlots("09:00", "17:00", slotDuration);
  
      // Extract booked times
      const bookedTimes = bookedAppointments.map(app => app.appointment_time);
  
      // Filter only available slots
      const availableSlots = allSlots.filter(slot => !bookedTimes.includes(slot));
    
      return res.status(200).json({ availableSlots });
    } catch (error) {
      console.error("Error fetching available slots:", error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  }



// Create a Nodemailer transporter using your email service provider's details
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use your email service provider (e.g., Gmail, SendGrid, etc.)
  auth: {
    user: 'your-email@gmail.com',  // Your email address
    pass: 'your-email-password',   // Your email password or App password (for Gmail)
  },
});

// Function to cancel an appointment
const cancelAppointment = async (req, res) => {
  const { appointment_id } = req.body;

  if (!appointment_id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Appointment ID is required to cancel an appointment.",
    });
  }

  try {
    // Step 1: Get appointment details before deleting
    const [appointment] = await dbConnection.query(
      "SELECT appointment_date, appointment_time, department FROM Appointments WHERE id = ?",
      [appointment_id]
    );

    if (appointment.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Appointment not found." });
    }

    const { appointment_date, appointment_time, department } = appointment[0];

    // Step 2: Delete the appointment
    await dbConnection.query("DELETE FROM Appointments WHERE id = ?", [appointment_id]);

    console.log(`Appointment ${appointment_id} canceled. Checking standby users...`);

    // Step 3: Check standby users for this department and date
    const [standbyUsers] = await dbConnection.query(
      "SELECT id, name, email FROM Standby_Users WHERE department = ? AND appointment_date = ? ORDER BY created_at ASC LIMIT 1",
      [department, appointment_date]
    );

    if (standbyUsers.length > 0) {
      const { id: standby_id, name, email } = standbyUsers[0];

      console.log(`Notifying standby user ${name} at ${email}`);

      // Send Email Notification
      sendEmail(
        email,
        `Appointment Slot Available - ${department}`,
        `Hello ${name},\n\nAn appointment slot has become available for ${department} on ${appointment_date} at ${appointment_time}. Please reply to confirm.\n\nThank you!`
      );

      // Step 4: Remove the user from the standby list
      await dbConnection.query("DELETE FROM Standby_Users WHERE id = ?", [standby_id]);
    }

    return res.status(StatusCodes.OK).json({
      message: "Appointment canceled. Standby users notified if available.",
    });
  } catch (error) {
    console.error("Error canceling appointment:", error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong, please try again later.",
    });
  }
};

// Function to send email notifications
const sendEmail = (email, subject, message) => {
  const mailOptions = {
    from: 'your-email@gmail.com', // Your email address
    to: email,                   // Recipient's email address
    subject: subject,            // Email subject
    text: message,               // Email body
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error.message);
    } else {
      console.log(`📩 Email sent to ${email}: ${info.response}`);
    }
  });
};

  


module.exports = {
  createAppointment,
  getAppointments,
  getAvailableTimesForDepartment,
  cancelAppointment

};
