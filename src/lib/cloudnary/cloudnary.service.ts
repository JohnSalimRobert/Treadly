// src/lib/cloudinary/cloudinary.service.ts

import axiosService from "../axios";
import { CLOUDINARY_CONFIG } from "./cloudnary.config";

type UploadResponse = {
  url: string;
  secure_url: string;
  public_id: string;
  asset_id: string;
};

export const uploadToCloudinary = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_CONFIG.UPLOAD_PRESET);

  const response = await axiosService.post<UploadResponse>(CLOUDINARY_CONFIG.UPLOAD_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
