// src/Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard({ courses, onDeleteCourse }) {
    const navigate = useNavigate();

    const handleOpenCourse = (index) => {
        navigate(`/course/${index}`);
    };

    return (
        <div className="dashboard-container">
            <h2>Courses</h2>
            {courses.length === 0 ? (
                <p>No courses available</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Course Code</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Instructor</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course, index) => (
                            <tr key={index}>
                                <td>{course.courseCode}</td>
                                <td>{course.courseName}</td>
                                <td>{course.description}</td>
                                <td>{course.instructor}</td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="open-btn" onClick={() => handleOpenCourse(index)}>
                                            Open
                                        </button>
                                        <button 
                                            className="delete-btn"
                                            onClick={() => onDeleteCourse(index)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Dashboard;
