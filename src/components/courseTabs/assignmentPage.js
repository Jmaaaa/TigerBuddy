import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { assignmentData, getGrade } from "../../components/data"; 

const AssignmentPage = () => {
    const { name: code, assignmentName } = useParams();
    const assignment = assignmentData[code]?.find((item) => item.assignment === assignmentName) || {};

    const [image, setImage] = useState("");
    const [comment, setComment] = useState("");
    const [savedComment, setSavedComment] = useState("");
    const [submitted, setSubmitted] = useState("");
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
        <div className="container mt-4">
            <h1>{code} / Assignments / {assignmentName}</h1>
            <div className="card mb-4">
                <div className="card-body">
                    <table className="table">
                        <tbody>
                            <tr>
                                <th scope="row">Due Date:</th>
                                <td>{assignment.dateDue} at {assignment.timeDue}</td>
                            </tr>
                            <tr>
                                <th scope="row">Submission Status:</th>
                                <td>{assignment.submitted || submitted ? `Submitted ${submitted}` : "Not Submitted"}</td>
                            </tr>
                            <tr>
                                <th scope="row">Grade:</th>
                                <td>{assignment.graded? getGrade(assignment.percent) : "-"}</td>
                            </tr>
                            <tr>
                                <th scope="row">Description:</th>
                                <td className="w-75"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et lacinia odio. Pellentesque cursus libero ut dolor accumsan vehicula. Maecenas pulvinar egestas fringilla. Mauris arcu nibh, volutpat eget ligula venenatis, ornare ullamcorper nibh. Fusce in gravida sapien. Vestibulum sit amet purus sapien. Nullam aliquam ipsum ut mauris tristique tempus.</td>
                            </tr>
                        </tbody>
                    </table>
                    {assignment.graded ? 
                    <div>
                        <p className="mb-2">Submissions for {assignmentName} are closed.</p>
                        <p style={{ whiteSpace: 'pre-wrap'}}>Comments: {assignment.graded? "(none)":savedComment}</p>
                    </div>    : 
                    <div className={assignment.graded ? "d-none" : "d-flex justify-content-between"}>
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
                                style={{
                                    width: "100%",
                                    height: "150px",
                                    boxSizing: "border-box",
                                    border: "2px solid #ccc",
                                    borderRadius: "4px",
                                    backgroundColor: "#f8f8f8",
                                    resize: "none",
                                }}
                            />
                        </div>
                        <div className="mt-3 align-self-end">
                            <p className="m-2 d-inline">{submitError}</p>
                            <button className="btn btn-success d-inline" onClick={onSubmitClick}>
                                { assignment.submitted || submitted ? "Re-Submit" : "Submit"}
                            </button>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default AssignmentPage;
