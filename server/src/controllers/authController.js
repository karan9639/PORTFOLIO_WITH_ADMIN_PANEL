import jwt from 'jsonwebtoken';
import env from '../config/env.js';
import { Admin } from '../models/Admin.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { getCookieOptions } from '../utils/cookieOptions.js';

function signToken(adminId) {
  return jwt.sign({ id: adminId }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
}

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.validatedBody;
  const admin = await Admin.findOne({ email: email.toLowerCase() });
  if (!admin || !(await admin.comparePassword(password))) throw new ApiError(401, 'Invalid email or password');
  res.cookie(env.cookieName, signToken(admin._id), getCookieOptions());
  return sendSuccess(res, { admin: { id: admin._id, name: admin.name, email: admin.email } }, 'Login successful');
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie(env.cookieName, { ...getCookieOptions(), maxAge: 0 });
  return sendSuccess(res, null, 'Logged out successfully');
});

export const me = asyncHandler(async (req, res) => sendSuccess(res, { admin: req.admin }, 'Authenticated admin'));
