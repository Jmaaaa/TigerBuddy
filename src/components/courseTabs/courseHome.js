import React from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { overviewData } from "../../components/data.js"; 
import './courseHome.css';

const CourseHome = () => {
    const course = useOutletContext();
    const { code: courseName } = useParams();


    const courseOverview = overviewData[courseName] || [];

    return (
        <div>
            <div className="h3 mb-3">Course Overview</div>
            {courseOverview.length > 0 ? (
                <div>
                    <p><strong>Instructor:</strong> {courseOverview[3]?.instructor}</p>
                    <p><strong>Description:</strong> {courseOverview[0]?.description}</p>
                    <p><strong>Key Topics:</strong> {courseOverview[1]?.keyTopics}</p>
                    <p><strong>Expected Outcomes:</strong> {courseOverview[2]?.outcomes}</p>
                    <div className="h3 mb-3">Contact Information</div>
                    <p><strong>Phone:</strong> </p>
                    <p><strong>Email:</strong></p>
                    <p><strong>Office Hours:</strong> {courseOverview[4]?.officeHours}</p>
                </div>
            ) : (
                <p>No overview available for this course.</p>
            )}
        </div>
    );
};

export default CourseHome;
