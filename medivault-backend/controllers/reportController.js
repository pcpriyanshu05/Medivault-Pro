const Report = require("../models/reportModel");

// ✅ GET all reports
exports.getAllReports = async (req, res, next) => {
  try {
    const reports = await Report.find();
    res.status(200).json(reports);
  } catch (err) {
    next(err);
  }
};

// ✅ POST a new report
exports.createReport = async (req, res, next) => {
  try {
    const newReport = new Report(req.body);
    const savedReport = await newReport.save();
    res.status(201).json(savedReport);
  } catch (err) {
    next(err);
  }
};

// ✅ PUT update report by ID
exports.updateReport = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedReport = await Report.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedReport) {
      const error = new Error("Report not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json(updatedReport);
  } catch (err) {
    next(err);
  }
};

// ✅ DELETE report by ID
exports.deleteReport = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedReport = await Report.findByIdAndDelete(id);

    if (!deletedReport) {
      const error = new Error("Report not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({ message: "Report deleted successfully" });
  } catch (err) {
    next(err);
  }
};
