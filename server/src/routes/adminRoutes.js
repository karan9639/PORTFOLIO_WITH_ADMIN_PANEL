import { Router } from 'express';
import { z } from 'zod';
import { requireAuth } from '../middlewares/authMiddleware.js';
import { validateBody } from '../middlewares/validateRequest.js';
import { upload } from '../middlewares/uploadMiddleware.js';
import { createCrudController, createSingletonController } from '../controllers/factoryController.js';
import { getDashboardStats } from '../controllers/dashboardController.js';
import { listMessages, updateMessageStatus, deleteMessage } from '../controllers/messageController.js';
import { uploadFile } from '../controllers/uploadController.js';
import { Profile } from '../models/Profile.js';
import { Hero } from '../models/Hero.js';
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
import { profileSchema, heroSchema, aboutSchema, contactInfoSchema, siteSettingsSchema, socialLinkSchema, serviceSchema, skillCategorySchema, skillSchema, projectSchema, experienceSchema, educationSchema, certificationSchema, achievementSchema } from '../validators/contentValidators.js';

const router = Router();
router.use(requireAuth);

const singletonRoute = (path, Model, schema) => {
  const controller = createSingletonController(Model);
  router.get(`/${path}`, controller.get);
  router.put(`/${path}`, validateBody(schema), controller.update);
};

const crudRoute = (path, Model, schema, options = {}) => {
  const controller = createCrudController(Model, options);
  router.get(`/${path}`, controller.list);
  router.post(`/${path}`, validateBody(schema), controller.create);
  router.put(`/${path}/:id`, validateBody(schema), controller.update);
  router.delete(`/${path}/:id`, controller.remove);
};

router.get('/dashboard', getDashboardStats);
router.post('/upload', upload.single('file'), uploadFile);

singletonRoute('profile', Profile, profileSchema);
singletonRoute('hero', Hero, heroSchema);
singletonRoute('about', About, aboutSchema);
singletonRoute('contact-info', ContactInfo, contactInfoSchema);
singletonRoute('site-settings', SiteSettings, siteSettingsSchema);
crudRoute('social-links', SocialLink, socialLinkSchema);
crudRoute('services', Service, serviceSchema);
crudRoute('skill-categories', SkillCategory, skillCategorySchema);
crudRoute('skills', Skill, skillSchema, { populate: 'category' });
crudRoute('projects', Project, projectSchema);
crudRoute('experiences', Experience, experienceSchema);
crudRoute('education', Education, educationSchema);
crudRoute('certifications', Certification, certificationSchema);
crudRoute('achievements', Achievement, achievementSchema);
router.get('/messages', listMessages);
router.patch('/messages/:id', validateBody(z.object({ status: z.enum(['new', 'read', 'archived']) })), updateMessageStatus);
router.delete('/messages/:id', deleteMessage);
export default router;
