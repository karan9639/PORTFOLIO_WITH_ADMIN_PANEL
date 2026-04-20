import dotenv from 'dotenv';

dotenv.config();

const env = {
  port: Number(process.env.PORT || 4000),
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/premium_portfolio',
  jwtSecret: process.env.JWT_SECRET || 'replace-with-a-long-random-secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  cookieName: process.env.COOKIE_NAME || 'portfolio_admin_token',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  adminUrl: process.env.ADMIN_URL || 'http://localhost:5174',
  serverUrl: process.env.SERVER_URL || 'http://localhost:4000',
  defaultAdminName: process.env.DEFAULT_ADMIN_NAME || 'Portfolio Admin',
  defaultAdminEmail: process.env.DEFAULT_ADMIN_EMAIL || 'admin@example.com',
  defaultAdminPassword: process.env.DEFAULT_ADMIN_PASSWORD || 'Admin@123456',
};

export const isProduction = env.nodeEnv === 'production';
export default env;
