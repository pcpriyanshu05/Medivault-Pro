const Prescription = require("../models/prescriptionModel");

// ✅ GET all prescriptions
exports.getAllPrescriptions = async (req, res, next) => {
  try {
    const prescriptions = await Prescription.find();
    res.status(200).json(prescriptions);
  } catch (err) {
    next(err);
  }
};

// ✅ POST a new prescription
exports.createPrescription = async (req, res, next) => {
  try {
    const newPrescription = new Prescription(req.body);
    const savedPrescription = await newPrescription.save();
    res.status(201).json(savedPrescription);
  } catch (err) {
    next(err);
  }
};

// ✅ PUT update prescription by ID
exports.updatePrescription = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedPrescription = await Prescription.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedPrescription) {
      const error = new Error("Prescription not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json(updatedPrescription);
  } catch (err) {
    next(err);
  }
};

// ✅ DELETE prescription by ID
exports.deletePrescription = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedPrescription = await Prescription.findByIdAndDelete(id);

    if (!deletedPrescription) {
      const error = new Error("Prescription not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({ message: "Prescription deleted successfully" });
  } catch (err) {
    next(err);
  }
};
