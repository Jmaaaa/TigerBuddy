import React from "react";
import { Link } from "react-router-dom";

const CourseCard = ({course}) => {
    const {code, name, grade} = course;


    return(
        <Link to={`../courses/${code}`}>
            <div className="border p-2 m-2">
                <h3>{name}</h3>
                <p>Grade: {grade}</p>
            </div>
        </Link>
    );
};

export default CourseCard;