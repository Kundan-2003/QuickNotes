import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import DbCon from './config/db.js';
import AuthRoutes from './routes/Auth.js';
import NotesRoutes from './routes/Notes.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const PORT = process.env.PORT;
const app = express();

// Connect to the database
DbCon();

// CORS configuration - update to allow the deployed frontend URL
app.use(cors({
    credentials: true,
    origin: [
        'http://localhost:5173',  // For local development
        'https://quicknotes-1-xzvk.onrender.com'  // Deployed frontend URL
    ]
}));

app.use(cookieParser());
app.use(express.json());
app.use('/auth', AuthRoutes);
app.use('/notes', NotesRoutes);

app.get('/', (req, res) => {
    res.send('Hello from backend');
});

// Start the server
app.listen(PORT, () => {
    console.log(`App is running on Port ${PORT}`);
});
