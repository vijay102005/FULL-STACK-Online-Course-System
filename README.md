📚 Online Course Management System (MERN Stack)
🔧 Tech Stack
MongoDB – Database

Express.js – Backend API

React.js – Frontend

Node.js – Server-side runtime

Mongoose – MongoDB object modeling

📌 Project Description
The Online Course Management System is a full-stack web application that allows instructors to manage courses and students to enroll, learn, and interact. It includes features like course creation, task submission, real-time progress tracking, and a chat board for communication.

👨‍💻 My Role: Database Developer
Designed and implemented the MongoDB database schema

Created collections for users, courses, announcements, assignments, and materials

Managed relationships between students, instructors, and courses using Mongoose models

Integrated CRUD operations for all major entities via Express APIs

Implemented data validation and indexing for performance and consistency

✅ Key Features
🧑‍🏫 Instructor Dashboard: Course creation, announcements, materials, assignments

👨‍🎓 Student Dashboard: Course enrollment, task submissions, progress tracking

🔔 Announcements: Instructors can post and delete course-related updates

📂 Materials Upload: Upload PDF files for course content

📝 Assignments: Upload and manage assignments per course

💬 Chat Board: Real-time communication between students and instructors

🗃️ MongoDB Collections
users – stores student and instructor data

courses – contains course details, instructor reference

announcements – linked to courses

materials – PDF upload metadata, linked to courses

assignments – assignment upload details

messages – for chat system

🛠️ Setup Instructions
Clone the repository

Run npm install in both client/ and server/ directories

Set up your .env with:

ini
Copy
Edit
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secret_key
Start the backend: npm start in the server/ folder

Start the frontend: npm start in the client/ folder

Navigate to http://localhost:3000 in your browser

📌 Future Enhancements
Role-based access control

Email notifications for announcements and deadlines

File submission history

Leaderboard enhancements
