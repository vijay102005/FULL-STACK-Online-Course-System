// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const courseRoutes = require('./routes/courseRoutes');
const instructorRoutes = require('./routes/instructorRoutes');

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON

// Connect to courseDB
const courseDBConnection = mongoose.createConnection('mongodb://localhost:27017/courseDB', {
    // Removed useNewUrlParser and useUnifiedTopology
});

courseDBConnection.on('connected', () => {
    console.log('Connected to courseDB');
});

courseDBConnection.on('error', (err) => {
    console.error('Error connecting to courseDB:', err);
});

// Connect to instructorDB
const instructorDBConnection = mongoose.createConnection('mongodb://localhost:27017/instructorDB', {
    // Removed useNewUrlParser and useUnifiedTopology
});

instructorDBConnection.on('connected', () => {
    console.log('Connected to instructorDB');
});

instructorDBConnection.on('error', (err) => {
    console.error('Error connecting to instructorDB:', err);
});

// Import schemas
const courseSchema = require('./models/courseModel');
const instructorSchema = require('./models/instructorModel');

// Create models on respective connections
const Course = courseDBConnection.model('Course', courseSchema, 'courses'); // Explicitly set collection name
const Instructor = instructorDBConnection.model('Instructor', instructorSchema, 'instructors');

// Use routes with respective models
app.use('/api/courses', courseRoutes(Course));
app.use('/api/instructors', instructorRoutes(Instructor));

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
