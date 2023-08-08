
//const jwt = require('jsonwebtoken');
import jwt from "jsonwebtoken"
//const { Response } = require('express');
import {Response,Request} from 'express'

export const SECRET = 'SECr3t';  // This should be in an environment variable in a real application

export const authenticateJwt = (req:Request, res:Response, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.userId = user.id;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// module.exports = {
//     authenticateJwt,
//     SECRET
// }
