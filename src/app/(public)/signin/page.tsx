'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Login } from 'interfaces/User';
import api from 'services/api';

export default function LoginPage() {
  const router = useRouter();

  const { register, handleSubmit } = useForm<Login>();

  const onSubmit: SubmitHandler<Login> = async (form) => {
    try {
      const { data } = await api.post('/login', form);

      console.log(data);
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-16 rounded-lg shadow-md w-full max-w-[500px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <div className="flex items-center justify-center mb-8">
        <Image
          src="/assets/register.svg"
          alt="Logo"
          width={120}
          height={110}
          placeholder="blur"
          blurDataURL="/assets/register.svg"
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
          type="email"
          className="w-full px-3 py-2 border text-black border-secondary rounded-lg focus:outline-none focus:ring focus:border-secondary"
          placeholder="Seu usuário"
          {...register('email')}
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
    </form>
  );
}
