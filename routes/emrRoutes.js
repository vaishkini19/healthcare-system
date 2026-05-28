const express = require("express");
const router = express.Router();
const EMR = require("../models/EMR");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, async(req,res)=>{
   try{
      const emr = await EMR.create(req.body);

      res.status(201).json(emr);

   }catch(err){
      res.status(500).json({message:err.message});
   }
});

router.get("/", auth, async (req, res) => {

   try {

      const emrs = await EMR.find();

      res.json(emrs);

   } catch (err) {

      res.status(500).json({
         message: err.message
      });

   }

});
router.put("/:id", auth, async (req, res) => {

   try {

      const updated = await EMR.findByIdAndUpdate(
         req.params.id,
         req.body,
         { new: true }
      );

      res.json(updated);

   } catch (err) {

      res.status(500).json({
         message: err.message
      });

   }

});
router.delete("/:id", auth, async (req, res) => {

   try {

      await EMR.findByIdAndDelete(req.params.id);

      res.json({
         message: "Deleted successfully"
      });

   } catch (err) {

      res.status(500).json({
         message: err.message
      });

   }

});

module.exports = router;