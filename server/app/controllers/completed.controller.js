const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const dbConnection = require("../../config/db");
const { StatusCodes } = require("http-status-codes");

const app = express();
const server = http.createServer(app);
const io = socketIo(server); // Initialize socket.io

// Middleware to parse JSON requests
app.use(express.json());

// Real-time update when the queue changes (e.g., appointment completed)
io.on('connection', (socket) => {
  console.log('A user connected');
  
  // You can emit events to the client like this
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Function to handle the time-based scheduling and move to the next customer
const markAppointmentAsCompleted = async (req, res) => {
  const { appointment_id } = req.body;

  if (!appointment_id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Appointment ID is required to mark as completed.",
    });
  }

  try {
    // Step 1: Get the appointment details before updating (optional)
    const [appointment] = await dbConnection.query(
      "SELECT appointment_date, appointment_time, department FROM Appointments WHERE id = ?",
      [appointment_id]
    );

    if (appointment.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Appointment not found." });
    }

    const { appointment_date, appointment_time, department } = appointment[0];

    // Step 2: Define the time durations per department (in minutes)
    

    // Step 3: Update the appointment status to "completed"
    await dbConnection.query(
      "UPDATE Appointments SET status = 'completed' WHERE id = ?",
      [appointment_id]
    );

    // Step 4: Find the next customer based on the existing schedule
    const [nextCustomer] = await dbConnection.query(
      "SELECT * FROM Appointments WHERE appointment_date = ? AND appointment_time > ? AND status = 'scheduled' ORDER BY appointment_time LIMIT 1",
      [appointment_date, appointment_time]
    );

    if (nextCustomer.length > 0) {
      const { id, name, email, phone, department, doctor } = nextCustomer[0];

      // Emit real-time update to the admin and customers
      io.emit('queue-update', { message: `Next customer: ${name}`, nextCustomer: nextCustomer[0] });
    }

    // Step 5: Return success message
    return res.status(StatusCodes.OK).json({
      message: "Appointment marked as completed. The next customer is being served.",
    });
  } catch (error) {
    console.error("Error marking appointment as completed:", error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong, please try again later.",
    });
  }
};

// Function to get appointments and the queue status (optional, for the admin)
const getQueueStatus = async (req, res) => {
  try {
    const [appointments] = await dbConnection.query(
      "SELECT * FROM Appointments WHERE status = 'scheduled' ORDER BY appointment_time"
    );

    return res.status(StatusCodes.OK).json({ queue: appointments });
  } catch (error) {
    console.error("Error fetching queue status:", error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong, please try again later.",
    });
  }
};

module.exports = { markAppointmentAsCompleted, getQueueStatus };    



