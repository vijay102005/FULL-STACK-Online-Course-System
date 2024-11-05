// routes/instructorRoutes.js
const express = require('express');

module.exports = (Instructor) => {
    const router = express.Router();

    // Add a new instructor
    router.post('/', async (req, res) => {
        const { instructor, courseName, phoneNumber } = req.body;

        const newInstructor = new Instructor({ instructor, courseName, phoneNumber });

        try {
            const savedInstructor = await newInstructor.save();
            res.status(201).json(savedInstructor);
        } catch (error) {
            console.error('Error saving instructor:', error);
            res.status(500).json({ message: error.message });
        }
    });

    return router;
};
