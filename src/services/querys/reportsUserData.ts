import { IUserDetails, IUserReports } from '@/interfaces/Reports';
import api from '../api';

export const getUserReports = async (params: Record<string, any>) => {
  const { data } = await api.get<IUserReports[]>('/client/monthly-report', {
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
