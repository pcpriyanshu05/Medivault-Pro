const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// JWT secret
const JWT_SECRET = "medivault_super_secret_key"; // You can move this to .env later

// ✅ Register a new user
exports.registerUser = async (req, res) => {
try {
const { _id, name, email, password, role } = req.body;


// Check if email already exists
const existingUser = await User.findOne({ email });
if (existingUser) {
  return res.status(400).json({ message: "User already exists with this email" });
}

// Hash password
const hashedPassword = await bcrypt.hash(password, 10);

const newUser = new User({
  _id,
  name,
  email,
  password: hashedPassword,
  role
});

await newUser.save();
res.status(201).json({ message: "User registered successfully" });
} catch (err) {
res.status(500).json({ error: err.message });
}
};

// ✅ Login a user
exports.loginUser = async (req, res) => {
try {
const { email, password } = req.body;


// Find user
const user = await User.findOne({ email });
if (!user) return res.status(404).json({ message: "User not found" });

// Check password
const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) return res.status(401).json({ message: "Invalid password" });

// Generate token
const token = jwt.sign(
  { userId: user._id, role: user.role },
  JWT_SECRET,
  { expiresIn: "1d" }
);

res.status(200).json({ token, user });
} catch (err) {
res.status(500).json({ error: err.message });
}
};