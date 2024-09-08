// src/CreateCourse.js
import React, { useState } from 'react';
import './CreateCourse.css';

function CreateCourse({ onAddCourse }) {
  const [courseCode, setCourseCode] = useState('');
  const [courseName, setCourseName] = useState('');
  const [description, setDescription] = useState('');
  const [instructor, setInstructor] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCourse = { courseCode, courseName, description, instructor };
    onAddCourse(newCourse);
    setShowSuccess(true);

    // Clear the form fields
    setCourseCode('');
    setCourseName('');
    setDescription('');
    setInstructor('');

    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="create-course-container">
      <h2>Create Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="courseCode">Course Code</label>
          <input
            id="courseCode"
            type="text"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="courseName">Course Name</label>
          <input
            id="courseName"
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="instructor">Instructor</label>
          <input
            id="instructor"
            type="text"
            value={instructor}
            onChange={(e) => setInstructor(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="create-course-btn">Create Course</button>
      </form>
      {showSuccess && <div className="success-message">Course created successfully!</div>}
    </div>
  );
}

export default CreateCourse;
