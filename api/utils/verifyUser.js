import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";
export const verifyCookiesToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(errorHandler(401, "Unauthorized"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, "Unauthorized"));
    }
    req.user = user;
    next();
  });
};
const JWT_SECRET = process.env.JWT_SECRET || "this-jwt-secret";
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return next(errorHandler(401, "Unauthorized: No token provided"));
  }
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, "Unauthorized: Invalid token"));
    }
    req.user = user;
    next();
  });
};
