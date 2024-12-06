import React from "react";
import { useParams } from 'react-router-dom';
import CourseGradeTable from "./courseGradeTable";

const CourseGrades = () => {
    const { code: courseName } = useParams();
    
    return (
       <div className="container mt-4">
            <h1>{courseName} / Grades</h1>
            <CourseGradeTable code={courseName}/>
        </div>
    );
};

export default CourseGrades;