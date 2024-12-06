const express = require('express');
const Course = require('../models/Course');
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

router.patch('/addHours',async (req,res)=> {
    try{
        await Course.updateMany({}, { $set: { hours: 3 } });
        res.status(200).json("did it");
    } 
    catch (err) {
        res.status(400).json(err);
    }
});

router.get('/:code/:userId', async (req,res) => {
    const { code, userId } = req.params;
    try{
        const course = await Course.findOne({code: code, students: userId});
        res.status(200).json(course);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});


router.get('/user/:userId', async (req,res) => {
    const { userId } = req.params;

    try{

        const courses = await Course.find({students: userId })
        .populate({
            path:'assignments',
            select: 'name weight grades',
        }).lean();
        

        const detailedCourses = courses.map( (course) => {

            const userGrades = course.assignments
                .map((assignment) => {
                const grade = assignment.grades.find((grade) => grade.student.toString() === userId);

                if(grade) return {id: assignment._id, name: assignment.name, score: grade.score, weight: assignment.weight}
                return {id: assignment._id, name: assignment.name, score: null, weight: assignment.weight};
                })


            const totalWeight = userGrades.reduce((acc, grade) => {
                const {score, weight} = grade;
                return acc + ((score===null)? 0 : weight);
            },0);
            const weightedGrade = userGrades.reduce((acc, grade) => {
              const {score, weight} = grade;
              return acc + ((score===null)? 0 :(score * (weight / totalWeight)));
            }, 0);

            return {id: course._id, name: course.name, code: course.code,
                 instructor: course.instructor, hours: course.hours,
                  totalWeight: totalWeight, courseGrade: weightedGrade ,
                   assignments: userGrades};
        })

        res.status(200).json(detailedCourses);
    } 
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});




module.exports = router;