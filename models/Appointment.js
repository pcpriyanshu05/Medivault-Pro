const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  _id: { type: String, required: true },          // VISIT001
  health_id: { type: String, required: true, ref: "Patient" },
  doctor_id: { type: String, required: true },
  hospital_id: { type: String, required: true, ref: "Hospital" },
  visit_date: { type: Date, required: true },
  symptoms: String,
  diagnosis: String,
  prescription_id: { type: String, ref: "Prescription" }
}, { timestamps: true });

module.exports = mongoose.model("Appointment", appointmentSchema);
