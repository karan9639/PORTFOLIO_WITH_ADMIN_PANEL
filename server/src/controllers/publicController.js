import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { Hero } from '../models/Hero.js';
import { Profile } from '../models/Profile.js';
import { About } from '../models/About.js';
import { ContactInfo } from '../models/ContactInfo.js';
import { SiteSettings } from '../models/SiteSettings.js';
import { SocialLink } from '../models/SocialLink.js';
import { Service } from '../models/Service.js';
import { SkillCategory } from '../models/SkillCategory.js';
import { Skill } from '../models/Skill.js';
import { Project } from '../models/Project.js';
import { Experience } from '../models/Experience.js';
import { Education } from '../models/Education.js';
import { Certification } from '../models/Certification.js';
import { Achievement } from '../models/Achievement.js';
import { Message } from '../models/Message.js';

export const getSiteData = asyncHandler(async (req, res) => {
  const [hero, profile, about, contactInfo, siteSettings, socialLinks, services, categories, skills, projects, experiences, education, certifications, achievements] = await Promise.all([
    Hero.findOne({ singletonKey: 'default' }),
    Profile.findOne({ singletonKey: 'default' }),
    About.findOne({ singletonKey: 'default' }),
    ContactInfo.findOne({ singletonKey: 'default' }),
    SiteSettings.findOne({ singletonKey: 'default' }),
    SocialLink.find().sort('sortOrder createdAt'),
    Service.find().sort('sortOrder createdAt'),
    SkillCategory.find().sort('sortOrder createdAt'),
    Skill.find().populate('category').sort('sortOrder createdAt'),
    Project.find().sort('sortOrder createdAt'),
    Experience.find().sort('sortOrder createdAt'),
    Education.find().sort('sortOrder createdAt'),
    Certification.find().sort('sortOrder createdAt'),
    Achievement.find().sort('sortOrder createdAt'),
  ]);

  const skillCategories = categories.map((category) => ({
    ...category.toObject(),
    skills: skills.filter((skill) => skill.category?._id?.toString() === category._id.toString()),
  }));

  return sendSuccess(res, { hero, profile, about, contactInfo, siteSettings, socialLinks, services, skillCategories, projects, experiences, education, certifications, achievements }, 'Site data fetched');
});

export const createMessage = asyncHandler(async (req, res) => sendSuccess(res, await Message.create(req.validatedBody), 'Message sent successfully', 201));
