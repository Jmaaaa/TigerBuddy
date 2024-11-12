import React from "react";
import { CourseCard, AnnouncementCard, CalendarPreview, FeedbackCard} from "../components/dashboardComponents";
import { courseCodes } from "../components/data";

const Dashboard = () => {

    return (
        <div className="d-flex flex-column h-100">
            <div className=" d-flex align-items-center bg-light" 
            style={{height: "20%"}}>
                <h1 className="mx-5">
                    Welcome to the dashboard
                </h1>
            </div>
            <div className="d-flex flex-row p-3 " style={{height: "80%"}}>
                <div className="d-flex flex-column w-25">
                    {courseCodes.map((code,index) => (
                        <CourseCard key={index} code={code}/>
                    ))}
                </div>
                <div className="d-flex flex-column p-3 w-100">
                    <div className="d-flex flex-row h-50">
                        <div className="w-50 d-flex flex-column">
                            <h2 className="m-2">
                            Announcements
                            </h2>
                            <div className="p-2 d-flex flex-column overflow-auto">
                                <AnnouncementCard/>
                            </div>
                        </div>
                        <div className="w-50 ps-4 d-flex flex-column">
                            <h2 className="m-2">
                            Feedback
                            </h2>
                            <div className="p-2 d-flex flex-column overflow-auto">
                                <FeedbackCard/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className="m-2 mt-4">
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