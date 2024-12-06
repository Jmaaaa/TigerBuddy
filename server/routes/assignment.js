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

router.post('/addMany', async (req, res) => {
    try {
        const assignments = req.body;
        const savedAssignments = await Assignment.insertMany(assignments);
        res.status(201).json(savedAssignments);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.patch('/addGrades', async (req,res) => {
    try{
        const [{assignmentId, student, score, feedback, submission }]= req.body;
        
        res.status(200).json({ message: 'Grades have been reset' });
    }
    catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;