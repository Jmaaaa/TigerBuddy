import React from "react";
import { useOutletContext } from 'react-router-dom';

const CourseGrades = () => {
    const { courseGrades } = useOutletContext();
    
    return (
       <div>
            <h1>Welcome to the Grades</h1>
            {courseGrades.length > 0 ? (
                <ul>
                    {courseGrades.map((grade, index) => (
                        <li key={index}>
                            {grade.assignment}: {grade.grade}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No grades available for this course.</p>
            )}
        </div>
    );
};

export default CourseGrades;