import React, {useState} from "react";
import DeadlineCard from "./deadlineCard.js";
//import { courseData } from "../../components/data.js"; 
import "./deadlines.css"

const Deadlines = () => {
    const [selectedClass, setSelectedClass] = useState("all");

    // Sample deadlines
    const deadlines = [
        { id: 1, dateDue: "2024-11-15", timeDue: "23:59", course: "Course A", assignment: "Homework 3", submitted: false },
        { id: 2, dateDue: "2024-11-18", timeDue: "10:00", course: "Course B", assignment: "Essay Draft", submitted: true },
        { id: 3, dateDue: "2024-11-20", timeDue: "17:00", course: "Course C", assignment: "Lab Report", submitted: false },
        { id: 4, dateDue: "N/A",        timeDue: "N/A",   course: "Course D", assignment: "There are no deadlines for this class!", submitted: true},
        
    ];

    const handleClassFilter = (course) => {
        setSelectedClass(course);
    };

    const filteredDeadlines = deadlines.filter((deadline) => 
         (selectedClass === "all" && !deadline.assignment.includes("There are no deadlines for this class!")) || 
        (selectedClass !== "all" && deadline.course === selectedClass)
    );

    return (
        <div className="upcoming-deadlines-container">
            <h2>Upcoming Deadlines</h2>
            <div className="class-buttons">
                <button onClick={() => handleClassFilter("all")} className={selectedClass === "all" ? "active" : ""}>All Classes</button>
                <button onClick={() => handleClassFilter("Course A")} className={selectedClass === "Course A" ? "active" : ""}>Course A</button>
                <button onClick={() => handleClassFilter("Course B")} className={selectedClass === "Course B" ? "active" : ""}>Course B</button>
                <button onClick={() => handleClassFilter("Course C")} className={selectedClass === "Course C" ? "active" : ""}>Course C</button>
                <button onClick={() => handleClassFilter("Course D")} className={selectedClass === "Course D" ? "active" : ""}>Course D</button>
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