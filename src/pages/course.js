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
            <div className="d-flex flex-row h-100">
                <div className="d-flex flex-column p-3 border-right">
                    <Link to={"./home"} className="p-2">Home</Link>
                    <Link to={"./announcements"} className="p-2">Announcments</Link>
                    <Link to={"./modules"} className="p-2">Modules</Link>
                    <Link to={"./assignments"} className="p-2">Assignments</Link>
                    <Link to={"./grades"} className="p-2">Grades</Link>
                </div>
                <div className="p-3 w-100">
                <Outlet context={{ courseGrades: courseData[name] || [] }} />
                </div>
            </div>

        </>
    );
};

export default Course;