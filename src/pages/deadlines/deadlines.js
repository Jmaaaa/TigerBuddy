import React, {useState} from "react";
import DeadlineCard from "./deadlineCard.js";
import "./deadlines.css"

const Deadlines = () => {
    const [selectedClass, setSelectedClass] = useState("all");

    // Sample deadlines
    const deadlines = [
        { id: 1, dateDue: "2024-11-15", timeDue: "23:59", course: "Math", assignment: "Homework 3", submitted: false },
        { id: 2, dateDue: "2024-11-18", timeDue: "10:00", course: "History", assignment: "Essay Draft", submitted: true },
        { id: 3, dateDue: "2024-11-20", timeDue: "17:00", course: "Science", assignment: "Lab Report", submitted: false },
        
    ];

    const handleClassFilter = (course) => {
        setSelectedClass(course);
    };

    const filteredDeadlines = deadlines.filter((deadline) => 
        selectedClass === "all" || deadline.course === selectedClass
    );

    return (
        <div className="upcoming-deadlines-container">
            <h2>Upcoming Deadlines</h2>
            <div className="class-buttons">
                <button onClick={() => handleClassFilter("all")} className={selectedClass === "all" ? "active" : ""}>All Classes</button>
                <button onClick={() => handleClassFilter("Math")} className={selectedClass === "Math" ? "active" : ""}>Math</button>
                <button onClick={() => handleClassFilter("History")} className={selectedClass === "History" ? "active" : ""}>History</button>
                <button onClick={() => handleClassFilter("Science")} className={selectedClass === "Science" ? "active" : ""}>Science</button>
            </div>
            <div className="deadlines-list">
                {filteredDeadlines.map((deadline) => (
                    <DeadlineCard key={deadline.id} deadline={deadline} />
                ))}
            </div>
        </div>
    );
};

export default Deadlines;