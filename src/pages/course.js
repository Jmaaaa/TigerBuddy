import React, { useState, useEffect } from "react";
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import courseImage from "../assets/courseImage.jpg"
import { jwtDecode  }  from 'jwt-decode';
import axios from 'axios';

const Course = () => {
    const { code } = useParams();
    const [course, setCourse] = useState({});
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const token = localStorage.getItem('token');
    const userId = jwtDecode(token).userId;
    
    useEffect(() => {
        const getUserInfo = async() => {
            try{
                const response = await axios.get(`/api/courses/${code}/user/${userId}`);
                setCourse(response.data);
                setIsLoading(false);
            }
            catch(err){
                console.log(err);
                setIsLoading(false);
            }
        };
        getUserInfo();
    },[code,userId]);


    const curPage = useLocation().pathname;
    const pathStrings = ((decodeURIComponent(curPage).split('/'))).map(word=> word.charAt(0).toUpperCase() + word.slice(1));

    const pages = [
        { name: "Home", path: 'home', icon: 'house-fill'},
        { name: 'Announcements', path: 'announcements', icon: 'megaphone-fill'},
        { name: 'Modules', path: 'modules', icon: 'book-half'},
        { name: 'Assignments', path:'assignments', icon: 'pencil-square'},
        { name: 'Grades', path: 'grades', icon: 'file-earmark-check-fill'}
    ];

    if (isLoading) {
        return <div></div>;
    }

    return (
        <div className="d-flex flex-column flex-fill">
            <div className="d-flex align-items-center bg-light" style={{backgroundImage: `url(${courseImage})`, backgroundPosition: "auto 100%"}}>
                <h1 className="p-5 text-white" style={{textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)"}}>
                    {code} - {course.name}
                </h1>
            </div>
            <div className="d-flex flex-row flex-fill">
                <div className="d-flex flex-column p-3 bg-light border-end border-secondary-supress">
                    <ul className="nav flex-column gap-2 sticky-top">
                        {pages.map(({name,path,icon}, idx) => (
                            <li key={idx} className="nav-item">
                                <Link to={`./${path}`} state={{course}} 
                                className={`nav-link ${(curPage.endsWith(path) ? 'text-primary' : 'text-secondary')} py-2 px-1 text-decoration-none`}>
                                    <div className="d-flex flex-row justify-content-left align-items-center gap-3">
                                        <i className={`bi bi-${icon} h4`}/>
                                        <h5 className="d-none d-md-inline">{name}</h5>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>

                </div>
                <div className="container">
                    <div className="d-flex flex-column my-4 gap-3" style={{margin:"0 2%"}}>
                        <h1 className="border-bottom pb-2">{curPage.endsWith("home")? "Course Home" :pathStrings.pop()}</h1>
                        <Outlet context={course}/>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Course;