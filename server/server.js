import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import { connectDb } from './config/db.js';
import { authRoutes } from './routes/routes.js';
dotenv.config()

const app = express();
app.use(express.json());
app.use(cors())
await connectDb();


app.use("/api/v1",authRoutes);

const PORT = process.env.PORT || 8080

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})