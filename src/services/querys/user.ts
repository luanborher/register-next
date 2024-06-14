import { UserClass } from '@/interfaces/User';
import { useQuery } from '@tanstack/react-query';
import api from '../api';

export const getUser = async () => {
  const { data } = await api.get<UserClass[]>('/user');
  return data;
};

export const useUsers = () => {
  const getUser = async () => {
    const { data } = await api.get<UserClass[]>('/user');
    return data;
  };

  return useQuery({
    queryKey: ['usersList'],
    queryFn: getUser,
  });
};
