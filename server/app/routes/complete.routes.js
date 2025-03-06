const express = require("express");
const { markAppointmentAsCompleted, getQueueStatus } = require("../controllers/completed.controller");
const router = express.Router();



// Endpoints
router.post('/mark-appointment-completed', markAppointmentAsCompleted);
router.get('/queue-status', getQueueStatus);

module.exports = router;