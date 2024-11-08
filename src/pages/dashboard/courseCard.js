import React from "react";

const CourseCard = ({course}) => {
    const {name, grade} = course;
    return(
        <div>
            <p>{name}</p>
            <p>Grade: {grade}</p>
        </div>
    );
};

export default CourseCard;