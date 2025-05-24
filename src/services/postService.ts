// services/authService.ts
import axiosService from "../lib/axios";


interface Post {
  caption: string;
  images: string | string[];
}

export const createPost = async (data: Post) => {
  const response = await axiosService.post('/post/create', data);
  return response.data;
};

export const fetchPosts = async ({ limit = 10, cursor }: { limit?: number; cursor?: string | null }) => {
  const params: any = { limit };
  if (cursor) params.cursor = cursor;

  const response = await axiosService.get('/post/list', { params });
  return response.data;
};
