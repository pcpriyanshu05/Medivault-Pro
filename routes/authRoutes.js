const express = require("express");
const router = express.Router();
const {
registerUser,
loginUser
} = require("../controllers/authController");

// ✅ POST /api/auth/register → signup
router.post("/register", registerUser);

// ✅ POST /api/auth/login → login
router.post("/login", loginUser);

module.exports = router;