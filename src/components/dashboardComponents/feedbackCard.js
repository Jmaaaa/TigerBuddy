import React, { useEffect, useState } from "react";
import { courseAnnouncementsData, courseData, nameData, profData } from "../data";
import feedbackImg from "../../assets/feedback.png";

const FeedbackCard = () => {
    const [feedback, setFeedback] = useState([]);

    useEffect(() => {
        let allFeedback = [];
        for (const [course, data] of Object.entries(courseData)) {
            for (const feedback of data) {
                allFeedback.push({
                    // date: new Date(announcement.date),
                    course: course,
                    title: feedback.assignment,
                    grade: feedback.grade,
                    text: "Good job!"
                });
            }
        }

    
        allFeedback.push({
            title: "Assignment 1",
            course: "ABC2345",
            id: 2,
            text: "Good job!"
        });

        setFeedback(allFeedback);
    });
    
    return (
        <div className="d-flex flex-column me-2">
            {feedback.map((data, idx) => {
                return (
                    <div className="d-flex flex-row w-100 p-3 mb-2 bg-light bg-gradient rounded" key={idx}>
                        <div><img src={feedbackImg} width="32" className="rounded"/></div>
                        <div className="d-flex flex-column ms-3">
                            <h5 className="mb-1">{data.title}</h5>
                            <h6 className="mb-1">2024 {nameData[data.course]} for {profData[data.course]}</h6>
                            <span className="d-flex flex-row">
                                <p className="small my-0">({data.grade})</p>
                                <p className="small ms-1 my-0">{data.text}</p>
                            </span>
                            
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default FeedbackCard;