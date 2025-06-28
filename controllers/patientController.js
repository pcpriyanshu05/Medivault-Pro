const Patient = require("../models/patientModel");

// ✅ GET all patients
exports.getAllPatients = async (req, res, next) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (err) {
    next(err);
  }
};

// ✅ POST a new patient
exports.createPatient = async (req, res, next) => {
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
    next(err);
  }
};

// ✅ PUT: Update patient by ID
exports.updatePatient = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedPatient = await Patient.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedPatient) {
      const error = new Error("Patient not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json(updatedPatient);
  } catch (err) {
    next(err);
  }
};

// ✅ DELETE patient by ID
exports.deletePatient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedPatient = await Patient.findByIdAndDelete(id);
    if (!deletedPatient) {
      const error = new Error("Patient not found");
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (err) {
    next(err);
  }
};
