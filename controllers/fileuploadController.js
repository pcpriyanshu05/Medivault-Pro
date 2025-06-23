const UploadedFile = require("../models/uploadedFileModel");

exports.uploadFile = async (req, res) => {
try {
const file = req.file;
const newFile = new UploadedFile({
_id: req.body._id,
filename: file.filename,
originalname: file.originalname,
patient_id: req.body.patient_id
});


await newFile.save();
res.status(201).json({ message: "File uploaded successfully", file: newFile });
} catch (err) {
res.status(500).json({ error: err.message });
}
};