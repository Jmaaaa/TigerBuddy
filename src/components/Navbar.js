import React from "react";
import { Link, Outlet } from "react-router-dom";
import logo512 from "../assets/logo512.png"

const Navbar = () => {
    return (
        <>
            <div className="navbar navbar-expand-lg bg-primary sticky-top">
                <div className="container-fluid">
                    <a className="navbar-brand d-flex align-items-center" href="#/dashboard">
                        <span className="h1 fw-bolder ms-5"><span className="text-white">Tiger</span><span className="color-gold">Buddy</span></span>
                        <img src={logo512} width="64" height="64" alt="logo" className="ms-2"></img>
                    </a>

                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <Link to="/dashboard" className="m-2 p-2 text-white text-decoration-none">Dashboard</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/deadlines" className="m-2 p-2 text-white text-decoration-none">Deadlines</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/grades" className="m-2 p-2 text-white text-decoration-none">Grades</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/login" className="m-2 p-2 text-white text-decoration-none">Sign Out</Link>
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