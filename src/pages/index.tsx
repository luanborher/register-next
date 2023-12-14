/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';

import api from '@/services/api';
import { Login, User } from '@/interfaces/User';
import { Button, FormContainer, InputContainer, MainContainer } from './styles';

const LoginPage = () => {
  const { push } = useRouter();

  const { register, handleSubmit } = useForm<Login>();

  const onSubmit: SubmitHandler<Login> = async form => {
    try {
      const { data } = await api.post<User>('/user/sessions', {
        ...form,
        device_token: '',
      });

      localStorage.setItem('@register:accessToken', data.access_token);
      localStorage.setItem('@register:user', JSON.stringify(data.user));

      push('/records');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainContainer>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <Image
          src="/assets/logo.svg"
          alt="Logo"
          width={100}
          height={110}
          placeholder="blur"
          blurDataURL="/assets/logo.svg"
        />

        <InputContainer>
          <label htmlFor="login">Usuário</label>

          <input
            id="login"
            type="text"
            placeholder="Seu usuário"
            {...register('login')}
          />
        </InputContainer>

        <InputContainer>
          <label htmlFor="password">Senha</label>

          <input
            id="password"
            type="password"
            placeholder="Sua senha"
            {...register('password')}
          />
        </InputContainer>

        <Button type="submit">Entrar</Button>
      </FormContainer>
    </MainContainer>
  );
};

export default LoginPage;
