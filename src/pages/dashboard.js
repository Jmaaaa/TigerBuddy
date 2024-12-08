import React, {useState, useEffect} from "react";
import { CourseCard, AnnouncementCard, CalendarPreview, FeedbackCard} from "../components/dashboardComponents";
import { jwtDecode  }  from 'jwt-decode';
import axios from 'axios';


const Dashboard = () => {
    const [courses, setCourses] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    const [feedback, setFeedback] = useState([]);
    const [calenPre, setcalenPre] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const token = localStorage.getItem('token');
    const userId = jwtDecode(token).userId;
    
    useEffect(() => {
        const getUserInfo = async() => {
            try{
                const response = await axios.get(`/api/courses/user/${userId}`);
                setCourses(response.data);

                let announce = [];
                let assign = [];
                let toDo = [];
                for (const course of response.data) {
                    // console.log(JSON.stringify(course));
                    if (course.announcements) {
                        for (const announcement of course.announcements) {
                            let copy = announcement;
                            copy.course = course.code;
                            copy.courseName = course.name;
                            copy.courseProf = course.instructor;
                            announce.push(copy);
                        }
                    }
                    
                    if (course.assignments) {
                        for (const assignment of course.assignments) {
                            const {grade, name, instructor, dueDate} = assignment;
                            toDo.push({code:course.code,name,dueDate,grade});

                            if (grade === null || grade === undefined || grade.score === null)
                                continue;
                            
                            let copy = assignment;
                            copy.course = course.code;
                            copy.courseName = course.name;
                            copy.courseProf = course.instructor;
                            assign.push(copy);
                            // console.log(JSON.stringify(assignment));
                        }
                    }

                }
                setcalenPre(toDo);
                setAnnouncements(announce);
                setFeedback(assign);
                setIsLoading(false);
            }
            catch(err){
                console.log(err);
                setIsLoading(false);
            }
        };
        getUserInfo();
    },[userId]);

    if (isLoading) {
        return <div></div>;
    }

    return (
        <div className="d-flex flex-column flex-fill">
            <div className="container-fluid p-4 ps-5 d-flex align-items-center bg-light">
                <h1 className="mx-5">
                    Welcome
                </h1>
            </div>
            <div className="d-flex flex-row flex-wrap col" style={{margin:"0 3%"}}>
                <div className=" d-flex flex-column col" style={{minWidth: "20rem", minHeight: "40rem", maxWidth: "25rem"}}>
                    {courses.map((course,index) => (
                        <CourseCard key={index} course={course} className="row"/>
                    ))}
                </div>
                <div className="d-flex flex-column col">
                    <div className="d-flex flex-row flex-wrap">
                        <div className="container m-3 d-flex flex-column col " style={{minWidth: "20rem", maxHeight: "30rem"}}>
                            <h2 className="m-2">
                            Announcements
                            </h2>
                            <div className="p-2 d-flex flex-column flex-fill overflow-auto border-top border-bottom">
                                <AnnouncementCard announcements={announcements}/>
                            </div>
                        </div>
                        <div className="container m-3 d-flex flex-column col" style={{minWidth: "20rem", maxHeight: "30rem"}}>
                            <h2 className="m-2">
                            Feedback
                            </h2>
                            <div className="p-2 d-flex flex-column  flex-fill overflow-auto border-top border-bottom">
                                <FeedbackCard feedback={feedback}/>
                            </div>
                        </div>
                    </div>
                    <div className="container d-flex flex-column flex-shrink-0 mt-1">
                        <h2 className="m-2 mb-3">
                        Upcoming Schedule
                        </h2>
                        <div className="container d-flex flex-column">
                            <CalendarPreview assignmentInfo={calenPre}/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;