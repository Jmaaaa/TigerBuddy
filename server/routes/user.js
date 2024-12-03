const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json(err);
  }
});

const jwt = require('jsonwebtoken')

router.post('/login', async (req,res) => {
    const {email, password} = req.body;

    try{
        if (!email || !password){
            return res.status(400).json({message: 'need email and password'});
        }

        const user = await User.findOne({email});
        if (!user){
            return res.status(400).json({message: 'User not found'});
        }
        const passwordValid = password === user.password; // try bcrypt?
        if(!passwordValid) {
            return res.status(400).json({message: 'Password is incorrect'});
        }

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, { expiresIn: '1h'});

        res.status(200).json({
            message: 'login successful',
            token
        });
    }
    catch(err){
        res.status(400).json(err);
    }
});

module.exports = router;