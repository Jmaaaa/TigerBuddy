import React, { useState } from "react";
import { courseAnnouncementsData } from "../data"; 
import { useOutletContext } from "react-router-dom";

const CourseAnnouncements = () => {
    const {announcements} = useOutletContext();

    const [openIndex, setOpenIndex] = useState(null);

    const toggleDescription = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="d-flex flex-column gap-3">
            {announcements.map(({name, description, date}, index) => (
                <div
                    key={index} 
                    className="card"
                    onClick={() => toggleDescription(index)}
                    aria-expanded={openIndex === index}
                >
                    <div className={`card-header  h5 d-flex gap-3 justify-content-between align-items-center ${openIndex === index ? "": "border-bottom-0"}`}>
                        <div className="d-flex flex-fill flex-wrap gap-1 justify-content-between align-items-center">
                            <div>{name}</div>
                            <div className="text-muted fw-normal h6 m-0">{new Date(date).toDateString()}</div>
                        </div>
                        <i className={`bi ps-1 ${openIndex === index ? 'bi-chevron-up' : 'bi-chevron-down'}`}/>
                    </div>
                    {openIndex === index && (
                        <div className="card-body">
                            <p className="card-text">{description}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CourseAnnouncements;
