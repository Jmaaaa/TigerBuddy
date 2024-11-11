import React from "react"
import { courseData, getAverage, getLetterGrade } from "../data";

const CourseGradeTable = ({code}) => {

    const letterGrade = getLetterGrade(getAverage(code));


    return(
        
        <div className="d-flex">
            <table className="border bg-white m-1 w-100">
                <thead>
                    <tr>
                        <th scope="col" className="p-2">Grade Item </th>
                        <th scope="col" className="p-2">Weight</th>
                        <th scope="col" className="p-2">Range</th>
                        <th scope="col" className="p-2">Grade</th>
                    </tr>
                </thead>
                <tbody>
                    {courseData[code].map((item, index) => (
                        <tr key={index}>
                            <td className="p-2">{item.assignment}</td>
                            <td className="p-2">-</td>
                            <td className="p-2"></td>
                            <td className="p-2"> {item.percent}% ({item.grade})</td>
                        </tr>   
                    ))}
                    <tr>
                        <td className="p-2" colSpan={3}>Course Total</td>
                        <td className="p-2">{letterGrade}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default CourseGradeTable