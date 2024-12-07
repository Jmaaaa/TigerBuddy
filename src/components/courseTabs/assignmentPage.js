import React, { useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getLetterGrade } from "../../pages/grades";

const AssignmentPage = () => {
    const {id,name, description, dueDate, grade} = useOutletContext();
    const {score, feedback, submission} = (grade === undefined || grade === null)? 
        {score: null, feedback: "", submission: null} : grade;
    const {file, date, comments} = (submission === null)? {file: "", date: null, comments: ""}: submission;

    const graded = (score !== null);
    const submitted = (submission !== null);

    const dateDue = new Date(dueDate);
    const dateSubmit = new Date(date);

    const [image, setImage] = useState("");
    const [comment, setComment] = useState("");
    const [savedComment, setSavedComment] = useState("");
    const [submittedd, setSubmitted] = useState("");
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
            setSubmitted(image.name);
            setSavedComment((prevcomment)=> `${prevcomment || ""}\n${comment}`);
            setSubmitError("");
            setImage("");
            setComment("");
        }
        else{
            setSubmitError("Please Upload a file.");
        }
    };
    

    return (
        <div>
            <div className="card mb-4">
                <div className="card-body">
                    <table className="table">
                        <tbody>
                            <tr>
                                <th scope="row">Due Date:</th>
                                <td>{dateDue.toLocaleString('en-US',{timeZone: "GMT"})}</td>
                            </tr>
                            <tr>
                                <th scope="row">Submission Status:</th>
                                <td>{submitted?`Submitted ${file===""? "": `"${file}"`} on ${dateSubmit.toLocaleString('en-US',{timeZone: "GMT"})}`:"No Submission"}</td>
                            </tr>
                            <tr>
                                <th scope="row">Grade:</th>
                                <td>{graded? `${score} (${getLetterGrade(score)})` : "-"}</td>
                            </tr>
                            <tr>
                                <td colSpan={2}>Description{description}</td>
                            </tr>
                        </tbody>
                    </table>
                    {graded? 
                    <div>
                        <p className="mb-2">Submissions for {name} are closed.</p>
                        <p style={{ whiteSpace: 'pre-wrap'}}>Comments: {graded? "(none)":savedComment}</p>
                    </div>    : 
                    <div className={graded? "d-none" : "d-flex justify-content-between"}>
                        <div className="mt-3 w-50">
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
                            <p style={{ whiteSpace: 'pre-wrap'}}>Comments:  {savedComment}</p> 
                            <textarea
                                placeholder="Comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="p-2"
                            />
                        </div>
                        <div className="mt-3 align-self-end">
                            <p className="m-2 d-inline">{submitError}</p>
                            <button className="btn btn-success d-inline" onClick={onSubmitClick}>
                                { submitted ? "Re-Submit" : "Submit"}
                            </button>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default AssignmentPage;
