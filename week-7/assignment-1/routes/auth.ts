// const jwt = require("jsonwebtoken");
import jwt from 'jsonwebtoken'
// const express = require('express');
import express from 'express'
// const { authenticateJwt, SECRET } = require("../middleware/");
import { authenticateJwt, SECRET } from "../middleware/"
// const { User } = require("../db");
import { User } from "../db"
export  const authRouter = express.Router();

authRouter.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      res.status(403).json({ message: 'User already exists' });
    } else {
      const newUser = new User({ username, password });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'User created successfully', token });
    }
  });
  
  authRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
      const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  });

  authRouter.get('/me', authenticateJwt, async (req : any, res) => {
      const user = await User.findOne({ _id: req.userId });
      if (user) {
        res.json({ username: user.username });
      } else {
        res.status(403).json({ message: 'User not logged in' });
      }
    });

 
