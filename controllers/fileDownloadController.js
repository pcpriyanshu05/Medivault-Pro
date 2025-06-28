const File = require("../models/fileModel");
const path = require("path");

// ✅ GET /files/:id → download file
exports.downloadFile = async (req, res, next) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      const error = new Error("File not found");
      error.statusCode = 404;
      return next(error);
    }

    const fullPath = path.resolve(file.filePath);
    res.download(fullPath, file.originalName);
  } catch (err) {
    next(err);
  }
};
