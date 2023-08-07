

import express from 'express'
const app = express();
//const mongoose = require("mongoose");
import mongoose from 'mongoose'
const port = 3000;
//const authRoutes = require("./routes/auth");
import {authRouter} from './routes/auth'
//const todoRoutes = require("./routes/todo");
import {todoRouter} from './routes/todo'
//const cors = require("cors");
import cors from 'cors'

app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/todo", todoRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

mongoose.connect('mongodb://localhost:27017/courses', { dbName: "courses" });
