import React, {useState} from "react";
import DeadlineCard from "./deadlineCard.js";
//import { courseData } from "../../components/data.js"; 
import "./deadlines.css"
import DeadlineCalendar from "../../components/deadlineCalendar.js"
import { assignmentData, courseCodes } from "../../components/data.js";

const Deadlines = () => {
    const [selectedClass, setSelectedClass] = useState("all");

    const deadlines = courseCodes.reduce((acc, courseCode) => {
        const pendingAssignments = assignmentData[courseCode].filter((assingment) => !assingment.graded);
        acc[courseCode] = pendingAssignments;
        return acc;
    },{});

    const handleClassFilter = (course) => {
        setSelectedClass(course);
    };

    const filteredDeadlines = courseCodes.filter((code) => 
         (selectedClass === "all" && deadlines[code]) || 
        (selectedClass !== "all" && code === selectedClass)
    );

    return (
        <div className="h-100">
            <div className="d-flex align-items-center  bg-light" style={{height: "20%"}}>
                <h1 className="mx-5" >Deadlines</h1>
            </div>
            <div className="d-flex justify-content-center pt-4 pb-5"  style={{height: "70%"}}>
                <div className="d-flex  gap-3 justify-content-center" style={{width: "90%"}}>
                    <div className="d-block" style={{width: "32%"}}>
                        <div className="class-buttons">
                            <button onClick={() => handleClassFilter("all")} className={selectedClass === "all" ? "active" : ""}>All Classes</button>
                            {courseCodes.map((code,index)=>(
                                <button key={index} onClick={() => handleClassFilter(code)} className={selectedClass === code ? "active" : ""}>{code}</button>
                            ))}
                        </div>
                        <div className="deadlines-list">
                            {filteredDeadlines.map((code) => (
                                deadlines[code].map((deadline,index) =>
                                <DeadlineCard key={index} code={code} deadline={ deadline}/>
                                )
                            ))}
                        </div>

                    </div>
                    <div className="h-100" style={{width: "68%"}}>
                        <DeadlineCalendar/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Deadlines;