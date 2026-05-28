const express = require("express");
const router = express.Router();

const Appointment = require("../models/Appointment");
const auth = require("../middleware/authMiddleware");


// GET ALL APPOINTMENTS
router.get("/", auth, async (req, res) => {
   try {

      const data = await Appointment.find();

      res.json(data);

   } catch (err) {
      res.status(500).json({ message: err.message });
   }
});


// CREATE APPOINTMENT
router.post("/", auth, async (req, res) => {
   try {

      const appointment = await Appointment.create({
         patient: req.user.name,
         doctor: req.body.doctor,
         date: req.body.date,
         time: req.body.time
      });

      res.status(201).json(appointment);

   } catch (err) {
      res.status(500).json({ message: err.message });
   }
});
router.put("/:id", async (req, res) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.delete("/:id", async (req, res) => {
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
module.exports = router;