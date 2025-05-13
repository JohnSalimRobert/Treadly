// src/lib/cloudinary/uploadImages.ts

import type { UploadResult } from "../../types/cloudnaryTypes";
import { uploadToCloudinary } from "./cloudnary.service";

export const uploadImages = async (
  files: File | File[]
): Promise<UploadResult[]> => {
  const fileArray = Array.isArray(files) ? files : [files];

  const uploadPromises = fileArray.map(async (file) => {
    try {
      const data = await uploadToCloudinary(file);
      return { success: true, data };
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      return { success: false, data: null, error };
    }
  });

  return Promise.all(uploadPromises);
};
