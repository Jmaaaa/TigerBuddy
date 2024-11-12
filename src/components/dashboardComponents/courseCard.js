import React from "react";
import { Link } from "react-router-dom";
import courseImage from "../../assets/courseImage.png"
import { getAverageGrade, profData } from "../data";

const CourseCard = ({code}) => {
    const grade = getAverageGrade(code);
    const professor = profData[code];

    return(
        <Link to={`../courses/${code}`} className="h-100 m-2 text-reset text-decoration-none">
            
            <div className="border m-2 animated-shadow rounded overflow-hidden flex-column h-100">
                <div className="overflow-hidden h-50" style={{backgroundImage: `url(${courseImage})`}}>
                </div>
                <div className="m-2 h-50">
                    <h5 className="m-0 color-purple">{code} | {professor}</h5>
                    <p className="m-0 text-secondary">Grade: {grade}</p>
                </div>
            </div>
        </Link>
    );
};

export default CourseCard;