import React from "react";
import { Link, Outlet } from "react-router-dom";
import logo512 from "../assets/logo512.png"

const Navbar = () => {
    return (
        <>
            <div className="sticky-top d-flex w-100 align-items-center bg-purple p-2 px-5" style={{height: "10%"}}>
                <div className="d-flex flex-row align-items-center me-auto">
                    <div className="d-flex mx-2">
                        <h1 className="fw-bolder m-0"><span className="text-white">Tiger</span><span className="color-gold">Buddy</span></h1>
                    </div>
                    <img src={logo512} width="64" height="64" alt="logo"></img>
                </div>

                <div>
                    <Link to="/dashboard" className="m-2 p-2 text-white text-decoration-none">Dashboard</Link>
                    <Link to="/deadlines" className="m-2 p-2 text-white text-decoration-none">Deadlines</Link>
                    <Link to="/grades" className="m-2 p-2 text-white text-decoration-none">Grades</Link>
                    <Link to="/login" className="m-2 p-2 text-white text-decoration-none">Sign Out</Link>
                </div>
            </div>
            <div style={{height: "90%"}}> 
                <Outlet/>
            </div>
        </>
    );
};

export default Navbar;