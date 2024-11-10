import React from "react";
import { useNavigate } from "react-router-dom";

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

    return (
        <>
            <div className="p-4 d-flex align-items-center h-10 bg-light">
                <h1 className="m-5">Grade Summary</h1>
            </div>
            <table className="m-5 border">
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
                    {grades.map((grade) => (
                            <tr key={grade.id} className={grade.id % 2 === 0 ? "":"bg-light"} onClick={()=>goToCourse(grade.code)}>
                                <td className="p-2">{grade.code}</td>
                                <td className="p-2">{grade.instructor}</td>
                                <td className="p-2">{grade.grade}</td>
                                <td className="p-2">{grade.hours}</td>
                                <td className="p-2">{grade.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Grades;