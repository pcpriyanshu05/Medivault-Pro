const express = require("express");
const router = express.Router();
const Patient = require("../models/patientModel");

// ✅ GET all patients
router.get("/", async (req, res) => {
try {
const patients = await Patient.find();
res.json(patients);
} catch (err) {
res.status(500).json({ error: err.message });
}
});

// ✅ POST a new patient
router.post("/", async (req, res) => {
try {
const newPatient = new Patient({
_id: req.body._id,
dob: req.body.dob,
gender: req.body.gender,
address: req.body.address,
timeline_events: req.body.timeline_events
});


const savedPatient = await newPatient.save();
res.status(201).json(savedPatient);
} catch (err) {
res.status(500).json({ error: err.message });
}
});

module.exports = router;