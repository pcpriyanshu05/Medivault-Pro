const User = require("../models/userModel");
const Doctor = require("../models/doctorModel");
const Patient = require("../models/patientModel");
const Hospital = require("../models/hospitalModel");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// ✅ POST /register
exports.registerUser = async (req, res, next) => {
try {
const {
name,
email,
password,
role,
// patient
age,
gender,
address,
contactNumber,
medicalHistory,
// doctor
licenseNumber,
specialization,
hospitalId,
experienceYears,
// hospital
hospitalName,
location,
city,
state,
pinCode,
hospitalPhone,
hospitalEmail
} = req.body;


const validRoles = ["patient", "doctor", "hospital"];
if (!validRoles.includes(role)) {
  return res.status(400).json({ message: "Invalid role specified" });
}

const existingUser = await User.findOne({ email });
if (existingUser) {
  return res.status(400).json({ message: "User already exists" });
}

const hashedPassword = await bcrypt.hash(password, 10);

const newUser = new User({
  name,
  email,
  password: hashedPassword,
  role,
  contactNumber
});

const savedUser = await newUser.save();

const userId = savedUser._id.toString();

// Generate custom _id like "patient_abc123"
const rolePrefix = role.toLowerCase();
const customId = `${rolePrefix}_${userId.slice(-6)}`;

if (role === "patient") {
  const existingPatient = await Patient.findOne({ user_id: savedUser._id });
  if (!existingPatient) {
    await Patient.create({
      _id: customId,
      user_id: savedUser._id,
      dob: age,
      gender,
      address,
      contactNumber,
      medicalHistory: medicalHistory ? medicalHistory.split(",").map(s => s.trim()) : [],
      timeline_events: []
    });
  }
}


if (role === "doctor") {
  const existingDoctor = await Doctor.findOne({ user_id: savedUser._id });
  if (!existingDoctor) {
    await Doctor.create({
      _id: customId,
      user_id: savedUser._id,
      name,
      licenseNumber,
      specialization,
      experience_years: Number(experienceYears),
      hospital_id: hospitalId || "",
      contact_email: email,
      phone: contactNumber
    });
  }
}


if (role === "hospital") {
  const existingHospital = await Hospital.findOne({ user_id: savedUser._id });
  if (!existingHospital) {
    await Hospital.create({
      _id: customId,
      user_id: savedUser._id,
      name: hospitalName,
      location,
      city,
      state,
      pinCode,
      contact_email: hospitalEmail,
      phone: hospitalPhone,
      hospitalEmail,
      departments: []
    });
  }
}


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
console.error("Registration error:", err);
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

// Inject dummy role if user is admin
const injectedRole = user.email === ADMIN_EMAIL ? "admin" : user.role;

// Create JWT token
const token = jwt.sign(
  { id: user._id, role: injectedRole },
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
  redirectPath,
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: injectedRole
  }
});
} catch (err) {
next(err);
}
};