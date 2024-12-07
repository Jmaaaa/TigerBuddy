import React, { useState, useEffect } from "react";
import { useOutletContext  } from 'react-router-dom';
import CourseGradeTable from "./courseGradeTable";

const CourseGrades = () => {
    const course = useOutletContext();

    return (
       <div>
            <CourseGradeTable course={course}/>
        </div>
    );
};

export default CourseGrades;