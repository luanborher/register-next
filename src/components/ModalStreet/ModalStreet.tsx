/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Community } from '@/interfaces/Records';

import api from '@/services/api';
import { handleError } from '@/utils/message';
import InputText from '../Input/Input';
import Dropdown from '../Dropdown/Dropdown';

import {
  ButtonCancel,
  ButtonConfirm,
  ModalContainer,
  ModalContent,
  ContainerButtons,
  ContainerTitle,
} from './styles';

interface Option {
  label: string;
  value: string;
}

interface FormProps {
  name: string;
  community_id: string;
  cep: string;
}

interface ModalProps {
  onClose: () => void;
  onRefresh: () => void;
  street: {
    name: string;
    id: string;
    cep?: string;
    community?: Option;
  };
}

const ModalStreet = ({ onClose, onRefresh, street }: ModalProps) => {
  const [community, setCommunity] = useState<Community[]>([]);

  const { register, handleSubmit, control } = useForm<FormProps>({
    defaultValues: {
      name: street.name,
      community_id: street.community?.value,
      cep: street.cep,
    },
  });

  const getCommunity = async () => {
    try {
      const { data } = await api.get<Community[]>('/general/community');

      setCommunity(data);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    getCommunity();
  }, []);

  const onSubmit: SubmitHandler<FormProps> = async data => {
    try {
      await api.put(`/general/street/${street.id}`, {
        ...data,
        community_id: data.community_id,
      });

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

        <Dropdown
          name="community_id"
          label="Comunidade"
          defaultValue={street.community}
          control={control}
          options={
            community.length > 0
              ? community.map(communitie => ({
                label: communitie.name,
                value: communitie.id,
              }))
              : []
          }
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
