// models/courseModel.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseCode: {
        type: String,
        required: true
    },
    courseName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    instructor: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

module.exports = courseSchema;
