import { IInativas } from '@/interfaces/prateleira';
import { Inativas } from '@/interfaces/inativas';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { normalize } from '@/utils/format';
import api from '../api';

export const getPrateleira = async () => {
  const { data } = await api.get<IInativas[]>('/inativa/shelf');
  return data;
};

export const useInativas = (params: Record<string, any>, enable?: boolean) => {
  const getInativas = async ({ queryKey }: QueryFunctionContext) => {
    const [, params] = queryKey;

    const { data } = await api.get<Inativas[]>('/inativa', { params });

    return data.map(item => ({
      ...item,
      filter: normalize(item.InativasSent?.[0]?.type),
      userName: normalize(item.InativasSent?.[0]?.name),
    }));
  };

  return useQuery({
    queryKey: ['getInativas', params],
    queryFn: getInativas,
    enabled: enable,
  });
};
