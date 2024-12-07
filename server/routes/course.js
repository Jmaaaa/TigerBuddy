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

//get one course's info for one user
router.get('/:code/user/:userId', async (req,res) => {
    const { code, userId } = req.params;
    try{
        const course = await Course.findOne({code: code, students: userId})
            .populate({
                path:'assignments',
            }).lean();

        const userAssignments = course.assignments
            .map((assignment) => {
                const {_id, name, description, dueDate, weight} = assignment;
                const grade = assignment.grades.find((grade) => grade.student.toString() === userId);

                if(grade === undefined) {
                    return {
                        id: _id, name: name, dueDate: dueDate,
                        description: description, 
                        weight: weight, grade: null
                    };
                }

                return {
                    id: _id, name: name, dueDate: dueDate,
                    description: description, 
                    weight: weight, grade: grade
                };                
            })


        const totalWeight = userAssignments.reduce((acc, {grade, weight}) => {
            const score = (grade!==null)? grade.score : null;
            return acc + ((score===null)? 0 : weight);
        },0);
        
        const weightedGrade = userAssignments.reduce((acc, {grade, weight}) => {
            const score = (grade!==null)? grade.score : null;
            return acc + ((score===null)? 0 :(score * (weight / totalWeight)));
        }, 0);

        const detailedCourse = {
            id: course._id, name: course.name, code: course.code,
            instructor: course.instructor, hours: course.hours,
             totalWeight: totalWeight, courseGrade: weightedGrade ,
              assignments: userAssignments, announcements: course.announcements, 
              homeInfo: course.homeInfo, modules: course.modules
        };

        res.status(200).json(detailedCourse);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

//Get all course info for one user
router.get('/user/:userId', async (req,res) => {
    const { userId } = req.params;
    try{

        const courses = await Course.find({students: userId })
        .populate({
            path:'assignments',
        }).lean();
        

        const detailedCourses = courses.map( (course) => {

            const userAssignments = course.assignments
                .map((assignment) => {
                const {_id, name, description, dueDate, weight} = assignment;
                const grade = assignment.grades.find((grade) => grade.student.toString() === userId);

                if(grade === undefined) {
                    return {
                        id: _id, name: name, dueDate: dueDate,
                        description: description, 
                        weight: weight, grade: null
                    };
                }

                return {
                    id: _id, name: name, dueDate: dueDate,
                    description: description, 
                    weight: weight, grade: grade
                }; 
                })


            const totalWeight = userAssignments.reduce((acc, {grade, weight}) => {
                const score = (grade!==null)? grade.score : null;
                return acc + ((score===null)? 0 : weight);
            },0);
            
            const weightedGrade = userAssignments.reduce((acc, {grade, weight}) => {
                const score = (grade!==null)? grade.score : null;
                return acc + ((score===null)? 0 :(score * (weight / totalWeight)));
            }, 0);

            return {
                id: course._id, name: course.name, code: course.code,
                 instructor: course.instructor, hours: course.hours,
                  totalWeight: totalWeight, courseGrade: weightedGrade ,
                   assignments: userAssignments, announcements: course.announcements
            };
        })

        res.status(200).json(detailedCourses);
    } 
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.patch('/addAnnouncements', async (req,res) => {
    const reqData = req.body
    try{
        for(const code in reqData){
            const announcements = reqData[code].map(({title, announcement, date},i) => (
                {name: title, description: announcement, date: new Date(date)}
            ));
            const course = await Course.findOneAndUpdate(
                {code: code},
                {$set: {announcements: announcements}},
                {new: true}

            );


        }
        res.status(200).json({message: "we did it"})
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.patch('/addHomes', async (req,res) => {
    const reqData = req.body
    try{
        for(const {courseCode, description, keyTopics, outcomes,officeHours,phone,email} of reqData){
            const overview = {
                description: description,
                keyTopics: keyTopics,
                outcomes: outcomes
            };
            const contact = {
                phone: phone,
                email: email,
                officeHours: officeHours
            };
            const homeInfo = {overview: overview, contact: contact}
            
            const newHomeInfo = await Course.findOneAndUpdate(
                {code: courseCode},
                {$set: {homeInfo: homeInfo}},
                {new: true}

            );


        }
        res.status(200).json({message: "we did it"})
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.patch('/addModules', async (req,res) => {
    const reqData = req.body
    try{
        for(const code in reqData){
            const modules = reqData[code].map(
                ({moduleId, title, description, content, completed},i) =>{
                    const index = moduleId;
                    const name = title;
                    const materials = content.map(({type, title},j)=>(
                        {matName: title, type: type, viewed: completed}
                    ));
                    return(
                        {index: index, name: name, description: description, materials: materials}
                    );
                }
            );
            const course = await Course.findOneAndUpdate(
                {code: code},
                {$set: {modules: modules}},
                {new: true}
            );
        }
        res.status(200).json({message: "we did it"})
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

module.exports = router;