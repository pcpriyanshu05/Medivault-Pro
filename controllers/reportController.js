

const Report = require("../models/reportModel");

// ✅ 1. GET all reports
exports.getAllReports = async (req, res) => {
try {
const reports = await Report.find();
res.status(200).json(reports);
} catch (err) {
res.status(500).json({ error: err.message });
}
};

// ✅ 2. POST a new report
exports.createReport = async (req, res) => {
try {
const newReport = new Report({
_id: req.body._id,
patient_id: req.body.patient_id,
hospital_id: req.body.hospital_id,
report_type: req.body.report_type,
file_url: req.body.file_url,
uploaded_at: req.body.uploaded_at,
});


const savedReport = await newReport.save();
res.status(201).json(savedReport);
} catch (err) {
res.status(500).json({ error: err.message });
}
};

// ✅ 3. PUT (update) a report by ID
exports.updateReport = async (req, res) => {
try {
const { id } = req.params;


const updatedReport = await Report.findByIdAndUpdate(id, req.body, {
  new: true,
});

if (!updatedReport) {
  return res.status(404).json({ message: "Report not found" });
}

res.status(200).json(updatedReport);
} catch (err) {
res.status(500).json({ error: err.message });
}
};

// ✅ 4. DELETE a report by ID
exports.deleteReport = async (req, res) => {
try {
const { id } = req.params;


const deletedReport = await Report.findByIdAndDelete(id);

if (!deletedReport) {
  return res.status(404).json({ message: "Report not found" });
}

res.status(200).json({ message: "Report deleted successfully" });
} catch (err) {
res.status(500).json({ error: err.message });
}
};