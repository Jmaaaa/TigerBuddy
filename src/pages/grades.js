import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import CourseGradeTable from "../components/courseTabs/courseGradeTable";
import { jwtDecode  }  from 'jwt-decode';
import axios from 'axios';

const thresholds = [
    { min: 97, grade: 'A+', points: 4.3},
    { min: 93, grade: 'A', points: 4 },
    { min: 90, grade: 'A-', points: 3.7 },
    { min: 87, grade: 'B+', points: 3.3 },
    { min: 83, grade: 'B', points: 3 },
    { min: 80, grade: 'B-', points: 2.7 },
    { min: 77, grade: 'C+', points: 2.3 },
    { min: 73, grade: 'C', points: 2 },
    { min: 70, grade: 'C-', points: 1.7 },
    { min: 67, grade: 'D+', points: 1.3 },
    { min: 63, grade: 'D', points: 1 },
    { min: 60, grade: 'D-', points: 0.7 },
    { min: 0, grade: 'F', points: 0 }
  ];

export const getLetterGrade = (score) => {
    const threshold = thresholds.find(threshold => score >= threshold.min);
    return threshold ? threshold.grade : 'N/A'; 
};

export const getPointGrade = (score => {
    const threshold = thresholds.find(threshold => score >= threshold.min);
    return threshold ? threshold.points : 'N/A'; 
})

const Grades = () => {
    const token = localStorage.getItem('token');
    const userId = jwtDecode(token).userId;
    const [courses, setCourses] = useState([]);
    const [activeRows,setActiveRows] = useState([]);

    const toggleActive = (index) => {
        setActiveRows(prevActiveRows => {
            const updatedActiveRows = [...prevActiveRows];
            updatedActiveRows[index] = !updatedActiveRows[index];
            return updatedActiveRows;
        })
    };

    
    useEffect(() => {
        const getUserInfo = async() => {
            try{
                const response = await axios.get(`/api/courses/user/${userId}`);
                setCourses(response.data);
            }
            catch(err){
                console.log(err);
            }
        };
        getUserInfo();

    },[userId]);

    

    return (
        <div className="d-flex flex-column flex-fill">
            <div className="container-fluid p-4 ps-5 d-flex align-items-center bg-light">
                <h1>Grade Summary</h1>
            </div>
            <div className="d-flex justify-content-center mt-5" style={{margin:"0 5% 10%"}}>
                <table className="table border table-hover"style={{maxWidth: "80rem"}}>
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
                        {courses.map(({code, instructor, courseGrade, hours},index) => (
                            <React.Fragment key={index}> 
                                <tr data-bs-toggle="collapse" 
                                data-bs-target={`#${index}-subtable`}
                                style={{cursor: "pointer"}}
                                className={activeRows[index] ? "table-active" : ""}
                                onClick={()=>toggleActive(index)}>
                                    <td className="p-2">{code}</td>
                                    <td className="p-2">{instructor}</td>
                                    <td className="p-2">{courseGrade.toFixed(1)} ({getLetterGrade(courseGrade)})</td>
                                    <td className="p-2">{hours.toFixed(1)}</td>
                                    <td className="p-2">{(getPointGrade(courseGrade)*hours).toFixed(1)}</td>
                                </tr>
                                <tr className="table-active">
                                    <td colSpan={5} className="p-0">
                                        <div className="collapse" id={`${index}-subtable`}>
                                            <CourseGradeTable code={code}/>
                                            <p className="m-1 mx-3 p-0">(<Link to={`../courses/${code}`}>Go to course page</Link>)</p>
                                        </div>
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}
                        
                    </tbody>
                    <tfoot className="table-group-divider">
                        <tr className="table-light">
                                <td colSpan={2}/>
                                <th>Totals:</th>
                                    {(() => {
                                        const totals = courses.reduce((acc, { courseGrade, hours }) => {
                                            acc.hours += hours;
                                            acc.points += getPointGrade(courseGrade) * hours;
                                            return acc;
                                        }, { hours: 0, points: 0 }); // Initialize accumulator

                                        return (
                                            <>
                                                <th>{totals.hours.toFixed(1)}</th>
                                                <th>{totals.points.toFixed(1)}</th>
                                            </>
                                        );
                                    })()}
                            </tr>
                        </tfoot>
                </table>
            </div>
        </div>
    );
};

export default Grades;