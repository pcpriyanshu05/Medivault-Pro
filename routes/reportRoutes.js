const express = require("express");
const router = express.Router();
const {
getAllReports,
createReport,
updateReport,
deleteReport
} = require("../controllers/reportController");

// ✅ GET all reports
router.get("/", getAllReports);

// ✅ POST a new report
router.post("/", createReport);

// ✅ PUT update report by ID
router.put("/:id", updateReport);

// ✅ DELETE report by ID
router.delete("/:id", deleteReport);

module.exports = router;