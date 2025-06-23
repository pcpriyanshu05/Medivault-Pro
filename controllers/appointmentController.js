const Appointment = require("../models/appointmentModel");

// ✅ GET all appointments
exports.getAllAppointments = async (req, res) => {
try {
const appointments = await Appointment.find();
res.status(200).json(appointments);
} catch (err) {
res.status(500).json({ error: err.message });
}
};

// ✅ POST a new appointment
exports.createAppointment = async (req, res) => {
try {
const newAppt = new Appointment({
_id: req.body._id,
patient_id: req.body.patient_id,
doctor_id: req.body.doctor_id,
hospital_id: req.body.hospital_id,
date: req.body.date,
time: req.body.time,
mode: req.body.mode,
reason: req.body.reason
});


const saved = await newAppt.save();
res.status(201).json(saved);
} catch (err) {
res.status(500).json({ error: err.message });
}
};

// ✅ PUT update appointment by ID
exports.updateAppointment = async (req, res) => {
try {
const { id } = req.params;


const updated = await Appointment.findByIdAndUpdate(id, req.body, {
  new: true
});

if (!updated) {
  return res.status(404).json({ message: "Appointment not found" });
}

res.status(200).json(updated);
} catch (err) {
res.status(500).json({ error: err.message });
}
};

// ✅ DELETE appointment by ID
exports.deleteAppointment = async (req, res) => {
try {
const { id } = req.params;


const deleted = await Appointment.findByIdAndDelete(id);

if (!deleted) {
  return res.status(404).json({ message: "Appointment not found" });
}

res.status(200).json({ message: "Appointment deleted successfully" });
} catch (err) {
res.status(500).json({ error: err.message });
}
};