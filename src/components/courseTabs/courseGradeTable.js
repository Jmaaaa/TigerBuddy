import React from "react"
import { useLocation, useNavigate } from 'react-router-dom';
import { getLetterGrade } from "../../pages/grades";

const CourseGradeTable = ({course}) => {
    const {code, assignments, totalWeight, courseGrade} = course;
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
                    {assignments.map((assignment, i) => {
                        const{name, score, weight} = assignment;
                        return(
                            <tr key={i} onClick={() => goToAssignment(name)} 
                            style={{cursor: "pointer"}}>
                                <td className="p-2">{name}</td>
                                <td className="p-2">{weight}% ({score!==null? (weight/totalWeight*100).toFixed(1) : 0}%)</td>
                                <td className="p-2">0-100</td>
                                <td className="p-2"> {score!==null? `${score} (${getLetterGrade(score)})` : "-"}</td>
                            </tr>   
                        )
                })}
                </tbody>
                {inCourses && (
                    <tfoot className="table-light table-group-divider fw-bold">
                        <tr>
                            <td colSpan={2}></td>
                            <td className="text-end">Course Total:</td>
                            <td>{courseGrade.toFixed(1)} ({getLetterGrade(courseGrade)})</td>
                        </tr>
                    </tfoot>
                )}
            </table>
        </div>
    );
};

export default CourseGradeTable