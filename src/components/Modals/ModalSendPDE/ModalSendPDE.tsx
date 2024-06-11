import React, { useState } from 'react';
import { X } from 'lucide-react';
import { addDays, format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/services/querys/user';
import { handleError, handleSuccess } from '@/utils/message';
import api from '@/services/api';
import InputText from '@/components/Input/Input';
import Select from '../../Select/Select';
import { ModalContent, ModalContainer, ClosePosition, Header } from './styles';
import { ButtonConfirm, Field, Label, FieldData, RowSection } from './styles';

interface ModalProps {
  onClose: () => void;
}

const ModalSendPDE = ({ onClose }: ModalProps) => {
  const [date, setDate] = useState<string>('');
  const [pde, setPDE] = useState<string>('');
  const [user, setUser] = useState<{
    value: string;
    label: string;
  }>();

  const { data: users } = useQuery({
    queryKey: ['usersList'],
    queryFn: async () => {
      const data = await getUser();
      return data.reverse();
    },
  });

  const options = users?.map(userI => ({
    value: userI?.id || '',
    label: userI?.name || '',
  }));

  const onSubmit = async () => {
    try {
      const data = {
        pde,
        user_id: user?.value,
        date: format(addDays(date, 1), 'dd/MM/yyyy'),
      };

      await api.post('/send-pde', data);

      handleSuccess('PDE enviado com sucesso!');
      onClose();
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <ModalContainer>
      <ModalContent>
        <ClosePosition>
          <X onClick={onClose} />
        </ClosePosition>

        <Header>Envio de serviço por PDE</Header>

        <RowSection>
          <Field>
            <Label>Selecione um agente</Label>
            <Select
              placeholder="Selecione..."
              value={user}
              onChange={e => e && setUser(e)}
              options={options || []}
            />
          </Field>

          <FieldData style={{ width: '200px' }}>
            <Label>Data da OS</Label>
            <InputText
              type="date"
              style={{ minWidth: '200px', width: '200px' }}
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </FieldData>
        </RowSection>

        <FieldData>
          <Label>PDE</Label>
          <InputText
            type="text"
            style={{ width: '100%', maxWidth: '100%' }}
            value={pde}
            onChange={e => setPDE(e.target.value)}
          />
        </FieldData>

        <ButtonConfirm type="button" onClick={onSubmit}>
          Enviar PDE
        </ButtonConfirm>
      </ModalContent>
    </ModalContainer>
  );
};

export default ModalSendPDE;
