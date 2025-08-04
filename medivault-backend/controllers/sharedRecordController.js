
const SharedRecord = require("../models/sharedRecordModel");

// ✅ GET all shared records (paginated, filter by shared_with)
exports.getAllSharedRecords = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const sharedWith = req.query.shared_with;
    const filter = sharedWith ? { shared_with: sharedWith } : {};

    const records = await SharedRecord.find(filter)
      .select('_id patient_id record_type record_id shared_on access_expiry')
      .skip(skip)
      .limit(limit);
    const total = await SharedRecord.countDocuments(filter);

    res.status(200).json({
      records,
      page,
      totalPages: Math.ceil(total / limit),
      total
    });
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

// NOTE: Add an index to shared_with in the model for performance if not already present.
