import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DeadlineCard = ({ code, deadline }) => {
    const course = code
    const{name, description, dueDate, grade} = deadline;
    const dateDue = new Date(dueDate);
    const submitted = (grade!==undefined && grade !==null && grade.submission !== null);
    const clientTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const [timeRemaining, setTimeRemaining] = useState("");
    const navigate = useNavigate();

    const goToAssignment = () => {
        navigate(`/courses/${code}/assignments/${name}`);
    };

    useEffect(() => {
        const calculateCountdown = () => {
            const deadlineDate = dateDue;
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
    }, [dateDue]);

    return (
        <div className="card bg-light animated-shadow row" onClick={() => goToAssignment()}>
            <div className="card-body">
                <h3>{name}</h3>
                <p>Due Date: {dateDue.toLocaleString('en-US',{timeZone: clientTimezone})} ({timeRemaining})</p>
                <p>Course: {course}</p>
                <p>Status: {submitted ? "Submitted" : "Not Submitted"}</p>
            </div>
        </div>
    );
};

export default DeadlineCard;
