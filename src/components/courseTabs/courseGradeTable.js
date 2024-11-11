import React from "react"
import { courseData } from "../data";

const CourseGradeTable = ({code}) => {
        console.log(code);
    return(
        
        <div className="d-flex">
            <table className="border bg-white m-1 w-100">
                <thead>
                    <tr>
                        <th scope="col" className="p-2">Grade Item </th>
                        <th scope="col" className="p-2">Weight</th>
                        <th scope="col" className="p-2">Grade</th>
                        <th scope="col" className="p-2">Range</th>
                    </tr>
                </thead>
                <tbody>
                    {courseData[code].map((item, index) => (
                        <tr key={index}>
                            <td className="p-2">{item.assignment}</td>
                            <td className="p-2">-</td>
                            <td className="p-2">{item.grade}</td>
                            <td className="p-2">-</td>
                        </tr>   
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CourseGradeTable