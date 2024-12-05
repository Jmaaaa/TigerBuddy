import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DeadlineCard = ({ code, deadline }) => {
    const course = code
    const dateDue = deadline.dateDue;
    const timeDue = deadline.timeDue;
    const assignment = deadline.assignment;
    const submitted = deadline.submitted;
    const [timeRemaining, setTimeRemaining] = useState("");
    const navigate = useNavigate();

    const goToAssignment = (assignment) => {
        navigate(`/courses/${code}/assignments/${assignment}`);
    };

    useEffect(() => {
        const calculateCountdown = () => {
            const deadlineDate = new Date(`${dateDue}T${timeDue}`);
            const now = new Date();
            const timeDiff = deadlineDate - now;

            if (timeDiff > 0) {
                const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
                const seconds = Math.floor((timeDiff / 1000) % 60);
                setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
            } else {
                setTimeRemaining("Overdue");
            }
        };

        calculateCountdown();
        const intervalId = setInterval(calculateCountdown, 1000); // Update every second

        return () => clearInterval(intervalId);
    }, [dateDue, timeDue]);

    return (
        <div className="card bg-light animated-shadow row" onClick={() => goToAssignment(assignment)}>
            <div className="card-body">
                <h3>{assignment}</h3>
                <p>Due Date: {dateDue} at {timeDue} ({timeRemaining})</p>
                <p>Course: {course}</p>
                <p>Status: {submitted ? "Submitted" : "Not Submitted"}</p>
            </div>
        </div>
    );
};

export default DeadlineCard;
