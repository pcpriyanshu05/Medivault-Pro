const Doctor = require("../models/doctorModel");
// ✅ GET current doctor's profile
exports.getCurrentDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findOne({ _id: req.user.id });
    
    if (!doctor) {
      const error = new Error("Doctor not found");
      error.statusCode = 404;
      return next(error);
    }

    // Remove sensitive data if needed
    const doctorData = doctor.toObject();
    res.status(200).json(doctorData);
  } catch (err) {
    next(err);
  }
};

// ✅ GET all doctors
exports.getAllDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (err) {
    next(err);
  }
};

// ✅ POST a new doctor
exports.createDoctor = async (req, res, next) => {
  try {
    const newDoctor = new Doctor(req.body);
    const savedDoctor = await newDoctor.save();
    res.status(201).json(savedDoctor);
  } catch (err) {
    next(err);
  }
};

// ✅ PUT update doctor by ID
exports.updateDoctor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedDoctor = await Doctor.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedDoctor) {
      const error = new Error("Doctor not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json(updatedDoctor);
  } catch (err) {
    next(err);
  }
};

// ✅ DELETE doctor by ID
exports.deleteDoctor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedDoctor = await Doctor.findByIdAndDelete(id);

    if (!deletedDoctor) {
      const error = new Error("Doctor not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (err) {
    next(err);
  }
};
