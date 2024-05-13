import { SubmitHandler, useForm } from 'react-hook-form';
import { ChevronLeft } from 'lucide-react';

import api from '@/services/api';
import { handleError, handleSuccess } from '@/utils/message';
import { UserClass } from '@/interfaces/User';

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
  role: string;
}

interface ClientsDetailsProps {
  onClose: () => void;
  refetch: () => void;
  user: UserClass;
}

const ModalUsersEdit = ({ onClose, refetch, user }: ClientsDetailsProps) => {
  const { register, handleSubmit, control } = useForm<UserForm>({
    defaultValues: {
      name: user?.name || '',
      login: user?.login || '',
      role: user?.role || '',
    },
  });

  const onSubmit: SubmitHandler<UserForm> = async data => {
    try {
      await api.put(`/user/${user?.id}`, {
        name: data.name,
        email: `${data.login || 'email'}@email.com`,
        login: data.login,
        role: data.role,
        active: true,
      });

      handleSuccess('usuário alterado com sucesso!');

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
      </Row>

      <Row style={{ justifyContent: 'flex-end', marginTop: '2rem' }}>
        <ButtonConfirm type="submit" onClick={handleSubmit(onSubmit)}>
          Salvar
        </ButtonConfirm>
      </Row>
    </Wrapper>
  );
};

export default ModalUsersEdit;
