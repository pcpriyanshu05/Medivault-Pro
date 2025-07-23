const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ POST /register
exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate role input
    const validRoles = ["patient", "doctor", "hospital"];
    if (role && !validRoles.includes(role)) {
      const error = new Error("Invalid role specified");
      error.statusCode = 400;
      return next(error);
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 400;
      return next(error);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "patient" // Default to patient if no role specified
    });

    const savedUser = await newUser.save();
    res.status(201).json({ 
      message: "User registered successfully", 
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role
      }
    });
  } catch (err) {
    next(err);
  }
};

// ✅ POST /login
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@medivault.com";

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      return next(error);
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      return next(error);
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Determine redirect path based on role
    let redirectPath = '/';
    if (user.email === ADMIN_EMAIL) {
      redirectPath = '/dashboard/admin';
    } else {
      switch(user.role) {
        case 'patient': redirectPath = '/dashboard/patient'; break;
        case 'doctor': redirectPath = '/dashboard/doctor'; break;
        case 'hospital': redirectPath = '/dashboard/hospital'; break;
        default: redirectPath = '/';
      }
    }

    res.status(200).json({
      message: "Login successful",
      token,
      redirectPath, // Frontend will use this for navigation
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    next(err);
  }
};