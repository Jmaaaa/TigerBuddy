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
        const grades = req.body;
        for(const{assignmentId, student, score, feedback, submission } of grades){
            const newGrade = {score, student, feedback, submission};

            const updatedAssignment = await Assignment.findByIdAndUpdate(
                assignmentId,
                {$push: {grades: newGrade}},
                { new: true }
            );

            if (!updatedAssignment) {
                return res.status(404).json({ message: `Assignment not found for ID: ${assignmentId}` });
            }
        }
        res.status(200).json({ message: 'Grades added successfully' });
    }
    catch (err) {
        res.status(400).json(err);
    }
});

router.patch('/:assignmentId/user/:userId/submit', async (req,res) => {
    const {assignmentId, userId} = req.params;
    try{
        const {file, comment} = req.body;
        const assignment = await Assignment.findOneAndUpdate(
            {_id: assignmentId, 'grades.student': userId},{
                $set: {
                    'grades.$.submission.file': file,
                    'grades.$.submission.date': new Date()
                },
                $push: {'grades.$.submission.comments': comment}
            },
            {new: true}
        );
        if (!assignment) {
            const grade = {
                score: null, 
                student: userId,
                feedback: "", 
                submission: {
                    file: file, 
                    date: new Date(), 
                    comments: [comment]
                }
            };
            const newAssignment = await Assignment.findByIdAndUpdate(
                assignmentId,
                {$push: {grades: grade}},
                {new: true}
            );
            res.status(200).json(newAssignment);
        }
        else res.status(200).json(assignment);
    }
    catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;