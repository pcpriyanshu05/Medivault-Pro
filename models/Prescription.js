const mongoose = require("mongoose");

const medicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  frequency: { type: String, required: true }
});

const prescriptionSchema = new mongoose.Schema({
  _id: { type: String, required: true },           // RX001
  health_id: { type: String, required: true, ref: "Patient" },
  doctor_id: { type: String, required: true },
  date: { type: Date, required: true },
  notes: String,
  medications: [medicationSchema]
}, { timestamps: true });

module.exports = mongoose.model("Prescription", prescriptionSchema);
