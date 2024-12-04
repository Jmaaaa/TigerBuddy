import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo512 from "../assets/logo512.png"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post("/api/users/login",{
                email,
                password
            });

            if(response.status === 200) {
                console.log("login successful");
                localStorage.setItem('token', response.data.token);
                navigate("/dashboard"); 
            }
        }
        catch(err){
            console.log("Login failed");
        }
    };

    useEffect(() => {
        document.body.style.backgroundColor = '#461D7C';
        return () => {document.body.style.backgroundColor = '';};
    });

    return (
        <div className="d-flex flex-column flex-fill">
            
            <div className="navbar navbar-expand-lg bg-white sticky-top">
                <div className="container-fluid">
                    <a className="navbar-brand d-flex align-items-center" href="#">
                        <span className="h1 fw-bolder ms-5"><span className="color-purple">Tiger</span><span className="color-gold">Buddy</span></span>
                        <img src={logo512} width="64" height="64" alt="logo" className="ms-2"></img>
                    </a>
                </div>
                
            </div>

            <div className="d-flex flex-column flex-fill align-items-center justify-content-center">
                <div className="bg-white card p-5 m-5">
                    
                    <form onSubmit={handleLogin} className="container d-flex flex-column gap-4 align-items-center">
                        <input
                            type="text"
                            placeholder="Username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control form-control-lg"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control form-control-lg"
                        />
                        <button type="submit" className="btn btn-primary btn-lg">
                            Log In
                        </button>
                    </form>
                </div>
            </div>
            
        </div>
        
    );
};

export default Login;