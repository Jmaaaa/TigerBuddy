import React from "react";
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import { nameData } from "../components/data";
import courseImage from "../assets/courseImage.jpg"

const Course = () => {
    const { name } = useParams();
    const courseName = nameData[name];
    
    const curPage = useLocation().pathname;

    const pages = {
        'Home': 'home',
        'Announcements': 'announcements',
        'Modules': 'modules',
        'Assignments': 'assignments',
        'Grades': 'grades'
    };
    return (
        <>
            <div className="d-flex align-items-center bg-light" style={{height: "20%", backgroundImage: `url(${courseImage})`, backgroundPosition: "auto 100%"}}>
                <h1 className="mx-5 text-white" style={{textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)"}}>
                    {name} - {courseName}
                </h1>
            </div>
            <div className="d-inline-flex flex-row w-100" style={{minHeight: "80%"}}>
                <div className="d-flex flex-column p-3 border-right bg-light" style={{width: "12%"}}>
                    {Object.entries(pages).map(([name, path], idx) => (
                            <Link key={idx} to={`./${path}`} 
                            className={`${(curPage.endsWith(path) ? 'text-primary' : 'text-secondary')} p-2 text-decoration-none`}>
                                <h5>{name}</h5>
                            </Link>
                        
                    ))}

                </div>
                <div className="p-3 w-75">
                    <Outlet/>
                </div>
            </div>

        </>
    );
};

export default Course;