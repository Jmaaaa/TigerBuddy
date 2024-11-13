import React, {useState} from "react";
import { Link } from "react-router-dom";
import { assignmentData, profData, getAverageGrade, getQualityPoints } from "../components/data";
import CourseGradeTable from "../components/courseTabs/courseGradeTable";
const Grades = () => {
    
    const gradeList = Object.keys(assignmentData).map((course) => ({
        code: course,
        grade: getAverageGrade(course),
        hours: 3,
        points: getQualityPoints(course)*3,
        instructor: profData[course],
    }));

    const [activeRows,setActiveRows] = useState([]);

    const toggleActive = (index) => {
        setActiveRows(prevActiveRows => {
            const updatedActiveRows = [...prevActiveRows];
            updatedActiveRows[index] = !updatedActiveRows[index];
            return updatedActiveRows;
        })
    };

    
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
                        {gradeList.map((grade,index) => (
                            <React.Fragment key={index}> 
                                <tr data-bs-toggle="collapse" 
                                data-bs-target={`#${index}-subtable`}
                                style={{cursor: "pointer"}}
                                className={activeRows[index] ? "table-active" : ""}
                                onClick={()=>toggleActive(index)}>
                                    <td className="p-2">{grade.code}</td>
                                    <td className="p-2">{grade.instructor}</td>
                                    <td className="p-2">{grade.grade}</td>
                                    <td className="p-2">{grade.hours.toFixed(1)}</td>
                                    <td className="p-2">{grade.points.toFixed(1)}</td>
                                </tr>
                                <tr className="table-active">
                                    <td colSpan={5} className="p-0">
                                        <div className="collapse" id={`${index}-subtable`}>
                                            <CourseGradeTable code={grade.code}/>
                                            <p className="m-1 mx-3 p-0">(<Link to={`../courses/${grade.code}`}>Go to course page</Link>)</p>
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