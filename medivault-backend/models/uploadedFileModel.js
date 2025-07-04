const mongoose = require("mongoose");

const uploadedFileSchema = new mongoose.Schema({
_id: String, // e.g. FILE001
filename: String,
originalname: String,
patient_id: String, // optional linkage
uploaded_on: {
type: Date,
default: Date.now
}
});

module.exports = mongoose.model("UploadedFile", uploadedFileSchema);