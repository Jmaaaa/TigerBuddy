import React from "react";
import { useParams, Link } from "react-router-dom";
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
                        <Link to={`./${assignment.assignment}`} className="text-reset text-decoration-none">
                            <strong>{assignment.assignment}</strong> - Due: {assignment.dateDue} at {assignment.timeDue} 
                            <span> - {assignment.submitted ? "Submitted" : "Not Submitted"}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CourseAssignments;
