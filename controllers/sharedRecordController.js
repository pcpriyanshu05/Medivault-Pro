const SharedRecord = require("../models/sharedRecordModel");

// ✅ GET all shared records
exports.getAllSharedRecords = async (req, res) => {
try {
const records = await SharedRecord.find();
res.status(200).json(records);
} catch (err) {
res.status(500).json({ error: err.message });
}
};

// ✅ POST a new shared record
exports.createSharedRecord = async (req, res) => {
try {
const newRecord = new SharedRecord({
_id: req.body._id,
patient_id: req.body.patient_id,
shared_with: req.body.shared_with,
record_type: req.body.record_type,
record_id: req.body.record_id,
shared_on: req.body.shared_on,
access_expiry: req.body.access_expiry
});


const saved = await newRecord.save();
res.status(201).json(saved);
} catch (err) {
res.status(500).json({ error: err.message });
}
};

// ✅ PUT update shared record by ID
exports.updateSharedRecord = async (req, res) => {
try {
const { id } = req.params;
const updated = await SharedRecord.findByIdAndUpdate(id, req.body, {
new: true
});


if (!updated) {
  return res.status(404).json({ message: "Shared record not found" });
}

res.status(200).json(updated);
} catch (err) {
res.status(500).json({ error: err.message });
}
};

// ✅ DELETE shared record by ID
exports.deleteSharedRecord = async (req, res) => {
try {
const { id } = req.params;
const deleted = await SharedRecord.findByIdAndDelete(id);


if (!deleted) {
  return res.status(404).json({ message: "Shared record not found" });
}

res.status(200).json({ message: "Shared record deleted successfully" });
} catch (err) {
res.status(500).json({ error: err.message });
}
};