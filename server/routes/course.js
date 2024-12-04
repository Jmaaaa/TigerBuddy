const express = require('express');
const Course = require('../models/Course');
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

router.get('/user/:userId', async (req,res) => {
    const { userId } = req.params;

    try{
        const courses = await Course.find({students: userId });
        res.status(200).json(courses);
    } 
    catch (err) {
        res.status(400).json(err);
    }
});


module.exports = router;