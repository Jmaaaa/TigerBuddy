import React from "react";
import { useParams, useOutletContext } from "react-router-dom";

const CourseHome = () => {
    const {instructor, homeInfo} = useOutletContext();
    const {overview, contact} = homeInfo;


    return (
        <div className="d-flex gap-4 justify-content-between flex-wrap">
            <div className="card flex-grow-1" style={{ flexBasis: '40rem' }}>
                <div className="h3 card-header">Course Overview</div>
                <div className="card-body">
                    <p><strong>Instructor:</strong> {instructor}</p>
                    <p><strong>Description:</strong> {overview.description}</p>
                    <p><strong>Key Topics:</strong> {overview.keyTopics}</p>
                    <p><strong>Expected Outcomes:</strong> {overview.outcomes}</p>
                </div>
            </div>
            <div className="card flex-grow-1" style={{ flexBasis: '20rem' }}>
                <div className="h3 card-header">Contact Information</div>
                <div className="card-body">
                    <p><strong>Phone:</strong> {contact.phone}</p>
                    <p><strong>Email:</strong> {contact.email}</p>
                    <p><strong>Office Hours:</strong> {contact.officeHours}</p>
                </div>
            </div>
        </div>
    );
};

export default CourseHome;
