import React, {useState, useEffect} from "react";
import { CourseCard, AnnouncementCard, CalendarPreview, FeedbackCard} from "../components/dashboardComponents";
import { courseCodes } from "../components/data";
import { jwtDecode  }  from 'jwt-decode';
import axios from 'axios';


const Dashboard = () => {
    const [courses, setCourses] = useState([]);
    const token = localStorage.getItem('token');
    const userId = jwtDecode(token).userId;
    
    useEffect(() => {
        const getUserInfo = async() => {
            try{
                const response = await axios.get(`/api/courses/user/${userId}`);
                console.log(response.data);
                setCourses(response.data);
            }
            catch(err){
                console.log(err);
            }
        };
        getUserInfo();
    },[userId]);

    

    return (
        <div className="d-flex flex-column flex-fill">
            <div className="container-fluid p-4 ps-5 d-flex align-items-center bg-light">
                <h1>
                    Welcome to the dashboard
                </h1>
            </div>
            <div className="d-flex flex-row flex-wrap">
                <div className=" d-flex flex-column ms-4" style={{minWidth: "20rem", minHeight: "40rem"}}>
                    {courses.map((course,index) => (
                        <CourseCard key={index} course={course} userId={userId} className="flex-fill"/>
                    ))}
                </div>
                <div className="d-flex flex-column col">
                    <div className="d-flex flex-row flex-wrap">
                        <div className="container m-3 d-flex flex-column col " style={{minWidth: "20rem", maxHeight: "30rem"}}>
                            <h2 className="m-2">
                            Announcements
                            </h2>
                            <div className="p-2 d-flex flex-column flex-fill overflow-auto border-top border-bottom">
                                <AnnouncementCard/>
                            </div>
                        </div>
                        <div className="container m-3 d-flex flex-column col" style={{minWidth: "20rem", maxHeight: "30rem"}}>
                            <h2 className="m-2">
                            Feedback
                            </h2>
                            <div className="p-2 d-flex flex-column  flex-fill overflow-auto border-top border-bottom">
                                <FeedbackCard/>
                            </div>
                        </div>
                    </div>
                    <div className="container d-flex flex-column flex-shrink-0 mt-1">
                        <h2 className="m-2 mb-3">
                        Upcoming Schedule
                        </h2>
                        <div className="container d-flex flex-column">
                            <CalendarPreview/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;