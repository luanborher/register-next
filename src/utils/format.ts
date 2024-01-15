/* eslint-disable prettier/prettier */
import { format } from 'date-fns';

export const formatDate = (date: string): string => format(date, 'dd/MM/yyyy');

export const formatDateHours = (date: string): string => format(date, 'dd/MM/yyyy HH:mm');
