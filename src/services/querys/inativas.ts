import { IInativas } from '@/interfaces/prateleira';
import { Inativas } from '@/interfaces/inativas';
import api from '../api';

export const getPrateleira = async () => {
  const { data } = await api.get<IInativas[]>('/inativa/shelf');
  return data;
};

export const getInativas = async (params: Record<string, any>) => {
  const { data } = await api.get<Inativas[]>('/inativa', {
    params,
  });

  return data;
};
