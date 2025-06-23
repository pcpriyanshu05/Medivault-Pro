const express = require("express");
const router = express.Router();
const {
getAllHospitals,
createHospital,
updateHospital,
deleteHospital
} = require("../controllers/hospitalController");

// ✅ GET all hospitals
router.get("/", getAllHospitals);

// ✅ POST a new hospital
router.post("/", createHospital);

// ✅ PUT update hospital by ID
router.put("/:id", updateHospital);

// ✅ DELETE hospital by ID
router.delete("/:id", deleteHospital);

module.exports = router;