import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import courseImage from "../../assets/courseImage.png"
import axios from 'axios';

const CourseCard = ({course, userId}) => {
    const {name, code, instructor, courseGrade} = course;


    const thresholds = [
        { min: 97, grade: 'A+' },
        { min: 93, grade: 'A' },
        { min: 90, grade: 'A-' },
        { min: 87, grade: 'B+' },
        { min: 83, grade: 'B' },
        { min: 80, grade: 'B-' },
        { min: 77, grade: 'C+' },
        { min: 73, grade: 'C' },
        { min: 70, grade: 'C-' },
        { min: 67, grade: 'D+' },
        { min: 63, grade: 'D' },
        { min: 60, grade: 'D-' },
        { min: 0, grade: 'F' }
      ];

    const getLetterGrade = (score) => {
        const threshold = thresholds.find(threshold => score >= threshold.min);
        return threshold ? threshold.grade : 'N/A'; 
    };

    const letterGrade = getLetterGrade(courseGrade);

    return(
        <Link to={`../courses/${code}`} className="h-100 m-2 text-reset text-decoration-none">
            
            <div className="border m-2 animated-shadow rounded overflow-hidden flex-column h-100">
                <div className="overflow-hidden h-50" style={{backgroundImage: `url(${courseImage})`}}>
                </div>
                <div className="m-2 h-50">
                    <h5 className="m-0 color-purple">{code} | {instructor}</h5>
                    <p className="m-0 text-secondary">Grade: {courseGrade.toFixed(1)} ({letterGrade})</p>
                </div>
            </div>
        </Link>
    );
};

export default CourseCard;