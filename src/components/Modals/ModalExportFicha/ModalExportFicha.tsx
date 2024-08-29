import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { addDays, format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { useReactToPrint } from 'react-to-print';

import { handleError } from '@/utils/message';
import { getUser } from '@/services/querys/user';
import api from '@/services/api';

import InputText from '@/components/Input/Input';
import FichaCampo from '@/components/Pdfs/FichaCampo/FichaCampo';
import { ResponseInativas } from '@/interfaces/inativas';
import Select from '../../Select/Select';

import {
  ModalContent,
  ModalContainer,
  ClosePosition,
  Header,
  Hidden,
  ButtonClose,
} from './styles';
import { ButtonConfirm, Field, Label, FieldData, RowSection } from './styles';

interface IOptions {
  value: string;
  label: string;
}

interface ModalProps {
  onClose: () => void;
}

const ModalExportFicha = ({ onClose }: ModalProps) => {
  const [date, setDate] = useState<string>('');
  const [user, setUser] = useState<IOptions>();
  const [response, setResponse] = useState<ResponseInativas[]>([]);
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current as HTMLDivElement,
  });

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
    if (!user?.value) {
      handleError('Selecione um agente.');
      return;
    }

    if (!date) {
      handleError('Selecione uma data.');
      return;
    }

    try {
      const { data } = await api.get('/inativa', {
        params: {
          user_id: user.value,
          date: format(addDays(date, 1), 'dd/MM/yyyy'),
          status: 'SENT',
        },
      });

      setResponse(data);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    if (response && response?.length > 0) {
      handlePrint();
    }
  }, [response]);

  return (
    <>
      <ModalContainer>
        <ModalContent>
          <ClosePosition>
            <X onClick={onClose} />
          </ClosePosition>

          <Header>Imprimir fichas por agente</Header>

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

          <ButtonClose type="button" onClick={onClose}>
            Fechar
          </ButtonClose>
          <ButtonConfirm type="button" onClick={onSubmit}>
            Imprimir
          </ButtonConfirm>
        </ModalContent>
      </ModalContainer>

      {response?.length > 0 && (
        <Hidden>
          <FichaCampo
            ref={componentRef}
            inativas={response}
            contract="PIRITUBA - EXTREMO NORTE"
            total={response?.length || 0}
            date={date ? format(addDays(date, 1), 'dd/MM/yyyy') : '__/__/____'}
            user={user?.label}
          />
        </Hidden>
      )}
    </>
  );
};

export default ModalExportFicha;
