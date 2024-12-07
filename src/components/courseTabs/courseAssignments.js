import React from "react";
import { useOutletContext, Link } from "react-router-dom";

const CourseAssignments = () => {
    const assignments = useOutletContext();

    

    return (
        <div>
            {assignments.length > 0 ? (
                <div className="list-group">
                    {assignments.map(({name, description, dueDate, submission}) => {

                        const date = new Date(dueDate);
                        const datekey = date.toISOString()
                        const clientTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                        
                        return(
                            <Link
                                key={datekey}
                                to={`./${name}`}
                                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                            >
                                <div>
                                    <strong>{name}</strong>
                                    <p className="mb-0 text-muted">
                                        Due: {date.toLocaleString('en-US',{timeZone: clientTimezone})}
                                    </p>
                                </div>
                                <span
                                    className={`badge ${submission ? 'badge-success' : 'badge-warning'} badge-pill text-black`}
                                >
                                    {submission ? "Submitted" : "Not Submitted"}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            ) : (
                <p>No assignments available for this course.</p>
            )}
        </div>
    );
};

export default CourseAssignments;
