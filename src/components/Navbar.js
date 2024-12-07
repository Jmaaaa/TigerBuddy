import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import logo512 from "../assets/logo512.png"

const Navbar = () => {

    const links = [
        {name: "Dashboard", path: "/dashboard"},
        {name: "Deadlines", path: "/deadlines"},
        {name: "Grades", path: "/grades"},
        {name: "Sign Out", path: "/login"}
    ];

    const curPage = useLocation().pathname;

    return (
        <>
            <div className="navbar sticky-top navbar-dark bg-primary">
                <div className="container-fluid d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <a className="navbar-brand d-flex align-items-center mx-5" href="#/dashboard">
                        <span className="h1 fw-bolder"><span className="text-white">Tiger</span><span className="color-gold">Buddy</span></span>
                        <img src={logo512} width="64" height="64" alt="logo" className="ms-2"></img>
                    </a>

                    <ul className="navbar-nav mx-3 d-flex flex-row gap-3">
                        {links.map(({name,path},i) => (
                            <li key={i}className="nav-item">
                                <Link to={path} className={`nav-link ${(curPage.endsWith(path))? "text-white": ""}`}>{name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="d-flex flex-column flex-fill overflow-auto"> 
                <Outlet/>
            </div>
        </>
    );
};

export default Navbar;