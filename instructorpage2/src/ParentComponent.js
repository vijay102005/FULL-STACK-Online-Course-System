import React, { useState } from 'react';
import Dashboard from './Dashboard';

function ParentComponent() {
    const [courses, setCourses] = useState([
        { courseCode: 'CS101', courseName: 'Intro to Computer Science', description: 'Basic course on computer science.', instructor: 'John Doe' },
        // Add more courses as needed
    ]);

    // Define the onDeleteCourse function
    const handleDeleteCourse = (index) => {
        setCourses(courses.filter((_, i) => i !== index));
    };

    return (
        <div>
            <Dashboard courses={courses} onDeleteCourse={handleDeleteCourse} />
        </div>
    );
}

export default ParentComponent;
