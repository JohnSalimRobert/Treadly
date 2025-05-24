import axiosService from "../lib/axios";

export const fetchUser = async () => {
  const response = await axiosService.get('/user/profile');
  return response.data;
};
