import React, { useState } from "react";
import { courseAnnouncementsData } from "../data"; 
import { useOutletContext } from "react-router-dom";

const CourseAnnouncements = () => {
    const course = useOutletContext();
    if(!course){

    }
    const { announcements} = course;

    const [openIndex, setOpenIndex] = useState(null);

    const toggleDescription = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="container mt-4">
            {announcements.length > 0 ? (
                <div className="list-group">
                    {announcements.map((announcement, index) => (
                        <div key={index} className="mb-3">
                            <button
                                className="list-group-item list-group-item-action"
                                onClick={() => toggleDescription(index)}
                                aria-expanded={openIndex === index}
                                style={{ cursor: 'pointer', width: '100%', textAlign: 'left' }}
                            >
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="font-weight-bold">{announcement.name}</span>
                                    <div className="d-flex align-items-center">
                                        <span className="text-muted mr-2">Date: {new Date(announcement.date).toDateString()}</span>
                                        <span className={`ml-2 ${openIndex === index ? 'rotate-icon' : ''}`}>
                                            <i className={`bi ${openIndex === index ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
                                        </span>
                                    </div>
                                </div>
                                {openIndex === index && (
                                    <div className="mt-2">
                                        <p className="p-2 mb-0 bg-light rounded">{announcement.description}</p>
                                    </div>
                                )}
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No announcements available for this course.</p>
            )}
        </div>
    );
};

export default CourseAnnouncements;
