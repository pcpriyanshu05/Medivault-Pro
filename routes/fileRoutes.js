const express = require("express");
const router = express.Router();
const { downloadFile } = require("../controllers/fileDownloadController");
router.get("/:id", downloadFile);
module.exports = router;
