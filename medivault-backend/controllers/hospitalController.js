const Hospital = require("../models/hospitalModel");

// ✅ GET all hospitals
exports.getAllHospitals = async (req, res, next) => {
  try {
    const hospitals = await Hospital.find();
    res.status(200).json(hospitals);
  } catch (err) {
    next(err);
  }
};

// ✅ POST a new hospital
exports.createHospital = async (req, res, next) => {
  try {
    const newHospital = new Hospital(req.body);
    const savedHospital = await newHospital.save();
    res.status(201).json(savedHospital);
  } catch (err) {
    next(err);
  }
};

// ✅ PUT update hospital by ID
exports.updateHospital = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedHospital = await Hospital.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedHospital) {
      const error = new Error("Hospital not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json(updatedHospital);
  } catch (err) {
    next(err);
  }
};

// ✅ DELETE hospital by ID
exports.deleteHospital = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedHospital = await Hospital.findByIdAndDelete(id);

    if (!deletedHospital) {
      const error = new Error("Hospital not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({ message: "Hospital deleted successfully" });
  } catch (err) {
    next(err);
  }
};
