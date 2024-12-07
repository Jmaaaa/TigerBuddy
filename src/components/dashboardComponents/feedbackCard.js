import React, { useEffect, useState } from "react";
// import { assignmentData, nameData, profData } from "../data";
import feedbackImg from "../../assets/feedback.png";
import { getLetterGrade } from "../../pages/grades";
import { Link } from "react-router-dom";

const FeedbackCard = ({ feedback }) => {
    // const [gotFeedback, setGotFeedback] = useState(false);
    // const [feedback, setFeedback] = useState([]);

    // useEffect(() => {
    //     if (gotFeedback)
    //         return;
    //     setGotFeedback(true);

    //     let allFeedback = [];
    //     for (const [course, data] of Object.entries(assignmentData)) {
    //         for (const feedback of data) {
    //             allFeedback.push({
    //                 // date: new Date(announcement.date),
    //                 course: course,
    //                 title: feedback.assignment,
    //                 grade: feedback.grade,
    //                 text: "Good job!"
    //             });
    //         }
    //     }

    //     setFeedback(allFeedback);
    // },[gotFeedback]);
    
    return (
        <div className="d-flex flex-column me-2">
            {feedback.map((data, idx) => {
                return (
                        <Link to={`../courses/${data.course}/assignments/${data.name}`} 
                            className="d-flex flex-row w-100 p-3 mb-2 bg-light bg-gradient rounded text-decoration-none text-dark" key={idx}>
                            <div><img src={feedbackImg} alt="feedback-icon" width="32" className="rounded"/></div>
                            <div className="d-flex flex-column ms-3">
                                <h5 className="mb-1">{data.name}</h5>
                                <h6 className="mb-1">2024 {data.courseName} for {data.courseProf}</h6>
                                <span className="d-flex flex-row">
                                    <p className="small my-0">{data.grade.score} ({getLetterGrade(data.grade.score)})</p>
                                    {/* <p className="small ms-1 my-0">{data.text}</p> */}
                                    <p className="small ms-3 my-0">{data.grade.feedback}</p>
                                </span>
                                
                            </div>
                        </Link>
                );
            })}
        </div>
    );
};

export default FeedbackCard;