// src/lib/cloudinary/cloudinary.config.ts
export const CLOUDINARY_CONFIG = {
    UPLOAD_PRESET: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
    CLOUD_NAME: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    UPLOAD_URL: `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
  };
  