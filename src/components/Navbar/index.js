import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";
import { Outlet } from "react-router-dom";

const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/dashboard" activeStyle>
                        Dashboard
                    </NavLink>
                    
                    <NavLink to="/deadlines" activeStyle>
                        Deadlines
                    </NavLink>

                    <NavLink to="/login" activeStyle>
                        Login
                    </NavLink>
                </NavMenu>
            </Nav>
            <Outlet/>
        </>
    );
};

export default Navbar;