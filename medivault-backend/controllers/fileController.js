const File = require("../models/fileModel");

// 📁 GET: All files from DB
const getAllFiles = async (req, res, next) => {
  try {
    const files = await File.find();
    res.status(200).json(files);
  } catch (err) {
    next(err);
  }
};

// 📁 GET: Single file by ID from DB
const getFileById = async (req, res, next) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      const error = new Error("File not found");
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json(file);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllFiles,
  getFileById,
};
