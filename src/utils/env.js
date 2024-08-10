import dotenv from 'dotenv';
dotenv.config();

export const env = (key, defaultValue = undefined) => {
  const value = process.env[key];
  if (value === undefined) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Missing: process.env['${key}'].`);
  }
  return value;
};
