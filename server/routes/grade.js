const express = require('express');
const Grade = require('../models/Grade');
const router = express.Router();

router.post('/add', async (req,res) => {
    try{
        const newGrade = new Grade(req.body);
        const savedGrade = await newGrade.save();
        res.status(201).json(savedGrade);
    } 
    catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;