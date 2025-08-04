const Patient = require("../models/patientModel");

// ✅ GET all patients (paginated, select fields)
exports.getAllPatients = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Uncomment and adjust if you add doctor_id to Patient model
    // const doctorId = req.user.id;
    // const filter = { doctor_id: doctorId };
    const filter = {};

    const patients = await Patient.find(filter)
      .select('_id name user_id')
      .skip(skip)
      .limit(limit);
    const total = await Patient.countDocuments(filter);

    res.status(200).json({
      patients,
      page,
      totalPages: Math.ceil(total / limit),
      total
    });
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
//fetch patient by id
exports.getPatientById = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.status(200).json(patient);
  } catch (err) {
    next(err);
  }
};

