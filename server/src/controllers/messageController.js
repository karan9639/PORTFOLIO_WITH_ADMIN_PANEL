import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { Message } from '../models/Message.js';

export const listMessages = asyncHandler(async (req, res) => sendSuccess(res, await Message.find().sort('-createdAt'), 'Messages fetched'));

export const updateMessageStatus = asyncHandler(async (req, res) => {
  const message = await Message.findByIdAndUpdate(req.params.id, { status: req.validatedBody.status }, { new: true, runValidators: true });
  if (!message) throw new ApiError(404, 'Message not found');
  return sendSuccess(res, message, 'Message updated');
});

export const deleteMessage = asyncHandler(async (req, res) => {
  const message = await Message.findByIdAndDelete(req.params.id);
  if (!message) throw new ApiError(404, 'Message not found');
  return sendSuccess(res, null, 'Message deleted');
});
