import React from "react";
import { useOutletContext } from "react-router-dom";

const CourseModulePage = () => {
    const {modules} = useOutletContext();

    return (
        <div>
            {modules.length > 0 ? (
                modules.map(({index, name, description, materials}) => (
                    <div key={index} className="mb-4">
                        <div className="card">
                            <div className="card-header">
                                <h2 className="mb-1">{index}. {name}</h2>
                                <small className="text-muted">{description}</small>
                            </div>
                            <div className="card-body">
                                <h5>Materials:</h5>
                                {materials.length > 0 ? (
                                    <ul className="list-group">
                                        {materials.map(({matName,type,viewed}, i) => (
                                            <li key={i} className="list-group-item d-flex align-items-center justify-content-between">
                                                <div className="h6 m-0">
                                                    {matName} 
                                                    <span className="text-muted fw-normal"> - {type.charAt(0).toUpperCase() + type.slice(1)}</span>
                                                </div>
                                                <div className={`${viewed? "text-success":"text-secondary"}`}>{viewed? "viewed": "not viewed"}</div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No materials available for this module.</p>
                                )}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No modules available for this course.</p>
            )}
        </div>
    );
};

export default CourseModulePage;
