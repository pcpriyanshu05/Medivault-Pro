const mongoose = require("mongoose");

const sharedRecordSchema = new mongoose.Schema({
_id: String, // e.g. SHARE001
patient_id: String, // kis patient ne share kiya
shared_with: String, // user ID ya email jise share kiya
record_type: String, // e.g. "report", "prescription"
record_id: String, // report/prescription ID
shared_on: {
type: Date,
default: Date.now
},
access_expiry: Date // kab tak dekh sakta hai
});

module.exports = mongoose.model("SharedRecord", sharedRecordSchema);