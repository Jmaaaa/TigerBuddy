import React from "react";
import { CourseCard, AnnouncementCard, CalendarPreview, FeedbackCard} from "../components/dashboardComponents";

const Dashboard = () => {
    
    const courses = [
        {id: 1, code:"ABC1000", name: "Course A", grade: "100% (A+)"},
        {id: 2, code:"ABC1001", name: "Course B", grade: "100% (A+)"},
        {id: 3, code:"ABC1002", name: "Course C", grade: "100% (A+)"},
        {id: 4, code:"ABC1003", name: "Course D", grade: "100% (A+)"},
    ]


    return (
        <>
            <div className="p-5 border d-flex align-items-center bg-light h-10">
                <h1 className="m-2">
                    Welcome to the dashboard
                </h1>
            </div>
            <div className="d-flex flex-row p-3">
                <div className="d-flex flex-column">
                    {courses.map((course) => (
                        <CourseCard key={course.id} course={course}/>
                    ))}
                </div>
                <div className="d-flex flex-column p-3 w-100">
                    <div className="d-flex flex-row h-50">
                        <div className="w-50">
                            <h1 className="m-2">
                            Recent Announcements
                            </h1>
                            <div className="p-2">
                                <AnnouncementCard/>
                            </div>
                        </div>
                        <div>
                            <h1 className="m-2">
                            Recent Feedback
                            </h1>
                            <div className="p-2">
                                <FeedbackCard/>

                            </div>
                        </div>
                    </div>
                    <div>
                        <h1 className="m-2">
                        Upcoming Schedule
                        </h1>
                        <div>
                            <CalendarPreview/>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Dashboard;