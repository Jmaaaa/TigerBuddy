import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { nameData } from "../data";

const AssignmentPage = () => {
    const {name:code, assignmentName } = useParams();
    const name = nameData[code];

    const [image, setImage] = useState("");
    const inputFile = useRef(null);

    const handleFileUpload = e => {
        const { files } = e.target;
        if (files && files.length) {
          const filename = files[0].name;
    
          var parts = filename.split(".");
          const fileType = parts[parts.length - 1];
          console.log("fileType", fileType); //ex: zip, rar, jpg, svg etc.
    
          setImage(files[0]);
        }
      };
    
    const onButtonClick = () => {
        inputFile.current.click();
    };

    console.log("imageimage", image);
    return (
        <div>
            <h1>{code} / Assignments / {assignmentName}</h1>
            <table>
                <tbody>
                    <tr>
                        <td>Due Date:</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>Submission Status:</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>Grade:</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td>-</td>
                    </tr>
                </tbody>
            </table>
            <div>
                <input
                    style={{ display: "none" }}
                    ref={inputFile}
                    onChange={handleFileUpload}
                    type="file"
                />
                <button onClick={onButtonClick}>Upload File</button>
                <p>{image? "yes": "no"}</p>
            </div>
            <div>Comment</div>
            <button>Submit</button>
        </div>
    );
};

export default AssignmentPage;