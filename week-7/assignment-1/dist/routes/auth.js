"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// const jwt = require("jsonwebtoken");
const express_1 = __importDefault(require("express"));
// const express = require('express');
const index_1 = require("../middleware/index");
// const { authenticateJwt, SECRET } = require("../middleware/");
const index_2 = require("../db/index");
// const { User } = require("../db");
exports.router = express_1.default.Router();
exports.router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield index_2.User.findOne({ username });
    if (user) {
        res.status(403).json({ message: 'User already exists' });
    }
    else {
        const newUser = new index_2.User({ username, password });
        yield newUser.save();
        const token = jsonwebtoken_1.default.sign({ id: newUser._id }, index_1.SECRET, { expiresIn: '1h' });
        res.json({ message: 'User created successfully', token });
    }
}));
exports.router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield index_2.User.findOne({ username, password });
    if (user) {
        const token = jsonwebtoken_1.default.sign({ id: user._id }, index_1.SECRET, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token });
    }
    else {
        res.status(403).json({ message: 'Invalid username or password' });
    }
}));
exports.router.get('/me', index_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield index_2.User.findOne({ _id: req.headers.userId });
    if (user) {
        res.json({ username: user.username });
    }
    else {
        res.status(403).json({ message: 'User not logged in' });
    }
}));
// module.exports = router
