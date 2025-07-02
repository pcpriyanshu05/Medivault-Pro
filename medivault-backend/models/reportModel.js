const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
_id: String,
patient_id: String, // reference to patient _id
hospital_id: String, // reference to hospital _id
report_type: String,
file_url: String,
uploaded_at: {
type: Date,
default: Date.now,
}
});

module.exports = mongoose.model("Report", reportSchema);