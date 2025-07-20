const express = require("express");
const router = express.Router();
const {
  getAllHospitals,
  createHospital,
  updateHospital,
  deleteHospital,
  getHospitalById // ✅ Add kiya
} = require("../controllers/hospitalController");

// ✅ Ye route pehle daal — /:id
router.get("/:id", getHospitalById);

// Existing routes
router.get("/", getAllHospitals);
router.post("/", createHospital);
router.put("/:id", updateHospital);
router.delete("/:id", deleteHospital);

module.exports = router;
