import express from 'express';
import dotenv from "dotenv"
import connectDB from './db/index.js';
import cors from "cors"
import authRotues from "./routes/authRoutes.js"
const PORT = process.env.PORT || 8000
const app = express();
dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());

app.use('api/auth', authRotues);

app.listen(PORT, (req, res) => 
    console.log(`Server running on port http://localhost:${PORT}`)
)