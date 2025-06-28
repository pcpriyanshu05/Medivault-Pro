const express = require("express");
const router = express.Router();
const {
getAllHospitals,
createHospital,
updateHospital,
deleteHospital
} = require("../controllers/hospitalController");
router.get("/", getAllHospitals);
router.post("/", createHospital);
router.put("/:id", updateHospital);
router.delete("/:id", deleteHospital);
module.exports = router;