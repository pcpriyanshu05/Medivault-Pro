const Hospital = require("../models/hospitalModel");

// ✅ GET all hospitals
exports.getAllHospitals = async (req, res) => {
try {
const hospitals = await Hospital.find();
res.status(200).json(hospitals);
} catch (err) {
res.status(500).json({ error: err.message });
}
};

// ✅ POST a new hospital
exports.createHospital = async (req, res) => {
try {
const newHospital = new Hospital({
_id: req.body._id,
name: req.body.name,
location: req.body.location,
contact_email: req.body.contact_email,
phone: req.body.phone,
departments: req.body.departments
});


const savedHospital = await newHospital.save();
res.status(201).json(savedHospital);
} catch (err) {
res.status(500).json({ error: err.message });
}
};

// ✅ PUT update hospital by ID
exports.updateHospital = async (req, res) => {
try {
const { id } = req.params;


const updated = await Hospital.findByIdAndUpdate(id, req.body, {
  new: true
});

if (!updated) {
  return res.status(404).json({ message: "Hospital not found" });
}

res.status(200).json(updated);
} catch (err) {
res.status(500).json({ error: err.message });
}
};

// ✅ DELETE hospital by ID
exports.deleteHospital = async (req, res) => {
try {
const { id } = req.params;


const deleted = await Hospital.findByIdAndDelete(id);

if (!deleted) {
  return res.status(404).json({ message: "Hospital not found" });
}

res.status(200).json({ message: "Hospital deleted successfully" });
} catch (err) {
res.status(500).json({ error: err.message });
}
};