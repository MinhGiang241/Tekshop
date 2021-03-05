import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("Not authenticated.");
    (error as any).statusCode = 401;
    throw error;
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, (process.env as any).JWT_SIGNATURE);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error("Not authenticated.");
    (error as any).statusCode = 401;
    throw error;
  }

  (req as any).userId = decodedToken.id;
  next();
};

export default isAuth;
