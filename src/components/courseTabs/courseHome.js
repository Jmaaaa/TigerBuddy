import React from "react";
import { useParams } from "react-router-dom";
import { overviewData } from "../../components/data.js"; 
import './courseHome.css';

const CourseHome = () => {
    const { name: courseName } = useParams();


    const courseOverview = overviewData[courseName] || [];

    return (
        <div className="container mt-4">
            <h1>{courseName} / Home</h1>
            <div className="course-homepage">
                <h1>Welcome to {courseName}!</h1>

                <h2>Course Overview:</h2>
                {courseOverview.length > 0 ? (
                    <div className="course-overview">
                        <p><strong>Description:</strong> {courseOverview[0]?.description}</p>
                        <p><strong>Key Topics:</strong> {courseOverview[1]?.keyTopics}</p>
                        <p><strong>Expected Outcomes:</strong> {courseOverview[2]?.outcomes}</p>
                        <p><strong>Instructor:</strong> {courseOverview[3]?.instructor}</p>
                        <p><strong>Office Hours:</strong> {courseOverview[4]?.officeHours}</p>
                    </div>
                ) : (
                    <p>No overview available for this course.</p>
                )}
            </div>
        </div>
    );
};

export default CourseHome;
