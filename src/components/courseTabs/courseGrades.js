import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import CourseGradeTable from "./courseGradeTable";

const CourseGrades = () => {
    const location = useLocation();
    const course = location.state?.course;

    return (
       <div>
            <CourseGradeTable course={course}/>
        </div>
    );
};

export default CourseGrades;