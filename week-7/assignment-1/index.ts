

//const express = require("express");
import express from "express"
const app = express();
//const mongoose = require("mongoose");
import mongoose from "mongoose"
const port = 3000;
// const authRoutes = require("./routes/auth");
// const todoRoutes = require("./routes/todo");
// const cors = require("cors");
import {router as authRoutes} from "./routes/auth"
import {router as todoRoutes} from "./routes/todo"
import cors from "cors"

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/todo", todoRoutes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

mongoose.connect('mongodb+srv://111manikantav:DxQRLaK82q6FiIfA@cluster0.98dwrzo.mongodb.net/', { dbName: "courses" }).then(()=>{
    console.log("db connected")
});
