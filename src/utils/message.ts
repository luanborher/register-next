import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';

const isBackEndError = (err: any): err is AxiosError<{ message: string }> => {
  if (err?.response?.data) {
    return true;
  }
  return false;
};

const notifyError = (message: string) => {
  toast.error(message, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};

const notifySuccess = (message: string) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};

export const handleError = (err: any) => {
  if (axios.isAxiosError(err) && isBackEndError(err)) {
    return notifyError(
      (err?.response?.data?.message as string) || 'Erro inesperado',
    );
  }

  if (err instanceof Error) {
    return notifyError((err?.message as string) || 'Erro inesperado');
  }
};

export const handleSuccess = (message: string) => notifySuccess(message);
