import { UserClass } from '@/interfaces/User';
import api from '../api';

export const getUser = async () => {
  const { data } = await api.get<UserClass[]>('/user');
  return data;
};
