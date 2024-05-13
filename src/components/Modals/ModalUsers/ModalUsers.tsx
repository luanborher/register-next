import { SubmitHandler, useForm } from 'react-hook-form';
import { ChevronLeft } from 'lucide-react';

import api from '@/services/api';
import { handleError, handleSuccess } from '@/utils/message';
import Header from '../../Header/Header';
import InputText from '../../Input/Input';
import Dropdown from '../../Dropdown/Dropdown';

import {
  BackButton,
  BackText,
  ButtonConfirm,
  Row,
  Title,
  Wrapper,
} from './styles';

interface UserForm {
  name: string;
  login: string;
  password: string;
  confirmPassword: string;
  role: string;
  phone: string;
  cpf: string;
}

interface ClientsDetailsProps {
  onClose: () => void;
  refetch: () => void;
}

const ModalUsers = ({ onClose, refetch }: ClientsDetailsProps) => {
  const { register, handleSubmit, control } = useForm<UserForm>();

  const onSubmit: SubmitHandler<UserForm> = async data => {
    try {
      await api.post('/user', {
        ...data,
        email: `${data.login || 'email'}@email.com`,
        cpf: data.cpf.replace(/\D/g, '') || '00000000000',
        confirmPassword: undefined,
        company: 'Register',
        registration: '00000',
        role: data.role,
      });

      handleSuccess('Usuário adicionado com sucesso!');

      refetch();
      onClose();
    } catch (error: any) {
      handleError(error);
    }
  };

  return (
    <Wrapper>
      <Header title="Cadastro de usuários" action>
        <BackButton onClick={onClose}>
          <ChevronLeft color="#a5a5a5" size={22} />

          <BackText>Fechar</BackText>
        </BackButton>
      </Header>

      <Title>Preencha os campos</Title>

      <Row>
        <InputText
          label="Nome"
          placeholder="Nome completo"
          {...register('name')}
        />

        <InputText label="Login" placeholder="Login" {...register('login')} />
      </Row>

      <Row>
        <InputText
          label="Senha"
          type="password"
          placeholder="Senha"
          {...register('password')}
        />

        <InputText
          label="Confirme a senha"
          type="password"
          placeholder="Confirme a senha"
          {...register('confirmPassword')}
        />
      </Row>

      <Row>
        <Dropdown
          name="role"
          label="Permissão"
          control={control}
          options={[
            { value: 'MASTER', label: 'Master' },
            { value: 'ADMIN', label: 'Administrador' },
            { value: 'REGISTER', label: 'Cadastro' },
            { value: 'DEVELOPER', label: 'Desenvolvedor' },
          ]}
        />

        <InputText
          label="Celular"
          placeholder="Celular"
          {...register('phone')}
        />

        <InputText label="CPF" placeholder="CPF" {...register('cpf')} />
      </Row>

      <Row style={{ justifyContent: 'flex-end', marginTop: '2rem' }}>
        <ButtonConfirm type="submit" onClick={handleSubmit(onSubmit)}>
          Salvar
        </ButtonConfirm>
      </Row>
    </Wrapper>
  );
};

export default ModalUsers;
