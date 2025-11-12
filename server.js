import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/authRoutes.js';
import availabilityRoutes from './routes/availabilityRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
connectDB();

const app = express();


app.use(cors({
  origin: process.env.CLIENT_ORIGIN || "http://localhost:3000", 
  credentials: true, 
}));

app.use(express.json());
app.use(cookieParser()); 

app.use('/api/auth', authRoutes);
app.use('/api/availability', availabilityRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/user', userRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
