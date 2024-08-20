import React, { Dispatch, SetStateAction } from 'react';
import { FaInfoCircle } from 'react-icons/fa';

import { TextArea } from '@/components/Details/ClientsDetails/styles';
import {
  ButtonCancel,
  ButtonConfirm,
  ModalContainer,
  ModalContent,
  ContainerButtons,
  ContainerTitle,
  ContainerHeader,
} from './styles';

interface ModalProps {
  children: React.ReactNode;
  loading?: boolean;
  reject?: string;
  zIndex?: number;
  onClose: () => void;
  onConfirm: () => void;
  setReject?: Dispatch<SetStateAction<string>>;
  isReject?: boolean;
}

const ModalQuest = ({
  children,
  reject,
  isReject,
  loading,
  zIndex,
  onClose,
  onConfirm,
  setReject,
}: ModalProps) => (
  <ModalContainer zIndex={zIndex}>
    <ModalContent>
      <ContainerHeader>
        <FaInfoCircle color="#171717" size={36} /> Atenção!
      </ContainerHeader>
      <ContainerTitle>{children}</ContainerTitle>

      {isReject && setReject && (
        <TextArea
          placeholder="Descreva o motivo de rejeição..."
          value={reject}
          onChange={e => setReject(e.target.value)}
        />
      )}

      <ContainerButtons>
        <ButtonCancel onClick={onClose}>Fechar</ButtonCancel>
        <ButtonConfirm onClick={onConfirm} disabled={loading}>
          Confirmar
        </ButtonConfirm>
      </ContainerButtons>
    </ModalContent>
  </ModalContainer>
);

export default ModalQuest;
