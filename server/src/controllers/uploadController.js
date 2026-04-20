import env from '../config/env.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { sendSuccess } from '../utils/apiResponse.js';

export const uploadFile = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, 'Please select a file to upload');
  return sendSuccess(res, {
    url: `${env.serverUrl}/uploads/${req.file.filename}`,
    filename: req.file.filename,
    originalName: req.file.originalname,
    mimeType: req.file.mimetype,
    size: req.file.size,
  }, 'File uploaded successfully', 201);
});
