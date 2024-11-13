import React from "react"
import { assignmentData, getGrade, getCurrentWeight, getAverageGrade } from "../data";
import { useLocation, useNavigate } from 'react-router-dom';

const CourseGradeTable = ({code}) => {

    const letterGrade = getAverageGrade(code);
    const curPage = useLocation().pathname;
    const inCourses = curPage.startsWith("/courses") ? true : false;
    const navigate = useNavigate();

    const goToAssignment = (assignment) => {
        navigate(`/courses/${code}/assignments/${assignment}`);
    };

    return(
        
        <div className="d-flex">
            <table className="table table-hover border m-1 w-100">
                <thead className="table-light">
                    <tr>
                        <th scope="col" className="p-2">Grade Item </th>
                        <th scope="col" className="p-2">Weight</th>
                        <th scope="col" className="p-2">Range</th>
                        <th scope="col" className="p-2">Grade</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {assignmentData[code].map((item, index) => (
                        <tr key={index} onClick={() => goToAssignment(item.assignment)} 
                        style={{cursor: "pointer"}}>
                            <td className="p-2">{item.assignment}</td>
                            <td className="p-2">{item.weight}% ({item.graded? getCurrentWeight(item.weight,code) : 0}%)</td>
                            <td className="p-2">0-100</td>
                            <td className="p-2"> {item.graded? getGrade(item.percent): "-"}</td>
                        </tr>   
                    ))}
                </tbody>
                {inCourses && (
                    <tfoot className="table-light table-group-divider fw-bold">
                        <tr>
                            <td colSpan={3}>Course Total</td>
                            <td>{letterGrade}</td>
                        </tr>
                    </tfoot>
                )}
            </table>
        </div>
    );
};

export default CourseGradeTable