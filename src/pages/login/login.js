import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo512 from "../../assets/logo512.png"
import "./login.css"

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
        <div className="d-flex flex-column flex-fill align-items-center justify-content-center">
            <div className="d-flex w-100 align-items-center bg-white p-2 px-5 fixed-top" style={{height: "10%"}}>
                <div className="d-flex mx-2">
                    <h1 className="fw-bolder m-0"><span className="color-purple">Tiger</span><span className="color-gold">Buddy</span></h1>
                </div>
                <img src={logo512} width="64" height="64" alt="logo"></img>
            </div>
            <div className="bg-white w-25 d-flex flex-column align-items-center justify-content-around rounded p-5 ">
                
                <form onSubmit={handleLogin} className="login-form">
                    <input
                        type="text"
                        placeholder="Username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="login-input"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="login-input"
                    />
                    <button type="submit" className="login-button">
                        Log In
                    </button>
                </form>
            </div>
        </div>
        
    );
};

export default Login;