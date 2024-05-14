import React, { Dispatch, SetStateAction } from 'react';
import { X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/services/querys/user';
import InputDate from '../../InputDate/Input';
import Select from '../../Select/Select';
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
  const { data: users } = useQuery({
    queryKey: ['usersList'],
    queryFn: async () => {
      const data = await getUser();
      return data.reverse();
    },
  });

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
              options={
                users?.map(userI => ({
                  value: userI?.id || '',
                  label: userI?.name || '',
                })) || []
              }
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
