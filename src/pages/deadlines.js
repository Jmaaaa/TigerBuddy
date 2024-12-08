import React, {useState, useEffect} from "react";
import DeadlineCard from "../components/deadlineComponents/deadlineCard.js";
//import { courseData } from "../../components/data.js"; 
import DeadlineCalendar from "../components/deadlineComponents/deadlineCalendar.js"
import { jwtDecode  }  from 'jwt-decode';
import axios from 'axios';

const Deadlines = () => {
    const token = localStorage.getItem('token');
    const userId = jwtDecode(token).userId;
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [courseCodes, setCourseCodes] = useState([]);


    useEffect(() => {
        const getUserInfo = async() => {
            try{
                const response = await axios.get(`/api/courses/user/${userId}`);
                setCourses(response.data);
                let codes=[];
                for(const course of response.data) {
                    codes.push(course.code);
                }
                setCourseCodes(codes);
                setIsLoading(false);
            }
            catch(err){
                console.log(err);
                setIsLoading(false);
            }
        };
        getUserInfo();

    },[userId]);


    const [selectedClass, setSelectedClass] = useState("all");

    const deadlines = courses.reduce((acc, course) => {
        const pendingAssignments = course.assignments.filter((assignment) => 
            new Date() < new Date(assignment.dueDate));
        acc[course.code] = pendingAssignments;
        return acc;
    },{});

    const handleClassFilter = (course) => {
        setSelectedClass(course);
    };

    const filteredDeadlines = courseCodes.filter((code) => 
         (selectedClass === "all" && deadlines[code]) || 
        (selectedClass !== "all" && code === selectedClass)
    );

    if (isLoading) {
        return <div></div>;
    }

    const calendarDeadlines = filteredDeadlines.reduce((obj, key) => {
        if(deadlines[key]) obj[key] = deadlines[key];
        return obj;
    },{});

    return (
        <div className="d-flex flex-column flex-fill">
            <div className="container-fluid p-4 ps-5 d-flex align-items-center bg-light">
                <h1 className="mx-5" >Deadlines</h1>
            </div>
            <div className="d-flex flex-row-reverse gap-2 flex-wrap my-4 gap-5"style={{margin:"0 5%"}}>
                <div className="container col d-flex flex-column">
                    <DeadlineCalendar deadlines={calendarDeadlines}/>
                </div>
                <div className="container col d-flex flex-column gap-3" style={{maxWidth: "40rem"}}>
                        <div className="d-flex-inline flex-row flex-wrap row gap-2">
                            <button onClick={() => handleClassFilter("all")} className={`btn btn-outline-primary col ${selectedClass === "all" ? "active" : ""}`}>All</button>
                            {courses.map(({code},index)=>(
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