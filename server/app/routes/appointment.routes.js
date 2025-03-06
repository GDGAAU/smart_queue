const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointment.controller");

router.post("/book", appointmentController.createAppointment);

router.get("/", appointmentController.getAppointments);

router.get("/available-times/:department/:appointment_date", appointmentController.getAvailableTimesForDepartment);


module.exports = router;

