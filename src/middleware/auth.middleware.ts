import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
import {Request,Response} from "express";

dotenv.config();


const SECRET_KEY = process.env.JWT_SECRET_KEY as Secret;

interface AuthRequest extends Request {
  user?: any;
}

export function authenticateToken(req: AuthRequest, res: Response, next: any) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send("Unauthorized access");
  }
  jwt.verify(token, SECRET_KEY, (err: any, user: any) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}
