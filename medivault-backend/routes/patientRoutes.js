const express = require("express");
const router = express.Router();
const {
  getAllPatients,
  createPatient,
  updatePatient,
  deletePatient
} = require("../controllers/patientController");

// ✅ JWT middleware
const { verifyToken, isAdmin, isDoctor } = require("../middleware/verifyToken");

// ✅ Validator middleware
const { body, validationResult } = require("express-validator");

// ✅ GET all patients (doctor only)
router.get("/", verifyToken, isDoctor, getAllPatients);

// ✅ POST a new patient (admin only, with validation)
router.post(
  "/",
  verifyToken,
  isAdmin,
  [
    body("_id").notEmpty().withMessage("Patient ID (_id) is required"),
    body("dob").isISO8601().withMessage("DOB must be a valid date"),
    body("gender").isIn(["male", "female", "other"]).withMessage("Gender must be male/female/other"),
    body("address").optional().isString().withMessage("Address must be a string"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  createPatient
);

// ✅ PUT update patient by ID (admin only)
router.put("/:id", verifyToken, isAdmin, updatePatient);

// ✅ DELETE patient by ID (admin only)
router.delete("/:id", verifyToken, isAdmin, deletePatient);

module.exports = router;
