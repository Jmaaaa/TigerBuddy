import React from "react";
import { Link } from "react-router-dom";
import courseImage from "../../assets/courseImage.png"
import { getAverage, getLetterGrade, nameData } from "../data";

const CourseCard = ({code}) => {
    const name = nameData[code];
    const grade = getLetterGrade(getAverage(code));


    return(
        <Link to={`../courses/${code}`} className="h-100 m-2">
            
            <div className="border m-2 animated-shadow rounded overflow-hidden flex-column h-100">
                <div className="overflow-hidden h-50" style={{backgroundImage: `url(${courseImage})`}}>
                </div>
                <div className="m-2 h-50">
                    <h4 className="m-0">{code} - {name}</h4>
                    <p className="m-0">Grade: {grade}</p>
                </div>
            </div>
        </Link>
    );
};

export default CourseCard;