
const SharedRecord = require("../models/sharedRecordModel");

// ✅ GET all shared records
exports.getAllSharedRecords = async (req, res, next) => {
  try {
    const records = await SharedRecord.find();
    res.status(200).json(records);
  } catch (err) {
    next(err);
  }
};

// ✅ POST a new shared record
exports.createSharedRecord = async (req, res, next) => {
  try {
    const newRecord = new SharedRecord(req.body);
    const saved = await newRecord.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

// ✅ PUT update shared record by ID
exports.updateSharedRecord = async (req, res, next) => {
  try {
    const updated = await SharedRecord.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      const error = new Error("Shared Record not found");
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

// ✅ DELETE shared record by ID
exports.deleteSharedRecord = async (req, res, next) => {
  try {
    const deleted = await SharedRecord.findByIdAndDelete(req.params.id);
    if (!deleted) {
      const error = new Error("Shared Record not found");
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json({ message: "Shared record deleted successfully" });
  } catch (err) {
    next(err);
  }
};
