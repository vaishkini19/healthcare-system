const express = require("express");
const router = express.Router();
const User=require("../models/User");
const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor"); // ✅ needed for availability check
const auth = require("../middleware/authMiddleware");


// ---------------------------
// GET ALL APPOINTMENTS
// ---------------------------
router.get("/", auth, async (req, res) => {
  try {
    const data = await Appointment.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ---------------------------
// CREATE APPOINTMENT (WITH CHECKS)
// ---------------------------
router.post("/", auth, async (req, res) => {
  try {

    // ❗ 1. Doctor exists check
    const doctor = await User.findOne({ name: req.body.doctor, role:"doctor" });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // ❗ 2. Availability check
   // const isAvailable = doctor.availability?.some(
    //  slot => slot.day === req.body.day
   // );

   // if (!isAvailable) {
     // return res.status(400).json({ message: "Doctor not available on this day" });
    //}
    const isAvailable=true;

    // ❗ 3. Slot conflict check
    const existingAppointment = await Appointment.findOne({
      doctor: req.body.doctor,
      date: req.body.date,
      time: req.body.time
    });

    if (existingAppointment) {
      return res.status(400).json({ message: "Slot already booked" });
    }

    // ❗ 4. Create appointment
    const appointment = await Appointment.create({
      patient: req.user.name,
      doctor: req.body.doctor,
      date: req.body.date,
      time: req.body.time,
      status: "scheduled"
    });

    res.status(201).json(appointment);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ---------------------------
// UPDATE APPOINTMENT
// ---------------------------
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json(updated);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ---------------------------
// DELETE APPOINTMENT
// ---------------------------
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await Appointment.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json({ message: "Appointment deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ---------------------------
// UPDATE STATUS
// ---------------------------
router.put("/status/:id", auth, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = req.body.status;

    await appointment.save();

    res.json(appointment);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;