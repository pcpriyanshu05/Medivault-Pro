const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ 
      success: false,
      message: "No token provided" 
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Standardize user object
    req.user = {
      id: decoded.id || decoded._id, // Handle both 'id' and '_id'
      role: decoded.role
    };
    
    next();
  } catch (err) {
    return res.status(401).json({ 
      success: false,
      message: "Invalid or expired token",
      error: err.message 
    });
  }
};

// Role checkers remain exactly the same
exports.isDoctor = (req, res, next) => {
  if (req.user.role !== "doctor") {
    return res.status(403).json({ message: "Only doctors can access this route" });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Only admin can access this route" });
  }
  next();
};

exports.isPatient = (req, res, next) => {
  if (req.user.role !== "patient") {
    return res.status(403).json({ message: "Only patients can access this route" });
  }
  next();
};

// ... (keep existing verifyToken code)

exports.isHospital = (req, res, next) => {
  if (req.user.role !== "hospital") {
    return res.status(403).json({ message: "Hospital access only" });
  }
  next();
};

