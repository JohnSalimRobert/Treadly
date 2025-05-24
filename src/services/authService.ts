// services/authService.ts
import axiosService from "../lib/axios";


export interface AuthCredentials {
  username?: string;
  email?: string;
  password: string;
  bio?: string;
  profilePic?: string;
}

export const signup = async (data: AuthCredentials) => {
  const response = await axiosService.post('/auth/signup', data);
  return response.data; // { token, user }
};

export const login = async (data: Omit<AuthCredentials, 'bio' | 'profilePic'>) => {
  const response = await axiosService.post('/auth/login', data);
  return response.data; // { token, user }
};