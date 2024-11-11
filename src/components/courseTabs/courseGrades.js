import React from "react";
import { useOutletContext, useParams } from 'react-router-dom';
import CourseGradeTable from "./courseGradeTable";

const CourseGrades = () => {
    const { courseGrades } = useOutletContext();
    const { name: courseName } = useParams();
    
    return (
       <div>
            <h1>Welcome to the Grades</h1>
            <CourseGradeTable code={courseName}/>
        </div>
    );
};

export default CourseGrades;