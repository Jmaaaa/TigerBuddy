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
        
        <div className="d-flex border border-2 rounded-2 overflow-hidden">
            <table className="table table-hover mb-0">
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
                        const{name, grade, weight} = assignment;
                        return(
                            <tr key={i} onClick={() => goToAssignment(name)} 
                            style={{cursor: "pointer"}}>
                                <td className="p-2">{name}</td>
                                <td className="p-2">{weight}% ({grade && grade.score !==null? (weight/totalWeight*100).toFixed(1) : 0}%)</td>
                                <td className="p-2">0-100</td>
                                <td className="p-2">{(grade && grade.score !== null)? `${grade.score} (${getLetterGrade(grade.score)})`: "-" }
                                </td>
                            </tr>   
                        )
                })}
                </tbody>
                {inCourses && (
                    <tfoot className="table-light table-group-divider fw-bold" style={{borderBottomColor: "transparent"}}>
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