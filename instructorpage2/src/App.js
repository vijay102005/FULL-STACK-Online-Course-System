import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import CreateCourse from './CreateCourse';
import Profile from './Profile';
import CourseDetails from './CourseDetails';
import Progress from './Progress'; // Import the Progress component
import './App.css';

function App() {
    const [courses, setCourses] = useState([
        { courseCode: 'P101', courseName: 'The Ultimate Python Course 2024', description: 'Comprehensive Python course', instructor: 'John Doe', phoneNumber: '123-456-7890' },
        { courseCode: 'D202', courseName: 'Mastering Django: Basics To Advance', description: 'Learn Django from scratch to advanced concepts', instructor: 'Jane Smith', phoneNumber: '234-567-8901' },
        { courseCode: 'R303', courseName: 'Learn Complete React 2024', description: 'Complete guide to mastering React in 2024', instructor: 'Alice Johnson', phoneNumber: '345-678-9012' },
        { courseCode: 'N404', courseName: 'NodeJS: Modern Javascript, Full-Stack', description: 'Full-stack JavaScript with NodeJS', instructor: 'Bob Brown', phoneNumber: '456-789-0123' },
        { courseCode: 'P505', courseName: 'Best PHP Learning Bundle with Rest APIs', description: 'Comprehensive PHP course with REST APIs', instructor: 'Charlie Davis', phoneNumber: '567-890-1234' },
        { courseCode: 'A606', courseName: 'AWS: Solution Architect Preparation Guide', description: 'Prepare for AWS Solution Architect exam', instructor: 'Eve White', phoneNumber: '678-901-2345' },
    ]);

    const handleAddCourse = (newCourse) => {
        setCourses([...courses, newCourse]);
    };

    const handleDeleteCourse = (index) => {
        setCourses(courses.filter((_, i) => i !== index));
    };

    const handleAddInstructor = (newInstructor) => {
        setCourses([...courses, newInstructor]);
    };

    const handleRemoveInstructor = (index) => {
        setCourses(courses.filter((_, i) => i !== index));
    };

    return (
        <div className="App">
            <Router>
                <Sidebar />
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<Dashboard courses={courses} onDeleteCourse={handleDeleteCourse} />} />
                        <Route path="/newcourse" element={<CreateCourse onAddCourse={handleAddCourse} />} />
                        <Route path="/profile" element={<Profile instructors={courses} onAddInstructor={handleAddInstructor} onRemoveInstructor={handleRemoveInstructor} />} />
                        <Route path="/course/:courseId" element={<CourseDetails courses={courses} />} />
                        <Route path="/progress" element={<Progress />} /> {/* Route for progress with pie charts */}
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
