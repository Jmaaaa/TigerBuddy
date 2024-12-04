const express = require('express');
const Submission = require('../models/Submission');
const router = express.Router();

router.post('/add', async (req,res) => {
    try{
        const newSubmission = new Submission(req.body);
        const savedSubmission = await newSubmission.save();
        res.status(201).json(savedSubmission);
    } 
    catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;