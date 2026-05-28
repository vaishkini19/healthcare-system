const express = require("express");
const router = express.Router();

const Prescription = require("../models/Prescription");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// CREATE PRESCRIPTION
router.post("/", auth,role("doctor","admin"), async (req, res) => {

   try {

      const prescription = await Prescription.create({
         patient: req.body.patient,
         doctor: req.body.doctor,
         medicines: req.body.medicines,
         instructions: req.body.instructions
      });

      res.status(201).json(prescription);

   } catch (err) {

      res.status(500).json({
         message: err.message
      });

   }

});


// GET PRESCRIPTIONS
router.get("/", auth, async (req, res) => {

   try {

      const data = await Prescription.find();

      res.json(data);

   } catch (err) {

      res.status(500).json({
         message: err.message
      });

   }

});
router.put("/:id", async (req, res) => {
  try {
    const updated = await Prescription.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Prescription.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    res.json({ message: "Prescription deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;