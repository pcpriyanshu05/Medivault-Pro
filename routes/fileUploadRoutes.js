const express = require("express");
const router = express.Router();
const upload = require("../config/uploadConfig");
const { uploadFile } = require("../controllers/fileuploadController");
router.post("/", upload.single("file"), uploadFile);
module.exports = router;