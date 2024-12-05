import React from "react";
import { Link, Outlet } from "react-router-dom";
import logo512 from "../assets/logo512.png"

const Navbar = () => {
    return (
        <>
            <div className="navbar navbar-expand-lg bg-primary sticky-top">
                <div className="container-fluid d-flex">
                    <a className="navbar-brand d-flex align-items-center" href="#/dashboard">
                        <span className="h1 fw-bolder ms-5"><span className="text-white">Tiger</span><span className="color-gold">Buddy</span></span>
                        <img src={logo512} width="64" height="64" alt="logo" className="ms-2"></img>
                    </a>

                    <ul className="navbar-nav ms-auto me-4 d-flex flex-row gap-3 ">
                        <li className="nav-item">
                            <Link to="/dashboard" className="nav-link text-white">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/deadlines" className="nav-link text-white">Deadlines</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/grades" className="nav-link text-white">Grades</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link text-white">Sign Out</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div style={{height: "90%"}}> 
                <Outlet/>
            </div>
        </>
    );
};

export default Navbar;