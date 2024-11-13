import React, { useEffect, useState } from "react";
import { assignmentData } from "./data";

const DeadlineCalendar = () => {
    const [gotThisWeek, setGotThisWeek] = useState(false);
    const [today, setToday] = useState(new Date());
    const [thisWeek, setThisWeek] = useState([]);

    useEffect(() => {
        if (gotThisWeek)
            return;
        setGotThisWeek(true);

        // Grab assignments due on the server.
        let weekData = [];

        for (let i = 0; i < 35; i++) {
            let curDay = new Date(today);
            curDay.setDate(today.getDate() + i);
            
            let assignments = [];

            // Crappy linear search.
            for (const [key, data] of Object.entries(assignmentData)) {
                for (const assignment of data) {
                    // console.log(JSON.stringify(assignment));
                    let dateStr = `${assignment.dateDue}T${assignment.timeDue}`;
                    let due = new Date(dateStr);
                    if (due.getMonth() == curDay.getMonth() && due.getDate() == curDay.getDate() && due.getFullYear() == curDay.getFullYear()) {
                        assignments.push({
                            name: assignment.assignment,
                            course: key,
                            due: due,
                            submitted: assignment.submitted
                        });
                    }
                }
            }
            // Fetch assignments for this day.
            
            /*
            if (i === 3) {
                let dueDate = curDay;
                dueDate.setHours(12, 0, 0);
                assignments.push({
                    name: "Assignment 2",
                    due: dueDate,
                    submitted: false
                });

                dueDate.setHours(23, 59, 59);
                assignments.push({
                    name: "Assignment 3",
                    due: dueDate,
                    submitted: false
                });
            }
            */

            weekData.push({
                day: curDay,
                assignments: assignments
            });
        }

        setThisWeek(weekData);
    }, [today]);

    return (
        <div className={"container-fluid px-4 h-100"}>
            {[...Array(7)].map((_, i) => (
                <div key={i} className="row"  style={{height: "20%"}}>
                {thisWeek && thisWeek.slice(i*7, (i+1)*7).map((data, idx) => {
                    return (
                            <div key={idx} className="col-sm p-1">
                                <div className="w-100 h-100 p-2 d-flex flex-column border border-primary rounded" style={{overflow:"hidden"}}>
                                    <span className="flex-shrink-0 mb-1 user-select-none">
                                        {data.day.getDate()}
                                    </span>
                                    
                                    <div className="flex-grow-1 d-flex flex-column justify-content-end w-100">
                                        {data.assignments.map((assign, aindex) => {
                                            const dueTime = new Intl.DateTimeFormat('en-US', {
                                                hour: 'numeric',
                                                minute: 'numeric'
                                            }).format(assign.due);

                                            return (
                                                <a href={`/courses/${assign.course}/assignments/${assign.name}`} className="text-decoration-none" key={aindex}>
                                                    <div className={`${(assign.submitted ? "bg-primary" : "bg-secondary")} rounded px-2 py-1 mb-1 text-light flex-shrink-1 d-flex flex-row`} style={{fontSize:"12px", userSelect:"none"}}>
                                                        <span className="text-nowrap flex-shrink-1 flex-grow-1 font-weight-bold" style={{overflow: "hidden"}}>{assign.name}</span>
                                                        <span className="pl-2 text-nowrap flex-shrink-0">{dueTime.toString()}</span>
                                                    </div>
                                                </a>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                    );
                })}
                </div>
            ))}
        </div>
    );
};

export default DeadlineCalendar;