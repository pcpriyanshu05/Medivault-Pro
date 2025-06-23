const Prescription = require("../models/prescriptionModel");

// ✅ GET all prescriptions
exports.getAllPrescriptions = async (req, res) => {
try {
const prescriptions = await Prescription.find();
res.status(200).json(prescriptions);
} catch (err) {
res.status(500).json({ error: err.message });
}
};

// ✅ POST a new prescription
exports.createPrescription = async (req, res) => {
try {
const newPrescription = new Prescription({
_id: req.body._id,
patient_id: req.body.patient_id,
doctor_name: req.body.doctor_name,
hospital_id: req.body.hospital_id,
date: req.body.date,
medicines: req.body.medicines,
notes: req.body.notes
});


const savedPrescription = await newPrescription.save();
res.status(201).json(savedPrescription);
} catch (err) {
res.status(500).json({ error: err.message });
}
};

// ✅ PUT: Update prescription by ID
exports.updatePrescription = async (req, res) => {
try {
const { id } = req.params;

const updated = await Prescription.findByIdAndUpdate(id, req.body, {
  new: true,
});

if (!updated) {
  return res.status(404).json({ message: "Prescription not found" });
}

res.status(200).json(updated);
} catch (err) {
res.status(500).json({ error: err.message });
}
};

// ✅ DELETE: Remove prescription by ID
exports.deletePrescription = async (req, res) => {
try {
const { id } = req.params;


const deleted = await Prescription.findByIdAndDelete(id);

if (!deleted) {
  return res.status(404).json({ message: "Prescription not found" });
}

res.status(200).json({ message: "Prescription deleted successfully" });
} catch (err) {
res.status(500).json({ error: err.message });
}
};