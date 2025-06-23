const mongoose = require("mongoose");

const timelineEventSchema = new mongoose.Schema({
  type: { type: String, required: true },         // e.g., 'report'
  ref_id: { type: String, required: true },       // report ID
  timestamp: { type: Date, default: Date.now }
});

const patientSchema = new mongoose.Schema({
  _id: { type: String, required: true },          // HID202506210001
  dob: { type: Date, required: true },
  gender: { type: String, enum: ["male", "female", "other"] },
  address: String,
  timeline_events: [timelineEventSchema]
}, { timestamps: true });

module.exports = mongoose.model("Patient", patientSchema);
