const express = require("express");
const router = express.Router();
const {
getAllSharedRecords,
createSharedRecord,
updateSharedRecord,
deleteSharedRecord
} = require("../controllers/sharedRecordController");

// ✅ GET all shared records
router.get("/", getAllSharedRecords);

// ✅ POST a new shared record
router.post("/", createSharedRecord);

// ✅ PUT update shared record by ID
router.put("/:id", updateSharedRecord);

// ✅ DELETE shared record by ID
router.delete("/:id", deleteSharedRecord);

module.exports = router;