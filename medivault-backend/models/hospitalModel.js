const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  _id: String, // Keeping your existing
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  name: String, // Existing
  location: String, // Existing (same as address)
  city: String, // Added
  state: String, // Added
  pinCode: String, // Added
  contact_email: String, // Existing
  phone: String, // Existing
  departments: [String], // Existing
  hospitalEmail: { // Added
    type: String,
    unique: true
  }
});

module.exports = mongoose.model("Hospital", hospitalSchema);