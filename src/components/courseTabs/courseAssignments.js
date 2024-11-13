import React from "react";
import { useParams, Link } from "react-router-dom";
import { assignmentData } from "../../components/data.js";

const CourseAssignments = () => {
    const { name: courseName } = useParams();
    const assignments = assignmentData[courseName] || [];

    return (
        <div className="container mt-4">
            <h1 className="mb-4">{courseName} / Assignments</h1>
            {assignments.length > 0 ? (
                <div className="list-group">
                    {assignments.map((assignment, index) => (
                        <Link
                            key={index}
                            to={`./${assignment.assignment}`}
                            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                        >
                            <div>
                                <strong>{assignment.assignment}</strong>
                                <p className="mb-0 text-muted">
                                    Due: {assignment.dateDue} at {assignment.timeDue}
                                </p>
                            </div>
                            <span
                                className={`badge ${assignment.submitted ? 'badge-success' : 'badge-warning'} badge-pill text-black`}
                            >
                                {assignment.submitted ? "Submitted" : "Not Submitted"}
                            </span>
                        </Link>
                    ))}
                </div>
            ) : (
                <p>No assignments available for this course.</p>
            )}
        </div>
    );
};

export default CourseAssignments;
