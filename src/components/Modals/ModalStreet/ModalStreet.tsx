/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import api from '@/services/api';
import { handleError, handleSuccess } from '@/utils/message';
import InputText from '../../Input/Input';

import {
  ButtonCancel,
  ButtonConfirm,
  ModalContainer,
  ModalContent,
  ContainerButtons,
  ContainerTitle,
} from './styles';

interface FormProps {
  name: string;
  cep?: string;
  community_id?: string | null;
  contract_id?: string | null;
}

interface ModalProps {
  onClose: () => void;
  onRefresh: () => void;
  type: string;
  street: {
    name: string;
    id: string;
    cep?: string | null;
    community_id?: string | null;
    contract_id?: string | null;
  };
}

const ModalStreet = ({ onClose, onRefresh, street, type }: ModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const { register, handleSubmit } = useForm<FormProps>({
    defaultValues: {
      ...(type === 'street' && {
        name: street.name,
        community_id: street.community_id || '',
        cep: street.cep || '',
      }),
      ...(type === 'community' && {
        name: street.name,
        contract_id: street.contract_id || '',
      }),
      ...(type === 'contract' && {
        name: street.name,
      }),
    },
  });

  const onSubmit: SubmitHandler<FormProps> = async data => {
    try {
      setLoading(true);

      await api.put(`/general/${type}/${street.id}`, data);

      handleSuccess('Dados atualizada com sucesso!');
      onRefresh();
      onClose();
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalContainer>
      <ModalContent>
        <ContainerTitle>Editar informações</ContainerTitle>

        <InputText
          label="Nome"
          placeholder="Nome"
          {...register('name', { required: true })}
        />

        {type === 'street' && (
          <InputText label="CEP" placeholder="CEP" {...register('cep')} />
        )}

        <ContainerButtons>
          <ButtonCancel onClick={onClose}>Fechar</ButtonCancel>
          <ButtonConfirm type="submit" onClick={handleSubmit(onSubmit)} disabled={loading}>
            Confirmar
          </ButtonConfirm>
        </ContainerButtons>
      </ModalContent>
    </ModalContainer>
  );
};

export default ModalStreet;
