import React, { useState } from 'react';
import './Profile.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

function Profile({ instructors, onAddInstructor, onRemoveInstructor }) {
  const [open, setOpen] = useState(false);
  const [newInstructor, setNewInstructor] = useState({ instructor: '', courseName: '', phoneNumber: '' });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewInstructor({ instructor: '', courseName: '', phoneNumber: '' });
  };

  const handleAddInstructor = () => {
    onAddInstructor(newInstructor);
    handleClose();
  };

  return (
    <div className="profile-container">
      <h2>Instructor Profiles</h2>
      <Button variant="contained" color="primary" onClick={handleClickOpen} className="add-button">
        Add Instructor
      </Button>
      <div className="profiles-grid">
        {instructors.map((instructor, index) => (
          <div key={index} className="profile-details">
            <p><strong>Name:</strong> {instructor.instructor}</p>
            <p><strong>Assigned Course:</strong> {instructor.courseName}</p>
            <p><strong>Phone Number:</strong> {instructor.phoneNumber}</p>
            <Button 
              onClick={() => onRemoveInstructor(index)} 
              variant="contained" 
              color="secondary" 
              className="remove-button" 
              sx={{ backgroundColor: '#ff4d4d', '&:hover': { backgroundColor: '#ff1a1a' } }}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Instructor</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={newInstructor.instructor}
            onChange={(e) => setNewInstructor({ ...newInstructor, instructor: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Assigned Course"
            type="text"
            fullWidth
            value={newInstructor.courseName}
            onChange={(e) => setNewInstructor({ ...newInstructor, courseName: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Phone Number"
            type="text"
            fullWidth
            value={newInstructor.phoneNumber}
            onChange={(e) => setNewInstructor({ ...newInstructor, phoneNumber: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="cancel-button">
            Cancel
          </Button>
          <Button onClick={handleAddInstructor} className="add-dialog-button">
            Add
          </Button>
        </DialogActions>

      </Dialog>
    </div>
  );
}

export default Profile;
