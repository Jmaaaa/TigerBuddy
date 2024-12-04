const express = require('express');
const Course = require('../models/Course');
const Assignment = require('../models/Assignment');
const mongoose = require('mongoose');
const router = express.Router();

router.post('/add', async (req,res) => {
    try{
        const newCourse = new Course(req.body);
        const savedCourse = await newCourse.save();
        res.status(201).json(savedCourse);
    } 
    catch (err) {
        res.status(400).json(err);
    }
});

router.patch('/addAssignments', async (req,res) => {
    try{
        const {courseCode, assignmentIds} = req.body;
        const course = await Course.findOne({ code: courseCode });
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        course.assignments = assignmentIds;
        await course.save();

        res.status(200).json(course);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.get('/allAssignments', async (req,res) => {
    const { userId } = req.params;

    try{
        const courses = await Course.find()
        .populate({
            path:'assignments',
            select: 'name weight grades',
            populate: {
                path: 'grades',
                select: 'score'
            }
        });
        res.status(200).json(courses);
    } 
    catch (err) {
        res.status(400).json(err);
    }
});


router.get('/user/:userId', async (req,res) => {
    const { userId } = req.params;

    try{

        const courses = await Course.find({students: userId })
        .populate({
            path:'assignments',
            select: 'weight grades',
            populate: {
                path: 'grades',
                match: {student: userId},
                select: 'score'
            }
        }).lean();
        

        const detailedCourses = courses.map( (course) => {
            const gradedAssignments = course.assignments.filter((assignment) => assignment.grades.length > 0);

            const totalWeight = gradedAssignments.reduce((acc, assignment) => acc + assignment.weight, 0);
            const weightedGrade = gradedAssignments.reduce((acc, assignment) => {
              const weight = assignment.weight;
              const score = assignment.grades[0].score || 0; // Fallback to 0 if no grade
              return acc + (score * (weight / totalWeight));
            }, 0);

            return {name: course.name, code: course.code, instructor: course.instructor, courseGrade: weightedGrade};
        })

        res.status(200).json(detailedCourses);
    } 
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});




module.exports = router;