const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
_id: String, // unique hospital ID like HOSP001
name: String,
location: String,
contact_email: String,
phone: String,
departments: [String] // e.g. ["Pathology", "Radiology"]
});

module.exports = mongoose.model("Hospital", hospitalSchema);