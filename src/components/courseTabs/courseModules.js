import React from "react";
import { courseModules } from "../data"; 
import { useParams } from "react-router-dom";

const CourseModulePage = () => {
    const { code: courseName } = useParams();
    const modules = courseModules[courseName] || [];

    return (
        <div>
            {modules.length > 0 ? (
                modules.map((module, index) => (
                    <div key={module.moduleId} className="mb-4">
                        <div className="card">
                            <div className="card-header">
                                <h2 className="mb-1">{module.title}</h2>
                                <small className="text-muted">{module.description}</small>
                            </div>
                            <div className="card-body">
                                <h5>Materials:</h5>
                                {module.content.length > 0 ? (
                                    <ul className="list-group">
                                        {module.content.map((item, itemIndex) => (
                                            <li key={itemIndex} className="list-group-item">
                                                <strong>{item.title}</strong> - {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No materials available for this module.</p>
                                )}
                                <p className={`mt-3 ${module.completed ? 'text-success' : 'text-danger'}`}>
                                    Status: {module.completed ? "Completed" : "Not Completed"}
                                </p>
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
