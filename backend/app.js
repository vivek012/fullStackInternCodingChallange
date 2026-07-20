import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors'
import authRoutes from './routes/authRoutes.js';
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from './routes/userRoutes.js';
import ownerRoutes from './routes/ownerRoutes.js';







dotenv.config();

const app = express()
app.use(cors())
app.use(express.json())


// app.use('/', (req, res) => {
//     res.send("hellp wOLRD")
// })

app.use('/api/auth', authRoutes)
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/owner", ownerRoutes);



export default app;