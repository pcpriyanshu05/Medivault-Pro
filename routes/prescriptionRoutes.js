const express = require("express");
const router = express.Router();
const {
getAllPrescriptions,
createPrescription,
updatePrescription,
deletePrescription
} = require("../controllers/prescriptionController");

// ✅ GET all prescriptions
router.get("/", getAllPrescriptions);

// ✅ POST a new prescription
router.post("/", createPrescription);

// ✅ PUT update prescription by ID
router.put("/:id", updatePrescription);

// ✅ DELETE prescription by ID
router.delete("/:id", deletePrescription);

module.exports = router;