// services/authService.ts
import axiosService from "../lib/axios";


export interface Post {
  caption: string;
  images: string | string[];
}

export const createPost = async (data: Post) => {
  const response = await axiosService.post('/post/create', data);
  return response.data;
};

