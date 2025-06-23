const Patient = require("../models/patientModel");

// ✅ GET all patients
exports.getAllPatients = async (req, res) => {
try {
const patients = await Patient.find();
res.status(200).json(patients);
} catch (err) {
res.status(500).json({ error: err.message });
}
};

// ✅ POST a new patient
exports.createPatient = async (req, res) => {
try {
const newPatient = new Patient({
_id: req.body._id,
dob: req.body.dob,
gender: req.body.gender,
address: req.body.address,
timeline_events: req.body.timeline_events
});


const savedPatient = await newPatient.save();
res.status(201).json(savedPatient);
} catch (err) {
res.status(500).json({ error: err.message });
}
};

// ✅ PUT: Update patient by ID
exports.updatePatient = async (req, res) => {
try {
const { id } = req.params;


const updatedPatient = await Patient.findByIdAndUpdate(id, req.body, {
  new: true,
});

if (!updatedPatient) {
  return res.status(404).json({ message: "Patient not found" });
}

res.status(200).json(updatedPatient);
} catch (err) {
res.status(500).json({ error: err.message });
}
};
// ✅ DELETE patient by ID
exports.deletePatient=async(req,res)=>{
    try{
        const{id}=req.params;
        const deletedPatient=await Patient.findByIdAndDelete(id);
        if(!deletedPatient){
            return res.status(404).json({message:"Patient not found"});
        }
        res.status(200).json({message:"Patient deleted successfully"});
    }catch(err){
        res.status(500).json({error:err.message});
    }
};