import React from "react";
import { useParams, Link, Outlet } from 'react-router-dom';
import { courseData } from "../components/data";

const Course = () => {
    const { name } = useParams();
    
    return (
        <>
            <div className=" border d-flex align-items-center bg-light" style={{height: "20%"}}>
                <h1 className="mx-5">
                    {name}
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