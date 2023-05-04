import dotenv from 'dotenv';

dotenv.config();

export const APP_PORT = Number(process.env.APP_PORT) || 8080;
export const JWT_SECRET = process.env.JWT_SECRET || 'somerandomkeyherena';
export const JWT_EXPIRE = process.env.JWT_EXPIRE || '30d';

export const AWS_KEY = process.env.AWS_KEY || '';
export const AWS_SECRET = process.env.AWS_SECRET || '';
export const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME || '';
