//const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken'
//const { Response } = require('express');
import { Response } from 'express'
import { Request } from 'express';
export const SECRET = 'SECr3t';  // This should be in an environment variable in a real application

type User={
  id:string;
}
export const authenticateJwt = (req:Request, res:Response, next:any) => {
  const authHeader : string | undefined = req.headers.authorization;
  if (authHeader) {
    const token : string = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.headers.userId = user.id;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};


