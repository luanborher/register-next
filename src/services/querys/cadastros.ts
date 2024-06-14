import { IContracts, IUserDetails, IUserReports } from '@/interfaces/Reports';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { Contract, Records, Street } from '@/interfaces/Records';
import { Community, Paginated } from '@/interfaces/Records';
import api from '../api';

export const useClients = (params: Record<string, any>, enable?: boolean) => {
  const getClients = async ({ queryKey }: QueryFunctionContext) => {
    const [, params] = queryKey;

    const { data } = await api.get<Paginated<Records[]>>(
      '/client/filter/validated',
      { params },
    );

    return data;
  };

  return useQuery({
    queryKey: ['getClients', params],
    queryFn: getClients,
    enabled: enable,
  });
};

export const getUserReports = async (params: Record<string, any>) => {
  const { data } = await api.get<IUserReports[]>('/client/monthly-report', {
    params,
  });

  return data;
};

export const getContractsReports = async (params: Record<string, any>) => {
  const { data } = await api.get<IContracts[]>('/client/contract-report', {
    params,
  });

  return data;
};

export const getUserDetails = async (params: Record<string, any>) => {
  const { data } = await api.get<IUserDetails>('/client/monthly-report-user', {
    params,
  });

  return data;
};

export const useContract = (params: Record<string, any>, enable?: boolean) => {
  const getContract = async () => {
    const { data } = await api.get<Contract[]>('/general/contract');

    const result = data.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    return result || [];
  };

  return useQuery({
    queryKey: ['getContract', params],
    queryFn: getContract,
    enabled: enable,
  });
};

export const useCommunity = (params: Record<string, any>, enable?: boolean) => {
  const getCommunity = async () => {
    const { data } = await api.get<Community[]>('/general/community');

    const result = data.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    return result || [];
  };

  return useQuery({
    queryKey: ['getCommunity', params],
    queryFn: getCommunity,
    enabled: enable,
  });
};

export const useStreet = (params: Record<string, any>, enable?: boolean) => {
  const getStreet = async () => {
    const { data } = await api.get<Street[]>('/general/street');

    const result = data.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    return result || [];
  };

  return useQuery({
    queryKey: ['getStreet', params],
    queryFn: getStreet,
    enabled: enable,
  });
};
