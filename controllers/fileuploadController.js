const File = require("../models/fileModel");
const path = require("path");

// ✅ POST /upload → store file in DB
exports.uploadFile = async (req, res, next) => {
  try {
    const { _id, patient_id } = req.body;

    if (!req.file) {
      const error = new Error("No file uploaded");
      error.statusCode = 400;
      return next(error);
    }

    const file = new File({
      _id,
      patient_id,
      originalName: req.file.originalname,
      filePath: req.file.path,
      fileType: path.extname(req.file.originalname).toLowerCase(),
    });

    const saved = await file.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};
