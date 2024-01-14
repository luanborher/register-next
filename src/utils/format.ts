import { format } from 'date-fns';

export const formatDate = (date: string): string => format(date, 'dd/MM/yyyy');
