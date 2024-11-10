import React from "react";
import { useParams } from "react-router-dom";
import { deadlinesData } from "../../components/data.js";

const CourseAssignments = () => {
    const { name: courseName } = useParams();
    const assignments = deadlinesData[courseName] || [];

    return (
        <div>
            <h1>Assignments for {courseName}</h1>
            <ul>
                {assignments.map((assignment) => (
                    <li key={assignment.id}>
                        <strong>{assignment.assignment}</strong> - Due: {assignment.dateDue} at {assignment.timeDue} 
                        <span> - {assignment.submitted ? "Submitted" : "Not Submitted"}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CourseAssignments;
