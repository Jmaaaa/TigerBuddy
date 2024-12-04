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
        <div className="d-flex flex-column h-100">
            <div className=" d-flex align-items-center bg-light" 
            style={{height: "15%"}}>
                <h1 className="mx-5">
                    Welcome to the dashboard
                </h1>
            </div>
            <div className="d-flex flex-row p-3 " style={{height: "80%"}}>
                <div className="d-flex flex-column w-25">
                    {courses.map((course,index) => (
                        <CourseCard key={index} course={course} userId={userId}/>
                    ))}
                </div>
                <div className="d-flex flex-column px-3 w-100">
                    <div className="flex-grow-1 d-flex flex-row h-50 mb-1">
                        <div className="w-50 d-flex flex-column">
                            <h2 className="m-2">
                            Announcements
                            </h2>
                            <div className="p-2 d-flex flex-column overflow-auto border-top border-bottom">
                                <AnnouncementCard/>
                            </div>
                        </div>
                        <div className="w-50 ps-4 d-flex flex-column">
                            <h2 className="m-2">
                            Feedback
                            </h2>
                            <div className="p-2 d-flex flex-column overflow-auto border-top border-bottom">
                                <FeedbackCard/>
                            </div>
                        </div>
                    </div>
                    <div className="flex-shrink-0 mt-1">
                        <h2 className="m-2 mb-3">
                        Upcoming Schedule
                        </h2>
                        <div>
                            <CalendarPreview/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;