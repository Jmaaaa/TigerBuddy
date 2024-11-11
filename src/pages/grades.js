import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { courseData } from "../components/data";
import CourseGradeTable from "../components/courseTabs/courseGradeTable";

const Grades = () => {
    
    const grades = [
        {id: 1, code:"ABC1000", instructor: "First Name Last Name", grade: "100% (A+)", hours: "-", points: "-"},
        {id: 2, code:"ABC2345", instructor: "First Name Last Name", grade: "100% (A+)", hours: "-", points: "-"},
        {id: 3, code:"ABC3333", instructor: "First Name Last Name", grade: "100% (A+)", hours: "-", points: "-"},
        {id: 4, code:"ABC1111", instructor: "First Name Last Name", grade: "100% (A+)", hours: "-", points: "-"},
    ];
    

    const navigate = useNavigate();

    const goToCourse = (code) => {
        navigate(`../courses/${code}`);
    };


    
//grade.id % 2 === 0 ? "":"bg-light"

    return (
        <>
            <div className="d-flex align-items-center  bg-light" style={{height: "20%"}}>
                <h1 className="mx-5" >Grade Summary</h1>
            </div>
            <div className="d-flex justify-content-center p-5">
                <table className="border w-75 mb-5">
                    <thead className="border-bottom bg">
                        <tr>
                            <th scope="col" className="p-2">Course</th>
                            <th scope="col" className="p-2">Instructor</th>
                            <th scope="col" className="p-2">Grade</th>
                            <th scope="col" className="p-2">Hours</th>
                            <th scope="col" className="p-2">Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {grades.map((grade,index) => (
                            <React.Fragment key={index}> 
                                <tr data-bs-toggle="collapse" 
                                data-bs-target={`#${index}-subtable`}
                                className="border">
                                    <td className="p-2">{grade.code}</td>
                                    <td className="p-2">{grade.instructor}</td>
                                    <td className="p-2">{grade.grade}</td>
                                    <td className="p-2">{grade.hours}</td>
                                    <td className="p-2">{grade.points}</td>
                                </tr>
                                <tr className="bg-light">
                                    <td colSpan={5} className="p-0">
                                        <div className="collapse" id={`${index}-subtable`}>
                                            <CourseGradeTable code={grade.code}/>
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