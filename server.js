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