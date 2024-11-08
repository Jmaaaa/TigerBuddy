import React from "react";
import Navbar from "./components/Navbar";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";
import Login from "./pages/login/login";
import Deadlines from "./pages/deadlines/deadlines";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Navigate to="/login" replace/>} />
                <Route path="/login" element={<Login />}/>
                <Route element={<Navbar />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/deadlines" element={<Deadlines />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}


export default App;