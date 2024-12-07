import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode  }  from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const DeadlineCalendar = ({ deadlines }) => {
    // const token = localStorage.getItem('token');
    // const userId = jwtDecode(token).userId;
    const [assignments, setAssignments] = useState([]);
    const navigate = useNavigate();

    const [gotThisWeek, setGotThisWeek] = useState(false);
    const [thisWeek, setThisWeek] = useState([]);
    const today = new Date();
    const [month, setMonth] =  useState(today.getMonth());
    const [year, setYear] = useState(today.getFullYear());
    // const firstDayOfMonth = new Date(year, month, 1);
    // const firstCalendarDay = new Date();
    // firstCalendarDay.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay());

    const weekDays = ["Sun","Mon","Tues","Wed","Thurs","Fri","Sat"]

    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]

    
    useEffect(() => {
        const getUserInfo = async() => {
            try{
                // const response = await axios.get(`/api/courses/user/${userId}`);
                let assignments = [];
                for (const [code, course] of Object.entries(deadlines)) {
                    for (const assignment of course) {
                        let copy = assignment;
                        copy.code = code;
                        assignments.push(copy);
                    }
                }

                // console.log(JSON.stringify(assignments));
                setAssignments(assignments);
                // setCourses(response.data);
                // console.log(JSON.stringify(response.data));
            }
            catch(err){
                console.log(err);
            }
        };
        getUserInfo();

    },[/*userId, */ deadlines]);

    const goToAssignment = (assignment) => {
        navigate(`/courses/${assignment.code}/assignments/${assignment.name}`);
    };

    const setCalendar = () => {
        // firstDayOfMonth.setDate(year, month, 1);
        // firstCalendarDay.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay());
    };

    const prevMonth = () => {
        const prevMonth = month>0? month-1 : 11;
        if(prevMonth === 11) setYear(year-1);
        setMonth(prevMonth);
        setCalendar();
    };

    const nextMonth = () => {
        const nextMonth = month<11? month+1 : 0;
        if(nextMonth === 0) setYear(year+1);
        setMonth(nextMonth);
        setCalendar();
    };

    return (
        <div className="row justify-content-center">
            <div className=" text-center d-flex flex-row align-items-center justify-content-between gap-2" style={{maxWidth: "30rem"}}>
                <button onClick={prevMonth} className="btn rounded-5 py-1">
                    <i className="bi bi-arrow-left text-primary h1"></i>
                </button>
                <h2 className="m-0 text-primary">{months[month]} {year}</h2>
                <button onClick={nextMonth} className="btn rounded-5 py-1">
                    <i className="bi bi-arrow-right text-primary h1"></i>
                </button>
            </div>
            <div className="container">
                <div className="row flex-nowrap">
                    {weekDays.map((day,i)=>(
                        <div key={i} className="col fw-bold text-center p-0">{day}</div>
                    ))}
                </div>
                {[...Array(6)].map((_,i) => (
                    <div key={i} className="row flex-nowrap">
                        {[...Array(7)].map((_,j) => {   
                            const firstCalendarDay = new Date();
                            firstCalendarDay.setMonth(month);
                            firstCalendarDay.setYear(year);
                            firstCalendarDay.setDate(1);
                            if (firstCalendarDay.getDay() !== 0) {
                                firstCalendarDay.setDate(firstCalendarDay.getDate() - firstCalendarDay.getDay());
                            }

                            const currentDay = new Date(firstCalendarDay);
                            currentDay.setDate(firstCalendarDay.getDate()+(7*i)+(j));
                            
                            let dayAssignments = [];

                            // Crappy linear search.
                            for (const assignment of assignments) {
                                // console.log(JSON.stringify(assignment));
                                let dateStr = `${assignment.dateDue}T${assignment.timeDue}`;
                                let due = new Date(dateStr);
                                if (due.getMonth() === currentDay.getMonth() && due.getDate() === currentDay.getDate() && due.getFullYear() === currentDay.getFullYear()) {
                                    dayAssignments.push({
                                        name: assignment.assignment,
                                        // course: key,
                                        due: due,
                                        submitted: assignment.submitted
                                    });
                                    // console.log("added assignment");
                                }
                            }
                            
                            // console.log(`cur month ${currentDay.getMonth()} should be ${month} for date ${currentDay} (first ${firstCalendarDay})`);
                            const dimmed = currentDay.getMonth() !== month;
                            const itsToday = currentDay.getFullYear() === today.getFullYear() && currentDay.getMonth() === today.getMonth() && currentDay.getDate() === today.getDate();
                            return(
                                <div key={j} className="col d-flex p-0 m-0" style={{minWidth: "3rem"}}>
                                    <div className={`card border-primary rounded-2 m-1 p-2 text-right flex-fill ${itsToday? "bg-primary-subtle": dimmed? "bg-dark-subtle":"" }  `}>
                                        <div className="card-body p-0">
                                            <h6 className="card-title">{currentDay.getDate()} {itsToday? "Today":""}</h6>

                                            {dayAssignments.map((assignment, index) => {
                                                return (<div onClick={() => goToAssignment(assignment)} key={index} className={`${(assignment.submitted ? "bg-light" : "bg-primary text-white")} mt-1 fw-bold user-select-none`} style={{ fontSize: '10px', padding: '0.25rem', borderRadius: '0.2rem', cursor: 'pointer' }}>
                                                    
                                                    {assignment.name}
                                                </div>)
                                            })}
                                        </div>
                                    </div>
                                </div>

                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
        // <div className={"container-fluid px-4 h-100"}>
        //     {[...Array(5)].map((_, i) => (
        //         <div key={i} className="row mt-1 d-flex"  style={{height: "22%"}}>
        //         {thisWeek && thisWeek.slice(i*7, (i+1)*7).map((data, idx) => {
        //             return (
        //                     <div key={idx} className="col-sm p-1">
        //                         <div className="w-100 h-100 p-2 d-flex flex-column border border-primary rounded" style={{overflow:"hidden"}}>
        //                             <span className="flex-shrink-0 mb-1 user-select-none">
        //                                 {data.day.getDate()}
        //                             </span>
                                    
        //                             <div className="flex-grow-1 d-flex flex-column justify-content-end w-100">
        //                                 {data.assignments.map((assign, aindex) => {
        //                                     const dueTime = new Intl.DateTimeFormat('en-US', {
        //                                         hour: 'numeric',
        //                                         minute: 'numeric'
        //                                     }).format(assign.due);

        //                                     return (
        //                                         <Link to={`../courses/${assign.course}/assignments/${assign.name}`} className="text-decoration-none" key={aindex}>
        //                                             <div className={`${(assign.submitted ? "bg-primary" : "bg-secondary")} rounded px-2 py-1 mb-1 text-light flex-shrink-1 d-flex flex-row`} style={{fontSize:"12px", userSelect:"none"}}>
        //                                                 <span className="text-nowrap flex-shrink-1 flex-grow-1 font-weight-bold" style={{overflow: "hidden"}}>{assign.name}</span>
        //                                                 <span className="pl-2 text-nowrap flex-shrink-0">{dueTime.toString()}</span>
        //                                             </div>
        //                                         </Link>
        //                                     );
        //                                 })}
        //                             </div>
        //                         </div>
        //                     </div>
        //             );
        //         })}
        //         </div>
        //     ))}
        // </div>
    );
};

export default DeadlineCalendar;