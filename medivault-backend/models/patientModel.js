const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  _id: String, // Keeping your existing ID
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  dob: String, // Keeping your existing
  gender: {
    type: String,
    enum: ["male", "female", "other"] // Added enum validation
  },
  address: String, // Existing
  contactNumber: String, // Added (duplicate from User for direct access)
  medicalHistory: [String], // Added as array
  timeline_events: Array // Keeping your existing
});

module.exports = mongoose.model("Patient", patientSchema);