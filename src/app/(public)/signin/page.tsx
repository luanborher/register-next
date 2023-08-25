'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';

import { FormContainer } from './styles';

import { Login, User } from 'interfaces/User';
import api from 'services/api';

export default function LoginPage() {
  const router = useRouter();

  const { register, handleSubmit } = useForm<Login>();

  const onSubmit: SubmitHandler<Login> = async (form) => {
    try {
      const { data } = await api.post<User>('/user/sessions', {
        ...form
      });

      localStorage.setItem('@register:accessToken', data.access_token);
      localStorage.setItem('@register:user', JSON.stringify(data.user));

      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center justify-center mb-8">
        <Image
          src="/assets/logo.svg"
          alt="Logo"
          width={100}
          height={110}
          placeholder="blur"
          blurDataURL="/assets/logo.svg"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="login"
          className="block text-secondary font-semibold mb-2"
        >
          Usuário
        </label>

        <input
          id="login"
          type="text"
          className="w-full px-3 py-2 border text-black border-secondary rounded-lg focus:outline-none focus:ring focus:border-secondary"
          placeholder="Seu usuário"
          {...register('login')}
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-secondary font-semibold mb-2"
        >
          Senha
        </label>

        <input
          id="password"
          type="password"
          className="w-full px-3 py-2 border text-black border-secondary rounded-lg focus:outline-none focus:ring focus:border-secondary"
          placeholder="Sua senha"
          {...register('password')}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-white py-2 px-4 rounded-lg font-semibold hover:bg-primaryLight focus:outline-none mt-12"
      >
        Entrar
      </button>
    </FormContainer>
  );
}
