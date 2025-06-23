const Doctor = require("../models/doctorModel");

// ✅ GET all doctors
exports.getAllDoctors = async (req, res) => {
try {
const doctors = await Doctor.find();
res.status(200).json(doctors);
} catch (err) {
res.status(500).json({ error: err.message });
}
};

// ✅ POST a new doctor
exports.createDoctor = async (req, res) => {
try {
const newDoctor = new Doctor({
_id: req.body._id,
name: req.body.name,
specialization: req.body.specialization,
experience_years: req.body.experience_years,
hospital_id: req.body.hospital_id,
contact_email: req.body.contact_email,
phone: req.body.phone
});


const savedDoctor = await newDoctor.save();
res.status(201).json(savedDoctor);
} catch (err) {
res.status(500).json({ error: err.message });
}
};

// ✅ PUT update doctor by ID
exports.updateDoctor = async (req, res) => {
try {
const { id } = req.params;


const updatedDoctor = await Doctor.findByIdAndUpdate(id, req.body, {
  new: true
});

if (!updatedDoctor) {
  return res.status(404).json({ message: "Doctor not found" });
}

res.status(200).json(updatedDoctor);
} catch (err) {
res.status(500).json({ error: err.message });
}
};

// ✅ DELETE doctor by ID
exports.deleteDoctor = async (req, res) => {
try {
const { id } = req.params;


const deletedDoctor = await Doctor.findByIdAndDelete(id);

if (!deletedDoctor) {
  return res.status(404).json({ message: "Doctor not found" });
}

res.status(200).json({ message: "Doctor deleted successfully" });
} catch (err) {
res.status(500).json({ error: err.message });
}
};