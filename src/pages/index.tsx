import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';

import api from '@/services/api';
import { Login, User } from '@/interfaces/User';
import { handleError } from '@/utils/message';
import { useAuth } from '@/hooks/useAuth';

import {
  Button,
  FormContainer,
  InputColumn,
  InputContainer,
  Label,
  MainContainer,
} from './styles';

const LoginPage = () => {
  const { push } = useRouter();
  const { setUser } = useAuth();

  const { register, handleSubmit } = useForm<Login>();

  const onSubmit: SubmitHandler<Login> = async form => {
    try {
      const { data } = await api.post<User>('/user/sessions', {
        ...form,
        device_token: '',
      });

      localStorage.setItem('@register:accessToken', data.access_token);
      localStorage.setItem('@register:user', JSON.stringify(data.user));

      setUser(data.user);
      push('/cadastros');
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      <MainContainer />

      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <Image
          src="/assets/logo.svg"
          alt="Logo"
          width={100}
          height={110}
          placeholder="blur"
          blurDataURL="/assets/logo.svg"
        />

        <InputColumn>
          <InputContainer>
            <Label htmlFor="login">Usuário</Label>

            <input
              id="login"
              type="text"
              placeholder="Seu usuário"
              {...register('login')}
            />
          </InputContainer>

          <InputContainer>
            <Label htmlFor="password">Senha</Label>

            <input
              id="password"
              type="password"
              placeholder="Sua senha"
              {...register('password')}
            />
          </InputContainer>
        </InputColumn>

        <Button type="submit">Entrar</Button>
      </FormContainer>
    </>
  );
};

export default LoginPage;
