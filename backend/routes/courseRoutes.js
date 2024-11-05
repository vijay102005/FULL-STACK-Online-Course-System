// routes/courseRoutes.js
const express = require('express');

module.exports = (Course) => {
    const router = express.Router();

    // Add a new course
    router.post('/', async (req, res) => {
        const { courseCode, courseName, description, instructor } = req.body;

        const newCourse = new Course({ courseCode, courseName, description, instructor });

        try {
            const savedCourse = await newCourse.save();
            res.status(201).json(savedCourse);
        } catch (error) {
            console.error('Error saving course:', error);
            res.status(500).json({ message: error.message });
        }
    });

    return router;
};
