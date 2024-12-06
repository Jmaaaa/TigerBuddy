import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { assignmentData, profData, getAverageGrade, getQualityPoints } from "../components/data";
import CourseGradeTable from "../components/courseTabs/courseGradeTable";
import { jwtDecode  }  from 'jwt-decode';
import axios from 'axios';

const Grades = () => {
    const [activeRows,setActiveRows] = useState([]);

    const toggleActive = (index) => {
        setActiveRows(prevActiveRows => {
            const updatedActiveRows = [...prevActiveRows];
            updatedActiveRows[index] = !updatedActiveRows[index];
            return updatedActiveRows;
        })
    };

    const [courses, setCourses] = useState([]);
    const token = localStorage.getItem('token');
    const userId = jwtDecode(token).userId;
    
    useEffect(() => {
        const getUserInfo = async() => {
            try{
                const response = await axios.get(`/api/courses/user/${userId}`);
                console.log(response.data);
                setCourses(response.data);
            }
            catch(err){
                console.log(err);
            }
        };
        getUserInfo();
    },[userId]);

    
//grade.id % 2 === 0 ? "":"bg-light"

    return (
        <>
            <div className="d-flex align-items-center  bg-light" style={{height: "20%"}}>
                <h1 className="mx-5" >Grade Summary</h1>
            </div>
            <div className="d-flex justify-content-center p-5">
                <table className="table border table-hover  w-75 mb-5">
                    <thead className="table-light">
                        <tr>
                            <th scope="col" className="p-2 ">Course</th>
                            <th scope="col" className="p-2">Instructor</th>
                            <th scope="col" className="p-2">Grade</th>
                            <th scope="col" className="p-2">Hours</th>
                            <th scope="col" className="p-2">Points</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {courses.map((course,index) => (
                            <React.Fragment key={index}> 
                                <tr data-bs-toggle="collapse" 
                                data-bs-target={`#${index}-subtable`}
                                style={{cursor: "pointer"}}
                                className={activeRows[index] ? "table-active" : ""}
                                onClick={()=>toggleActive(index)}>
                                    <td className="p-2">{course.code}</td>
                                    <td className="p-2">{course.instructor}</td>
                                    <td className="p-2">{course.courseGrade.toFixed(1)}</td>
                                    <td className="p-2"></td>
                                    <td className="p-2"></td>
                                </tr>
                                <tr className="table-active">
                                    <td colSpan={5} className="p-0">
                                        <div className="collapse" id={`${index}-subtable`}>
                                            <CourseGradeTable code={course.code}/>
                                            <p className="m-1 mx-3 p-0">(<Link to={`../courses/${course.code}`}>Go to course page</Link>)</p>
                                        </div>
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Grades;