const Appointment = require("../models/appointmentModel");

// ✅ GET all appointments
exports.getAllAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (err) {
    next(err);
  }
};

// ✅ POST a new appointment
exports.createAppointment = async (req, res, next) => {
  try {
    const newAppointment = new Appointment(req.body);
    const savedAppointment = await newAppointment.save();
    res.status(201).json(savedAppointment);
  } catch (err) {
    next(err);
  }
};

// ✅ PUT update appointment by ID
exports.updateAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedAppointment = await Appointment.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedAppointment) {
      const error = new Error("Appointment not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json(updatedAppointment);
  } catch (err) {
    next(err);
  }
};

// ✅ DELETE appointment by ID
exports.deleteAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedAppointment = await Appointment.findByIdAndDelete(id);

    if (!deletedAppointment) {
      const error = new Error("Appointment not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (err) {
    next(err);
  }
};
