import React from "react";
import Navbar from "./components/Navbar";
import {
    HashRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import { Course, Dashboard, Login, Grades, Deadlines } from "./pages"
import { CourseAnnouncements, CourseAssignments, CourseHome, CourseGrades, CourseModules, AssignmentPage } from "./components/courseTabs"


function App() {
    return (
        <Router>
            <Routes>
                <Route index element={<Navigate to="login" replace />}/>
                <Route path="login" element={<Login />}/>
                <Route element={<Navbar />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="deadlines" element={<Deadlines />}/>
                    <Route path="grades" element={<Grades/>}/>
                    <Route path="courses/:code" element={<Course />}>
                        <Route index element={<Navigate to="home" replace />}/>
                        <Route path="home" element={<CourseHome />}/>
                        <Route path="announcements" element={<CourseAnnouncements />}/>
                        <Route path="modules" element={<CourseModules />}></Route>
                        <Route path="assignments" element={<CourseAssignments />}>
                            <Route path=":assignmentName" element={<AssignmentPage/>}/>
                        </Route>
                        <Route path="grades" element={<CourseGrades />}/>
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
}


export default App;