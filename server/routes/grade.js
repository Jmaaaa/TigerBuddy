const express = require('express');
const Grade = require('../models/Grade');
const Assignment = require('../models/Assignment');
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

router.post('/addGradeToAssignment', async (req, res) => {
    try {
        const grades = req.body; // Expecting an array of grades
        const updatedAssignments = [];

        // Loop through each grade and create the Grade document
        for (const gradeData of grades) {
            const { assignmentId, student, score, feedback } = gradeData;

            // Check if all required fields are provided
            if (!assignmentId || !student || !score) {
                return res.status(400).json({ message: "Assignment ID, student, and score are required." });
            }

            // Step 1: Create and save the grade
            const newGrade = new Grade({
                student,
                score,
                feedback
            });
            const savedGrade = await newGrade.save();

            // Step 2: Update the assignment by pushing the new grade's ID into the grades array
            const updatedAssignment = await Assignment.findByIdAndUpdate(
                assignmentId,
                { $push: { grades: savedGrade._id } },
                { new: true }
            );

            if (updatedAssignment) {
                updatedAssignments.push(updatedAssignment);
            }
        }

        // Return the updated assignments
        res.status(201).json(updatedAssignments);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;