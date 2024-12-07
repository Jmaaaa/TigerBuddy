import React, { useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getLetterGrade } from "../../pages/grades";
import axios from 'axios';
import { jwtDecode  }  from 'jwt-decode';

const AssignmentPage = () => {
    const {id,name, description, dueDate, grade} = useOutletContext();
    const {score, feedback, submission} = (grade === undefined || grade === null)? 
        {score: null, feedback: "", submission: null} : grade;
    const {file, date, comments} = (submission === null)? {file: "", date: null, comments: []}: submission;


    const graded = (score !== null);
    const submitted = (submission !== null);

    const dateDue = new Date(dueDate);
    const dateSubmit = new Date(date);

    const late = new Date() > dateDue;

    const token = localStorage.getItem('token');
    const userId = jwtDecode(token).userId;

    const [image, setImage] = useState("");
    const [comment, setComment] = useState("");
    const [submitError, setSubmitError] = useState("");
    const inputFile = useRef(null);

    const handleFileUpload = (e) => {
        const { files } = e.target;
        if (files && files.length) {
            setImage(files[0]);
            inputFile.current.value = '';
        }
    };

    const onUploadClick = () => {
        inputFile.current.click();
    };

    const onSubmitClick = () => {
        if(image.name){
            submitAssignment();
        }
        else{
            setSubmitError("Please Upload a file.");
        }
    };

    const submitAssignment = async () => {
        try {
            const response = await axios.patch(
                `/api/assignments/${id}/user/${userId}/submit`, 
                {
                    file: image.name, 
                    comment: comment
                }
            )
            setSubmitError("");
            setImage("");
            setComment("");
            console.log('Submission successful:', response.data);
        }
        catch(err){
            console.log(err);
        }
    };

    return (
        <div>
            <div className="card mb-4">
                <div className="card-body">
                    <table className="table">
                        <tbody>
                            <tr className="align-items-center">
                                <th className="col-2 ">Due Date:</th>
                                <td className="col-4">
                                    {dateDue.toLocaleString('en-US',{timeZone: "GMT"})}
                                    {late&&!submitted?(<span className='bg-danger text-white ms-3 px-2 py-1 rounded-pill'>Overdue</span>) : ("")}
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">Submission Status:</th>
                                <td>
                                    <span className={`${submitted ? 'bg-success text-white px-2 py-1 rounded-pill' : 'text-secondary'}`}>
                                            {submitted ? "Submitted" : ""}
                                    </span>
                                    {submitted?` ${file===""? "": `"${file}"`} on ${dateSubmit.toLocaleString('en-US',{timeZone: "CST"})}`:"No Submission"}
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">Grade:</th>
                                <td>{graded? `${score} (${getLetterGrade(score)})` : "-"}</td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <div className="fw-bold mb-2">Description:</div>
                                    <div>{(description==="" || description===undefined)? "Check Attachments": description}</div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <div className="fw-bold mb-2">Attachments:</div>
                                    <div className=" btn py-2 px-3 bg-primary-subtle d-inline-flex rounded-4 align-items-center gap-2">
                                        <i className="h2 m-0 bi bi-file-earmark-arrow-down"></i>
                                        <span className="h5 m-0">{name} Information</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {graded? 
                    <div>
                        <p className="mb-2">Submissions for {name} are closed.</p>
                        <p style={{ whiteSpace: 'pre-wrap'}}>Comments:</p>
                        <div className="mx-1">
                                {comments.map((comment,i)=>(<p key={i}>{comment}</p>))}
                        </div>
                    </div>    : 
                    <>
                        <div className={"d-flex mx-2"}>
                            <div className="d-flex flex-column flex-fill">
                                <div className="mb-2">
                                    <input
                                        style={{ display: "none" }}
                                        ref={inputFile}
                                        onChange={handleFileUpload}
                                        type="file"
                                    />
                                    <div>
                                        <button className="btn btn-primary d-inline" onClick={onUploadClick}>
                                            {image? "Re-Upload File" : "Upload File"}
                                        </button>
                                        {image && <p className="m-2 d-inline">&quot;{image.name}&quot; uploaded</p>}
                                    </div>
                                </div>
                                <p style={{ whiteSpace: 'pre-wrap'}}>Comments:</p> 
                                <div className="mx-1">
                                    {comments.map((comment,i)=>(<p key={i}>{comment}</p>))}
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between flex-wrap gap-3">
                            <textarea
                                placeholder="Comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="form-control"
                                style={{maxWidth: "40rem"}}
                            />
                            <div className="d-flex flex-column flex-fill justify-content-end">
                                <div className="m-2 text-end">{submitError}</div>
                                <div className="d-flex justify-content-end">
                                    <button className="btn btn-success d-inline" onClick={onSubmitClick} style={{minWidth: "7rem"}}>
                                        { submitted ? "Re-Submit" : "Submit"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                    }
                </div>
            </div>
        </div>
    );
};

export default AssignmentPage;
