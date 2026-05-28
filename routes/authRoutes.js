const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async(req,res)=>{
   try{
      const {name,email,password,role} = req.body;

      const userExists = await User.findOne({email});

      if(userExists){
         return res.status(400).json({
            message:"User already exists"
         });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password,salt);

      const user = await User.create({
         name,
         email,
         password:hashedPassword,
         role
      });

      res.status(201).json({
      
   id: user._id,
   name: user.name,
   email: user.email,
   role: user.role
});


   }catch(err){
      res.status(500).json({message:err.message});
   }
});

router.post("/login", async(req,res)=>{
   try{
      const {email,password} = req.body;

      const user = await User.findOne({email});

      if(!user){
         return res.status(400).json({
            message:"Invalid credentials"
         });
      }

      const match = await bcrypt.compare(password,user.password);

      if(!match){
         return res.status(400).json({
            message:"Invalid credentials"
         });
      }

      const token = jwt.sign(
         {id:user._id,name:user.name, role:user.role},
         process.env.JWT_SECRET,
         {expiresIn:"1d"}
      );

      res.json({
         token
      });

   }catch(err){
      res.status(500).json({message:err.message});
   }
});

module.exports = router;