/* eslint-disable prettier/prettier */
import React from 'react';
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
  cep: string;
  community_id: string;
}

interface ModalProps {
  onClose: () => void;
  onRefresh: () => void;
  street: {
    name: string;
    id: string;
    cep?: string;
    community_id?: string;
  };
}

const ModalStreet = ({ onClose, onRefresh, street }: ModalProps) => {
  const { register, handleSubmit } = useForm<FormProps>({
    defaultValues: {
      name: street.name,
      community_id: street.community_id,
      cep: street.cep,
    },
  });

  const onSubmit: SubmitHandler<FormProps> = async data => {
    try {
      await api.put(`/general/street/${street.id}`, {
        ...data,
      });

      handleSuccess('Rua atualizada com sucesso!');
      onRefresh();
      onClose();
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <ModalContainer>
      <ModalContent>
        <ContainerTitle>Editar informações da rua</ContainerTitle>

        <InputText
          label="Nome"
          placeholder="Nome"
          {...register('name', { required: true })}
        />

        <InputText label="CEP" placeholder="CEP" {...register('cep')} />

        <ContainerButtons>
          <ButtonCancel onClick={onClose}>Fechar</ButtonCancel>

          <ButtonConfirm type="submit" onClick={handleSubmit(onSubmit)}>
            Confirmar
          </ButtonConfirm>
        </ContainerButtons>
      </ModalContent>
    </ModalContainer>
  );
};

export default ModalStreet;
