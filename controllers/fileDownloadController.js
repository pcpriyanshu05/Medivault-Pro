const path = require("path");
const UploadedFile = require("../models/uploadedFileModel");

const downloadFile = async (req, res) => {
  try {
    const file = await UploadedFile.findOne({ _id: req.params.id });

    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    const filePath = path.join(__dirname, "..", "uploads", file.filename);
    res.download(filePath, file.originalname);
  } catch (error) {
    console.error("Download error:", error);
    res.status(500).json({ error: "Download failed" });
  }
};

module.exports = { downloadFile };
