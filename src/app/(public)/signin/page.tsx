'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push('/');
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-16 rounded-lg shadow-md w-full max-w-[500px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <div className="flex items-center justify-center mb-8">
        <Image
          src="/assets/logo-2.png"
          alt="Logo"
          width={225}
          height={110}
          placeholder="blur"
          blurDataURL="/assets/logo-2.png"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="login"
          className="block text-neutral-900 font-semibold mb-2"
        >
          Usuário
        </label>
        <input
          type="text"
          id="login"
          name="login"
          className="w-full px-3 py-2 border text-black border-neutral-900 rounded-lg focus:outline-none focus:ring focus:border-neutral-900"
          placeholder="Seu usuário"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-neutral-900 font-semibold mb-2"
        >
          Senha
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="w-full px-3 py-2 border text-black border-neutral-900 rounded-lg focus:outline-none focus:ring focus:border-neutral-900"
          placeholder="Sua senha"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-teal-400 text-white py-2 px-4 rounded-lg font-semibold hover:bg-teal-500 focus:outline-none mt-12"
      >
        Entrar
      </button>
    </form>
  );
}
