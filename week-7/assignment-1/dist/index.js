"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//const express = require("express");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
//const mongoose = require("mongoose");
const mongoose_1 = __importDefault(require("mongoose"));
const port = 3000;
// const authRoutes = require("./routes/auth");
// const todoRoutes = require("./routes/todo");
// const cors = require("cors");
const auth_1 = require("./routes/auth");
const todo_1 = require("./routes/todo");
const cors_1 = __importDefault(require("cors"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/auth", auth_1.router);
app.use("/todo", todo_1.router);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
mongoose_1.default.connect('mongodb+srv://111manikantav:DxQRLaK82q6FiIfA@cluster0.98dwrzo.mongodb.net/', { dbName: "courses" }).then(() => {
    console.log("db connected");
});
