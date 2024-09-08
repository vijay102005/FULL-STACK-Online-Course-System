// src/Progress.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './Progress.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const students = [
    { name: 'Emma Watson', courseName: 'The Ultimate Python Course 2024', courseCompletion: 85, assignmentsCompleted: 8, averagePercentage: 88 },
    { name: 'Liam Johnson', courseName: 'Mastering Django: Basics To Advance', courseCompletion: 75, assignmentsCompleted: 7, averagePercentage: 80 },
    { name: 'Olivia Brown', courseName: 'Learn Complete React 2024', courseCompletion: 90, assignmentsCompleted: 9, averagePercentage: 92 },
    { name: 'Noah Davis', courseName: 'NodeJS: Modern Javascript, Full-Stack', courseCompletion: 60, assignmentsCompleted: 6, averagePercentage: 65 },
    { name: 'Sophia Wilson', courseName: 'AWS: Solution Architect Preparation Guide', courseCompletion: 95, assignmentsCompleted: 10, averagePercentage: 96 },
];

function Progress() {
    return (
        <div className="progress-container">
            <h2>Student Progress</h2>
            <div className="progress-list">
                {students.map((student, index) => {
                    const data = {
                        labels: ['Completed', 'Not Completed'],
                        datasets: [
                            {
                                label: `${student.name} Course Completion`,
                                data: [student.courseCompletion, 100 - student.courseCompletion],
                                backgroundColor: ['#36a2eb', '#ff6384'],
                                hoverOffset: 4,
                                borderColor: '#fff',
                                borderWidth: 2,
                            },
                        ],
                    };

                    const options = {
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function (context) {
                                        const label = context.label || '';
                                        const value = context.raw || 0;
                                        return `${label}: ${value}%`;
                                    },
                                },
                            },
                        },
                    };

                    return (
                        <div key={index} className="progress-item">
                            <div className="progress-header">
                                <h3>{student.name}</h3>
                                <p className="course-name">{student.courseName}</p>
                            </div>
                            <div className="chart-container">
                                <Pie data={data} options={options} />
                            </div>
                            <div className="progress-details">
                                <p><strong>Assignments Completed:</strong> {student.assignmentsCompleted}/10</p>
                                <p><strong>Average Percentage:</strong> {student.averagePercentage}%</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Progress;
