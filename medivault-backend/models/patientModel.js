const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
_id: String,
dob: String,
gender: String,
address: String,
timeline_events: Array
});

module.exports = mongoose.model("Patient", patientSchema);