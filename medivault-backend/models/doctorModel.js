const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  _id: String, // Keeping your existing
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  name: String, // Keeping (redundant with User but preserved)
  licenseNumber: { // Added
    type: String,
    required: true,
    unique: true
  },
  specialization: String, // Existing
  experience_years: Number, // Existing (keeping your snake_case)
  hospital_id: String, // Keeping your existing reference
  contact_email: String, // Existing
  phone: String // Existing (same as contactNumber in User)
});

module.exports = mongoose.model("Doctor", doctorSchema);