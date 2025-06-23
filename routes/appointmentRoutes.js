const express = require("express");
const router = express.Router();
const {
getAllAppointments,
createAppointment,
updateAppointment,
deleteAppointment
} = require("../controllers/appointmentController");

// ✅ GET all appointments
router.get("/", getAllAppointments);

// ✅ POST a new appointment
router.post("/", createAppointment);

// ✅ PUT update appointment by ID
router.put("/:id", updateAppointment);

// ✅ DELETE appointment by ID
router.delete("/:id", deleteAppointment);

module.exports = router;