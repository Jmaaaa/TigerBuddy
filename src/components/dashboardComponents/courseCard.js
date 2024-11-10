import React from "react";
import { Link } from "react-router-dom";

const CourseCard = ({course}) => {
    const {code, name, grade} = course;


    return(
        <Link to={`../courses/${code}`}>
            
            <div className="border m-2">
                <div className="bg-dark" style={{ width: "300px", height: "80px"}}/>
                <div className="m-2">
                    <h4 className="m-0">{name}</h4>
                    <p className="m-0">Grade: {grade}</p>
                </div>
            </div>
        </Link>
    );
};

export default CourseCard;