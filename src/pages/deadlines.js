import React, {useState} from "react";
import DeadlineCard from "../components/deadlineComponents/deadlineCard.js";
//import { courseData } from "../../components/data.js"; 
import DeadlineCalendar from "../components/deadlineComponents/deadlineCalendar.js"
import { assignmentData, courseCodes } from "../components/data.js";

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
        <div className="d-flex flex-column flex-fill">
            <div className="container-fluid p-4 ps-5 d-flex align-items-center bg-light">
                <h1 className="mx-5" >Deadlines</h1>
            </div>
            <div className="d-flex flex-row-reverse gap-2 flex-wrap my-4 gap-5"style={{margin:"0 5%"}}>
                <div className="container col d-flex flex-column">
                    <DeadlineCalendar deadlines={deadlines}/>
                </div>
                <div className="container col d-flex flex-column gap-3" style={{maxWidth: "40rem"}}>
                        <div className="d-flex-inline flex-row flex-wrap row gap-2">
                            <button onClick={() => handleClassFilter("all")} className={`btn btn-outline-primary col ${selectedClass === "all" ? "active" : ""}`}>All</button>
                            {courseCodes.map((code,index)=>(
                                <button key={index} onClick={() => handleClassFilter(code)} className={`btn btn-outline-primary col ${selectedClass === code ? "active" : ""}`}>{code}</button>
                            ))}
                        </div>
                    {filteredDeadlines.map((code) => (
                        deadlines[code].map((deadline,index) =>
                            <DeadlineCard key={index} code={code} deadline={ deadline}/>
                        )
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Deadlines;