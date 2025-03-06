const cron = require("node-cron");
const dbConnection = require("./config/db"); // Ensure correct DB config
const nodemailer = require("nodemailer");

// Create a Nodemailer transporter using your email service provider's details
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use your email service provider, e.g., Gmail, SendGrid, etc.
  auth: {
    user: 'ephraimdebel@gmail.com',  // Your email address
    pass: '7844E7844e!',   // Your email password or App password (for Gmail)
  },
});

// ⏰ Run this job every minute to check for reminders
cron.schedule("* * * * *", async () => {
  try {
    const now = new Date();
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour ahead

    // Format date and time (YYYY-MM-DD and HH:MM)
    const formattedDate = oneHourLater.toISOString().split("T")[0];
    const formattedTime = oneHourLater.toTimeString().split(" ")[0].substring(0, 5);

    // 🔍 Find appointments exactly 1 hour from now
    const [appointments] = await dbConnection.query(
      "SELECT name, email, appointment_time FROM appointments WHERE appointment_date = ? AND appointment_time = ?",
      [formattedDate, formattedTime]
    );

    // 🚀 Send reminders via email
    for (const appointment of appointments) {
      const mailOptions = {
        from: 'ephraimdebel@gmail.com', // Your email address
        to: appointment.email,        // Recipient's email address
        subject: `Appointment Reminder - ${appointment.appointment_time}`,
        text: `Hello ${appointment.name},\n\nThis is a reminder for your appointment at ${appointment.appointment_time}.\nPlease arrive on time.\n\nThank you!`
      };

      // Send the email
      await transporter.sendMail(mailOptions);

      console.log(`✅ Reminder email sent to ${appointment.email} for appointment at ${appointment.appointment_time}`);
    }
  } catch (error) {
    console.error("❌ Error sending reminders:", error.message);
  }
});

console.log("⏳ Reminder service is running...");
