/* eslint-disable prettier/prettier */
import { format } from 'date-fns';

export const formatDate = (date: string): string => format(date, 'dd/MM/yyyy');

export const formatDateHours = (date: string): string => format(date, 'dd/MM/yyyy HH:mm');

export const normalize = (texto: string) => {
  return texto
    ?.normalize('NFD')
    ?.replace(/[\u0300-\u036f]/g, '')
    ?.replace(/[^\w\s]/gi, '')
    ?.replace(' ', '')
    ?.toLowerCase();
};
