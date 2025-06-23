const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
_id: String, // e.g. DOC001
name: String,
specialization: String,
experience_years: Number,
hospital_id: String, // linked to hospital
contact_email: String,
phone: String
});

module.exports = mongoose.model("Doctor", doctorSchema);