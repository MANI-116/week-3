import jwt from 'jsonwebtoken'
// const jwt = require("jsonwebtoken");
import express from 'express'
// const express = require('express');
import {authenticateJwt, SECRET} from "../middleware/index"
// const { authenticateJwt, SECRET } = require("../middleware/");
import {User} from "../db/index"
// const { User } = require("../db");
export const router = express.Router();
import { Request,Response } from 'express';

type Usertype = {
  username:string,
  password:string
}


  router.post('/signup', async (req:Request, res:Response) => {
    const client:Usertype = req.body;
    const user = await User.findOne({ username : client.username});
    if (user) {
      res.status(403).json({ message: 'User already exists' });
    } else {
      const newUser = new User(client);
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'User created successfully', token });
    }
  });
  

  router.post('/login', async (req:Request, res:Response) => {
    const client:Usertype = req.body;
    const user = await User.findOne(client);
    if (user) {
      const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  });

    router.get('/me', authenticateJwt, async (req:Request, res:Response) => {
      const user = await User.findOne({ _id: req.headers.userId });
      if (user) {
        res.json({ username: user.username });
      } else {
        res.status(403).json({ message: 'User not logged in' });
      }
    });

  // module.exports = router
