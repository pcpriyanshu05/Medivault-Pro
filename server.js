const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Route import
const patientRoutes = require("./routes/patientRoutes");
app.use("/api/patients", patientRoutes);

// MongoDB connection
mongoose
.connect(process.env.MONGO_URI)
.then(() => {
console.log("MongoDB connected");
app.listen(5000, () => console.log("Server running on port 5000"));
})
.catch((err) => console.log(err));

const reportRoutes = require("./routes/reportRoutes");
app.use("/api/reports", reportRoutes);

const hospitalRoutes = require("./routes/hospitalRoutes");
app.use("/api/hospitals", hospitalRoutes);

const prescriptionRoutes = require("./routes/prescriptionRoutes");
app.use("/api/prescriptions", prescriptionRoutes);

const doctorRoutes = require("./routes/doctorRoutes");
app.use("/api/doctors", doctorRoutes);

const appointmentRoutes = require("./routes/appointmentRoutes");
app.use("/api/appointments", appointmentRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const sharedRecordRoutes = require("./routes/sharedRecordRoutes");
app.use("/api/shared", sharedRecordRoutes);

const fileUploadRoutes = require("./routes/fileUploadRoutes");
app.use("/api/upload", fileUploadRoutes);

app.use("/uploads", express.static("uploads"));



const fileRoutes = require("./routes/fileRoutes");
app.use("/api/files", fileRoutes);

