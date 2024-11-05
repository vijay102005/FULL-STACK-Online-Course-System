// models/instructorModel.js
const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
    instructor: { type: String, required: true },
    courseName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
});

module.exports = instructorSchema;
