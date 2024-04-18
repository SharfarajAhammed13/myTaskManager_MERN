import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';
/**
 * Middleware function to verify the access token in the request.
 * If the token is missing or invalid, it will return an error response.
 * If the token is valid, it will set the user object in the request and call the next middleware.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(errorHandler(401, 'Unauthorized'));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, 'Unauthorized'));
    }
    req.user = user;
    next();
  });
};
