import React from "react";
import Navbar from "./components/Navbar";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import { Course, Dashboard, Login, Grades, Deadlines } from "./pages"
import { CourseAnnouncements, CourseAssignments, CourseHome, CourseGrades, CourseModules, AssignmentPage } from "./components/courseTabs"


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Navigate to="login" replace/>} />
                <Route path="/login" element={<Login />}/>
                <Route element={<Navbar />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/deadlines" element={<Deadlines />}/>
                    <Route path="/grades" element={<Grades/>}/>
                    <Route path="/courses/:name" element={<Course />}>
                        <Route index element={<Navigate to="home" replace />}/>
                        <Route path="home" element={<CourseHome />}/>
                        <Route path="announcements" element={<CourseAnnouncements />}/>
                        <Route path="modules" element={<CourseModules />}></Route>
                        <Route path="assignments" element={<CourseAssignments />}/>
                        <Route path="assignments/:assignmentName" element={<AssignmentPage/>}/>
                        <Route path="grades" element={<CourseGrades />}/>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}


export default App;