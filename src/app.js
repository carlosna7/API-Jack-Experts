import express from 'express';
import dotenv from 'dotenv';
import router from './router.js';
import cors from 'cors';

dotenv.config();

const app = express();

// Middleware
app.use(cors())
app.use(express.json());
app.use(router);

export default app;
