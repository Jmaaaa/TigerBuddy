import React from "react";
import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
    return (
        <>
            <div className="d-flex p-2 bg-purple sticky-top">
                <h1 className="text-white">Tiger Buddy</h1>
                <div className="d-flex ml-auto">
                    <Link to="/dashboard" className="m-2 p-2 text-white">Dashboard</Link>
                    <Link to="/deadlines" className="m-2 p-2 text-white">Deadlines</Link>
                    <Link to="/grades" className="m-2 p-2 text-white">Grades</Link>
                    <Link to="/login" className="m-2 p-2 text-white">Sign Out</Link>
                </div>
            </div>
            <Outlet/>
        </>
    );
};

export default Navbar;