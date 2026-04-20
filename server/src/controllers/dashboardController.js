import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { Message } from '../models/Message.js';
import { Project } from '../models/Project.js';
import { Skill } from '../models/Skill.js';
import { Experience } from '../models/Experience.js';
import { Service } from '../models/Service.js';

export const getDashboardStats = asyncHandler(async (req, res) => {
  const [messages, unreadMessages, projects, skills, experiences, services] = await Promise.all([
    Message.countDocuments(),
    Message.countDocuments({ status: 'new' }),
    Project.countDocuments(),
    Skill.countDocuments(),
    Experience.countDocuments(),
    Service.countDocuments(),
  ]);
  return sendSuccess(res, { messages, unreadMessages, projects, skills, experiences, services }, 'Dashboard stats fetched');
});
