import jwt from 'jsonwebtoken';
import env from '../config/env.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { Admin } from '../models/Admin.js';

export const requireAuth = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.[env.cookieName];
  if (!token) throw new ApiError(401, 'Authentication required');
  const decoded = jwt.verify(token, env.jwtSecret);
  const admin = await Admin.findById(decoded.id).select('-password');
  if (!admin) throw new ApiError(401, 'Account not found');
  req.admin = admin;
  next();
});
