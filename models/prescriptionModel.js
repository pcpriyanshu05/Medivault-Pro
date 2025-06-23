const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
_id: String, // e.g. PRESC001
patient_id: String, // linked to patient
doctor_name: String,
hospital_id: String, // optional
date: {
type: Date,
default: Date.now,
},
medicines: [
{
name: String,
dosage: String,
frequency: String
}
],
notes: String
});

module.exports = mongoose.model("Prescription", prescriptionSchema);