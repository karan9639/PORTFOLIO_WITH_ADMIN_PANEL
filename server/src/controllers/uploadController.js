import fs from 'fs/promises';
import path from 'path';
import cloudinary from '../config/cloudinary.js';
import env, { isCloudinaryConfigured } from '../config/env.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { sendSuccess } from '../utils/apiResponse.js';

function sanitizeFilename(filename = 'asset') {
  return filename.replace(/[^a-zA-Z0-9._-]/g, '-').replace(/-+/g, '-').toLowerCase();
}

function uploadToCloudinary(file, folder) {
  return new Promise((resolve, reject) => {
    const resourceType = file.mimetype === 'application/pdf' ? 'raw' : 'image';
    const uploader = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
        public_id: `${Date.now()}-${sanitizeFilename(file.originalname).replace(/\.[^.]+$/, '')}`,
        use_filename: true,
        unique_filename: false,
        overwrite: false,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    uploader.end(file.buffer);
  });
}

async function uploadLocally(file) {
  const uploadsDir = path.resolve(process.cwd(), "uploads");
  await fs.mkdir(uploadsDir, { recursive: true });
  const filename = `${Date.now()}-${sanitizeFilename(file.originalname)}`;
  const filePath = path.join(uploadsDir, filename);
  await fs.writeFile(filePath, file.buffer);
  return {
    secure_url: `${env.serverUrl}/uploads/${filename}`,
    public_id: filename,
    resource_type: file.mimetype === 'application/pdf' ? 'raw' : 'image',
    bytes: file.size,
    original_filename: file.originalname,
    format: file.mimetype,
  };
}

export const uploadFile = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, 'Please select a file to upload');

  const kind = req.query.kind === 'resume' || req.file.mimetype === 'application/pdf' ? 'resume' : 'image';
  const folder = `${env.cloudinaryFolder}/${kind}`;

  const uploaded = isCloudinaryConfigured
    ? await uploadToCloudinary(req.file, folder)
    : await uploadLocally(req.file);

  return sendSuccess(res, {
    url: uploaded.secure_url,
    filename: uploaded.public_id,
    originalName: req.file.originalname,
    mimeType: req.file.mimetype,
    size: req.file.size,
    provider: isCloudinaryConfigured ? 'cloudinary' : 'local',
    resourceType: uploaded.resource_type,
  }, isCloudinaryConfigured ? 'File uploaded to Cloudinary successfully' : 'File uploaded locally successfully', 201);
});
