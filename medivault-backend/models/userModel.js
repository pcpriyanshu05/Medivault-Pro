const mongoose = require("mongoose");


if (mongoose.connection.models['User']) {
  delete mongoose.connection.models['User'];
}

const userSchema = new mongoose.Schema({
  _id: String, // Preserving your existing ID format
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["patient", "doctor", "hospital"], // Keeping admin from your original
    required: true
  },
  contactNumber: String, // New common field
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", userSchema);