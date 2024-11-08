import React from "react";
import CourseCard from "./courseCard.js";
const Dashboard = () => {
    
    const courses = [
        {id: 1, name: "Course A", grade: "100% (A+)"},
        {id: 2, name: "Course A", grade: "100% (A+)"},
        {id: 3, name: "Course A", grade: "100% (A+)"},
        {id: 4, name: "Course A", grade: "100% (A+)"},
    ]

    return (
        <div>
            <h1>
                Welcome to the dashboard
            </h1>
            <div>
                {courses.map((course) => (
                    <CourseCard key={course.id} course={course}/>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;