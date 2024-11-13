import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { nameData, assignmentData } from "../../components/data"; 

const AssignmentPage = () => {
    const { name: code, assignmentName } = useParams();
    const name = nameData[code];
    const assignment = assignmentData[code]?.find((item) => item.assignment === assignmentName) || {};

    const [image, setImage] = useState("");
    const inputFile = useRef(null);

    const handleFileUpload = (e) => {
        const { files } = e.target;
        if (files && files.length) {
            setImage(files[0]);
        }
    };

    const onUploadClick = () => {
        inputFile.current.click();
    };

    const onSubmitClick = () => {
        // Submission logic here
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
                                <td>{assignment.dateDue || "N/A"}</td>
                            </tr>
                            <tr>
                                <th scope="row">Submission Status:</th>
                                <td>{assignment.submitted ? "Submitted" : "Not Submitted"}</td>
                            </tr>
                            <tr>
                                <th scope="row">Grade:</th>
                                <td>-</td>
                            </tr>
                            <tr>
                                <th scope="row">Description:</th>
                                <td>-</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="mt-3">
                        <input
                            style={{ display: "none" }}
                            ref={inputFile}
                            onChange={handleFileUpload}
                            type="file"
                        />
                        <button className="btn btn-primary" onClick={onUploadClick}>
                            Upload File
                        </button>
                        {image && <p className="mt-2">&quot;{image.name}&quot; uploaded</p>}
                    </div>
                    <div className="mt-3">
                        <button className="btn btn-success" onClick={onSubmitClick}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssignmentPage;
