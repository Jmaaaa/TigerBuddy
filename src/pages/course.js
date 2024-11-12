import React from "react";
import { useParams, Link, Outlet } from 'react-router-dom';
import { courseData, nameData } from "../components/data";
import courseImage from "../assets/courseImage.jpg"

const Course = () => {
    const { name } = useParams();
    const courseName = nameData[name];
    
    return (
        <>
            <div className="d-flex align-items-center bg-light" style={{height: "20%", backgroundImage: `url(${courseImage})`, backgroundPosition: "auto 100%"}}>
                <h1 className="mx-5 text-white" style={{textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)"}}>
                    {name} - {courseName}
                </h1>
            </div>
            <div className="d-flex flex-row w-100" style={{minHeight: "80%"}}>
                <div className="d-flex flex-column p-3 border-right bg-light" style={{width: "12%"}}>
                    <Link to={"./home"} className="p-2 text-decoration-none"><h5>Home</h5></Link>
                    <Link to={"./announcements"} className="p-2 text-decoration-none"><h5>Announcments</h5></Link>
                    <Link to={"./modules"} className="p-2 text-decoration-none"><h5>Modules</h5></Link>
                    <Link to={"./assignments"} className="p-2 text-decoration-none"><h5>Assignments</h5></Link>
                    <Link to={"./grades"} className="p-2 text-decoration-none"><h5>Grades</h5></Link>
                </div>
                <div className="p-3 w-75">
                <Outlet context={{ courseGrades: courseData[name] || [] }} />
                </div>
            </div>

        </>
    );
};

export default Course;