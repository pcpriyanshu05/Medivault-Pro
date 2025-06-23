const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  _id: { type: String, required: true },          // HOSP001
  name: { type: String, required: true },
  location: String,
  admin_user_id: { type: String, required: true } // Who manages this hospital
}, { timestamps: true });

module.exports = mongoose.model("Hospital", hospitalSchema);
