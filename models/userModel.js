const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
_id: String, // e.g. USER001
name: String,
email: {
type: String,
unique: true
},
password: String,
role: {
type: String,
enum: ["patient", "doctor", "admin"],
default: "patient"
}
});

module.exports = mongoose.model("User", userSchema);