const express = require("express");
const router = express.Router();
const {
getAllPatients,
createPatient,
updatePatient,
deletePatient
} = require("../controllers/patientController");

// ✅ GET all patients
router.get("/", getAllPatients);

// ✅ POST a new patient
router.post("/", createPatient);

// ✅ PUT: update patient by ID
router.put("/:id", updatePatient);

// ✅ DELETE patient by ID
router.delete("/:id", deletePatient);
module.exports = router;