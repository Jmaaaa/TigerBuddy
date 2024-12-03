const express = require('express');
const Assignment = require('../models/Assignment');
const router = express.Router();

router.post('/add', async (req,res) => {
    try{
        const newAssignment = new Assignment(req.body);
        const savedAssignment = await newAssignment.save();
        res.status(201).json(savedAssignment);
    } 
    catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;