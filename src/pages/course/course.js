import React from "react";
import { useParams } from 'react-router-dom';
import "./course.css"

const Course = () => {
    const { name } = useParams();
    return (
        <div>
            <div className="course-header">
                <h1>
                    {name}
                </h1>
            </div>
            <div className="page-container">
                <div className="sidebar">
                    <button>Course Home</button>
                    <button>Announcements</button>
                    <button>Modules</button>
                    <button>Assignments</button>
                    <button>Grades</button>
                </div>
                <div className="page">
                    
                </div>
            </div>
        </div>
    );
};

export default Course;