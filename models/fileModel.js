const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  _id: String, // Jaise "FILE001"
  patient_id: String, // Jaise "HID202506240001"
  file_path: String, // Upload hone ke baad file ka path
  uploaded_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("File", fileSchema);
