
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import commentRoutes from './routes/comment.route.js'
import taskRoutes from './routes/task.route.js'



dotenv.config();

mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log('Connect to MongoDB');
    })
    .catch((err) =>{
        console.log(err);
    });

const app = express();
app.use(express.json());
app.use(cookieParser());


app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/task', taskRoutes);
app.use('/api/comment', commentRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

