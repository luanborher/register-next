export const formatCod = (cod: string, number: number): string => {
  return cod.toString().padStart(number, '0');
};
