import React from "react";
import CourseCard from "../components/courseCard";

const Dashboard = () => {
    
    const courses = [
        {id: 1, code:"ABC1000", name: "Course A", grade: "100% (A+)"},
        {id: 2, code:"ABC1001", name: "Course B", grade: "100% (A+)"},
        {id: 3, code:"ABC1002", name: "Course C", grade: "100% (A+)"},
        {id: 4, code:"ABC1003", name: "Course D", grade: "100% (A+)"},
    ]


    return (
        <div className="d-flex flex-column">
            <h1>
                Welcome to the dashboard
            </h1>
            <div className="d-flex flex-row">
                <div>
                    {courses.map((course) => (
                        <CourseCard key={course.id} course={course}/>
                    ))}
                </div>
            </div>
            <div>

            </div>
        </div>
    );
};

export default Dashboard;