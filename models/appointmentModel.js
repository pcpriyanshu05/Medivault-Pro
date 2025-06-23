const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
_id: String, // e.g. APPT001
patient_id: String, // linked to patient
doctor_id: String, // linked to doctor
hospital_id: String, // optional
date: String, // can be Date type if needed
time: String,
mode: String, // e.g. "Online", "In-Person"
reason: String // optional: fever, check-up etc.
});

module.exports = mongoose.model("Appointment", appointmentSchema);