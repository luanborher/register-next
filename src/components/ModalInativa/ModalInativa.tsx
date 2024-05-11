/* eslint-disable operator-linebreak */
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { handleError } from '@/utils/message';
import { UserClass } from '@/interfaces/User';
import api from '@/services/api';
import {
  ModalContent,
  ModalContainer,
  RowSection,
  ButtonConfirm,
  Field,
  Label,
  FieldData,
  ClosePosition,
  Header,
  ButtonSection,
} from './styles';
import InputDate from '../InputDate/Input';
import Select from '../Select/Select';

interface Option {
  value: string;
  label: string;
}

interface ModalProps {
  onClose: () => void;
  onFunction: () => void;
  children: React.ReactNode;
  setDate: Dispatch<SetStateAction<string>>;
  setUser: Dispatch<SetStateAction<Option | undefined>>;
  date: string;
  user: Option | undefined;
}

const ModalInativas = ({
  onClose,
  onFunction,
  setDate,
  date,
  setUser,
  user,
  children,
}: ModalProps) => {
  const [users, setUsers] = useState<UserClass[]>([]);

  const getUsers = async () => {
    try {
      const { data } = await api.get<UserClass[]>('/user');

      setUsers(data.reverse());
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <ModalContainer>
      <ModalContent>
        <ClosePosition>
          <X onClick={onClose} />
        </ClosePosition>

        <Header>Finalizar envio de OS</Header>

        <RowSection>
          <Field>
            <Label>Selecione um agente</Label>
            <Select
              placeholder="Selecione..."
              value={user}
              onChange={e => e && setUser(e)}
              options={users?.map(userI => ({
                value: userI?.id || '',
                label: userI?.name || '',
              }))}
            />
          </Field>

          <FieldData>
            <Label>Data da OS</Label>
            <InputDate
              style={{ width: '200px' }}
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </FieldData>
        </RowSection>

        <RowSection>
          <Field>
            <Label>Resumo</Label>
            {children}
          </Field>
        </RowSection>

        <ButtonSection>
          <ButtonConfirm type="button" onClick={onFunction}>
            Enviar roteiro
          </ButtonConfirm>
        </ButtonSection>
      </ModalContent>
    </ModalContainer>
  );
};

export default ModalInativas;
