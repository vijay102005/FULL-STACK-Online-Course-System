import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './CourseDetails.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { v4 as uuidv4 } from 'uuid';

// Utility function to generate random student names
const generateRandomName = () => {
    const firstNames = ['Alex', 'Jordan', 'Taylor', 'Sam', 'Morgan', 'Chris', 'Casey'];
    const lastNames = ['Smith', 'Johnson', 'Brown', 'Taylor', 'Anderson', 'Thomas'];
    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${randomFirstName} ${randomLastName}`;
};

function CourseDetails({ courses }) {
    const { courseId } = useParams();
    const course = courses[courseId];
    const [selectedTab, setSelectedTab] = useState('announcement');
    const [dialogState, setDialogState] = useState({
        announcement: false,
        material: false,
        assignment: false,
        feedback: false
    });
    const [announcements, setAnnouncements] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [newAnnouncement, setNewAnnouncement] = useState({ title: '', description: '' });
    const [newMaterial, setNewMaterial] = useState({ title: '', description: '', file: null });
    const [newAssignment, setNewAssignment] = useState({ title: '', description: '', dueDate: '', link: '' });
    const [feedbacks, setFeedbacks] = useState([]);
    const [newFeedback, setNewFeedback] = useState('');
    const [messages, setMessages] = useState([
        { id: uuidv4(), text: 'What time is the next class?', sender: generateRandomName(), timestamp: '10:30 AM' },
        { id: uuidv4(), text: 'Can someone share the notes from last lecture?', sender: generateRandomName(), timestamp: '10:32 AM' },
    ]);
    const [newMessage, setNewMessage] = useState('');

    if (!course) {
        return <div>Course not found</div>;
    }

    const handleClickTab = (tab) => {
        setSelectedTab(tab);
    };

    const handleOpenDialog = (dialog) => {
        setDialogState({ ...dialogState, [dialog]: true });
    };

    const handleCloseDialog = (dialog) => {
        setDialogState({ ...dialogState, [dialog]: false });
        // Reset state for form fields if needed
        if (dialog === 'announcement') {
            setNewAnnouncement({ title: '', description: '' });
        } else if (dialog === 'material') {
            setNewMaterial({ title: '', description: '', file: null });
        } else if (dialog === 'assignment') {
            setNewAssignment({ title: '', description: '', dueDate: '', link: '' });
        } else if (dialog === 'feedback') {
            setNewFeedback('');
        }
    };

    const handleAddAnnouncement = () => {
        if (newAnnouncement.title && newAnnouncement.description) {
            setAnnouncements([...announcements, { ...newAnnouncement, id: uuidv4() }]);
            handleCloseDialog('announcement');
        } else {
            alert('Please fill in both title and description.');
        }
    };

    const handleAddMaterial = () => {
        if (newMaterial.file) {
            const material = {
                ...newMaterial,
                id: uuidv4(),
                url: URL.createObjectURL(newMaterial.file)
            };
            setMaterials([...materials, material]);
            handleCloseDialog('material');
        } else {
            alert('Please upload a file.');
        }
    };

    const handleAddAssignment = () => {
        if (newAssignment.title && newAssignment.description && newAssignment.dueDate && newAssignment.link) {
            const assignment = {
                ...newAssignment,
                id: uuidv4(),
            };
            setAssignments([...assignments, assignment]);
            handleCloseDialog('assignment');
        } else {
            alert('Please fill in all fields.');
        }
    };

    const handleAddFeedback = () => {
        if (newFeedback.trim() !== '') {
            setFeedbacks([...feedbacks, { id: uuidv4(), text: newFeedback, sender: generateRandomName(), timestamp: new Date().toLocaleTimeString() }]);
            handleCloseDialog('feedback');
        } else {
            alert('Please enter feedback.');
        }
    };

    const handleRemoveAnnouncement = (id) => {
        setAnnouncements(announcements.filter(announcement => announcement.id !== id));
    };

    const handleRemoveMaterial = (id) => {
        setMaterials(materials.filter(material => material.id !== id));
    };

    const handleRemoveAssignment = (id) => {
        setAssignments(assignments.filter(assignment => assignment.id !== id));
    };

    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            const message = {
                id: uuidv4(),
                text: newMessage,
                sender: 'You',
                timestamp: new Date().toLocaleTimeString(),
            };
            setMessages([...messages, message]);
            setNewMessage('');
        }
    };

    return (
        <div className="course-details-container">
            <h2>{course.courseName}</h2>
            <p><strong>Course Code:</strong> {course.courseCode}</p>
            <p><strong>Description:</strong> {course.description}</p>
            <p><strong>Instructor:</strong> {course.instructor}</p>
            <p><strong>Phone Number:</strong> {course.phoneNumber}</p>
            <div className="tabs">
                <ul>
                    <li 
                        className={selectedTab === 'announcement' ? 'active' : ''} 
                        onClick={() => handleClickTab('announcement')}
                    >
                        Announcement
                    </li>
                    <li 
                        className={selectedTab === 'material' ? 'active' : ''} 
                        onClick={() => handleClickTab('material')}
                    >
                        Material
                    </li>
                    <li 
                        className={selectedTab === 'assignment' ? 'active' : ''} 
                        onClick={() => handleClickTab('assignment')}
                    >
                        Assignment
                    </li>
                    <li 
                        className={selectedTab === 'chat' ? 'active' : ''} 
                        onClick={() => handleClickTab('chat')}
                    >
                        Chat
                    </li>
                    <li 
                        className={selectedTab === 'feedback' ? 'active' : ''} 
                        onClick={() => handleClickTab('feedback')}
                    >
                        Feedback
                    </li>
                    <li>Students</li>
                </ul>
            </div>
            {selectedTab === 'announcement' && (
                <div className="announcement">
                    <Button variant="contained" color="primary" onClick={() => handleOpenDialog('announcement')} className="add-announcement-btn">
                        Add Announcement
                    </Button>
                    {announcements.length === 0 && <p>No announcements available.</p>}
                    {announcements.map((announcement) => (
                        <div key={announcement.id} className="announcement-item">
                            <h3>{announcement.title}</h3>
                            <p>{announcement.description}</p>
                            <Button 
                                variant="contained" 
                                color="secondary" 
                                onClick={() => handleRemoveAnnouncement(announcement.id)}
                                className="remove-btn"
                            >
                                Remove
                            </Button>
                        </div>
                    ))}
                </div>
            )}
            {selectedTab === 'material' && (
                <div className="materials-container">
                    <Button variant="contained" color="primary" onClick={() => handleOpenDialog('material')} className="add-material-btn">
                        Add Material
                    </Button>
                    {materials.length === 0 && <p>No materials available.</p>}
                    {materials.map((material) => (
                        <div key={material.id} className="materials-item">
                            <h3>{material.title}</h3>
                            <p>{material.description}</p>
                            <a href={material.url} target="_blank" rel="noopener noreferrer">View File</a>
                            <Button 
                                variant="contained" 
                                color="secondary" 
                                onClick={() => handleRemoveMaterial(material.id)}
                                className="remove-btn"
                            >
                                Remove
                            </Button>
                        </div>
                    ))}
                </div>
            )}
            {selectedTab === 'assignment' && (
                <div className="assignments-container">
                    <Button variant="contained" color="primary" onClick={() => handleOpenDialog('assignment')} className="add-assignment-btn">
                        Add Assignment
                    </Button>
                    {assignments.length === 0 && <p>No assignments available.</p>}
                    <table className="assignments-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Due Date</th>
                                <th>Link</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignments.map((assignment) => (
                                <tr key={assignment.id} className="assignments-item">
                                    <td>{assignment.title}</td>
                                    <td>{assignment.description}</td>
                                    <td>{assignment.dueDate}</td>
                                    <td><a href={assignment.link} target="_blank" rel="noopener noreferrer">View Assignment</a></td>
                                    <td>
                                        <Button 
                                            variant="contained" 
                                            color="secondary" 
                                            onClick={() => handleRemoveAssignment(assignment.id)}
                                            className="remove-btn"
                                        >
                                            Remove
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {selectedTab === 'chat' && (
                <div className="chat-container">
                    <div className="messages-list">
                        {messages.map((message) => (
                            <div key={message.id} className="message-item">
                                <p><strong>{message.sender}</strong> <span>{message.timestamp}</span></p>
                                <p>{message.text}</p>
                            </div>
                        ))}
                    </div>
                    <div className="message-input">
                        <TextField
                            label="Type your message"
                            variant="outlined"
                            fullWidth
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={handleSendMessage}
                            className="send-message-btn"
                        >
                            Send
                        </Button>
                    </div>
                </div>
            )}
            {selectedTab === 'feedback' && (
                <div className="feedback-container">
                    <Button variant="contained" color="primary" onClick={() => handleOpenDialog('feedback')} className="add-feedback-btn">
                        Add Feedback
                    </Button>
                    {feedbacks.length === 0 && <p>No feedbacks available.</p>}
                    {feedbacks.map((feedback) => (
                        <div key={feedback.id} className="feedback-item">
                            <p><strong>{feedback.sender}</strong> <span>{feedback.timestamp}</span></p>
                            <p>{feedback.text}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Dialogs */}
            {/* Add Announcement Dialog */}
            <Dialog open={dialogState.announcement} onClose={() => handleCloseDialog('announcement')}>
                <DialogTitle>Add Announcement</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        fullWidth
                        variant="outlined"
                        value={newAnnouncement.title}
                        onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        value={newAnnouncement.description}
                        onChange={(e) => setNewAnnouncement({ ...newAnnouncement, description: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCloseDialog('announcement')} className="cancel-button">
                        Cancel
                    </Button>
                    <Button onClick={handleAddAnnouncement} className="add-dialog-button">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Add Material Dialog */}
            <Dialog open={dialogState.material} onClose={() => handleCloseDialog('material')}>
                <DialogTitle>Add Material</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        fullWidth
                        variant="outlined"
                        value={newMaterial.title}
                        onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        value={newMaterial.description}
                        onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
                    />
                    <input
                        type="file"
                        onChange={(e) => setNewMaterial({ ...newMaterial, file: e.target.files[0] })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCloseDialog('material')} className="cancel-button">
                        Cancel
                    </Button>
                    <Button onClick={handleAddMaterial} className="add-dialog-button">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Add Assignment Dialog */}
            <Dialog open={dialogState.assignment} onClose={() => handleCloseDialog('assignment')}>
                <DialogTitle>Add Assignment</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        fullWidth
                        variant="outlined"
                        value={newAssignment.title}
                        onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        value={newAssignment.description}
                        onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Due Date"
                        type="date"
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        value={newAssignment.dueDate}
                        onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Link"
                        fullWidth
                        variant="outlined"
                        value={newAssignment.link}
                        onChange={(e) => setNewAssignment({ ...newAssignment, link: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCloseDialog('assignment')} className="cancel-button">
                        Cancel
                    </Button>
                    <Button onClick={handleAddAssignment} className="add-dialog-button">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Add Feedback Dialog */}
            <Dialog open={dialogState.feedback} onClose={() => handleCloseDialog('feedback')}>
                <DialogTitle>Add Feedback</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Feedback"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        value={newFeedback}
                        onChange={(e) => setNewFeedback(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCloseDialog('feedback')} className="cancel-button">
                        Cancel
                    </Button>
                    <Button onClick={handleAddFeedback} className="add-dialog-button">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CourseDetails;
