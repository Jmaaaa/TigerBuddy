import React, { useEffect, useState } from "react";

const CalendarPreview = () => {
    const [today, setToday] = useState(new Date());
    const [thisWeek, setThisWeek] = useState([]);

    useEffect(() => {
        // Grab assignments due on the server.
        let weekData = [];

        for (let i = 0; i < 12; i++) {
            let curDay = new Date(today);
            curDay.setDate(today.getDate() + i);
            let assignments = [];
            
            // Fetch assignments.
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
                    name: "Assignment 3 sdhfgsldjfhghjlg",
                    due: dueDate,
                    submitted: false
                });
            }

            weekData.push({
                day: curDay,
                assignments: assignments
            });
        }

        setThisWeek(weekData);
    }, [today]);

    return (
        <div className="container-fluid px-4">
            <div className="row w-100 h-100 flex-sm-column flex-lg-row">
            {thisWeek && thisWeek.map((data, idx) => {
                return (
                <div className="col-md-4 col-lg-3 col-xl-2 p-1" key={idx} style={{height: '8rem'}}>
                    <div className="w-100 h-100 p-2 d-flex flex-column border border-primary rounded" style={{overflow:"hidden"}}>
                        <span className="flex-shrink-0 mb-1">
                            {data.day.getDate()}
                        </span>
                        
                        <div className="flex-grow-1 d-flex flex-column justify-content-end w-100">
                            {data.assignments.map((assign, aindex) => {
                                const dueTime = new Intl.DateTimeFormat('en-US', {
                                    hour: 'numeric',
                                    minute: 'numeric'
                                }).format(assign.due);

                                return (
                                    <div className="bg-primary rounded px-2 py-1 mb-1 text-light flex-shrink-1 d-flex flex-row" key={aindex} style={{fontSize:"12px", userSelect:"none"}}>
                                        <span className="text-nowrap flex-shrink-1 flex-grow-1 font-weight-bold" style={{overflow: "hidden"}}>{assign.name}</span>
                                        <span className="pl-2 text-nowrap flex-shrink-0">{dueTime.toString()}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                );
            })}
            </div>
        </div>
    );
};

export default CalendarPreview;