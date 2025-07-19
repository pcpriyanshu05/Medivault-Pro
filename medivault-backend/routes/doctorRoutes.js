const express = require("express");
const router = express.Router();
const {
  getAllDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getCurrentDoctor // ✅ New controller function
} = require("../controllers/doctorController");
const { verifyToken, isDoctor } = require("../middleware/verifyToken"); // ✅ Add auth middleware

// ✅ Add this new route (above others)
router.get("/me", verifyToken, isDoctor, getCurrentDoctor);

// Existing routes
router.get("/", getAllDoctors);
router.post("/", createDoctor);
router.put("/:id", updateDoctor);
router.delete("/:id", deleteDoctor);

module.exports = router;