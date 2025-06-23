const express = require("express");
const router = express.Router();
const {
getAllDoctors,
createDoctor,
updateDoctor,
deleteDoctor
} = require("../controllers/doctorController");

// ✅ GET all doctors
router.get("/", getAllDoctors);

// ✅ POST a new doctor
router.post("/", createDoctor);

// ✅ PUT update doctor by ID
router.put("/:id", updateDoctor);

// ✅ DELETE doctor by ID
router.delete("/:id", deleteDoctor);

module.exports = router;