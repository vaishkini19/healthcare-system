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

module.exports = router;