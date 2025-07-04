const express = require("express");
const router = express.Router();
const {
getAllSharedRecords,
createSharedRecord,
updateSharedRecord,
deleteSharedRecord
} = require("../controllers/sharedRecordController");
router.get("/", getAllSharedRecords);
router.post("/", createSharedRecord);
router.put("/:id", updateSharedRecord);
router.delete("/:id", deleteSharedRecord);
module.exports = router;