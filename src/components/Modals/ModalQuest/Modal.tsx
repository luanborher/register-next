import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';

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
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
  zIndex?: number;
}

const ModalQuest = ({
  children,
  onClose,
  onConfirm,
  loading,
  zIndex,
}: ModalProps) => (
  <ModalContainer zIndex={zIndex}>
    <ModalContent>
      <ContainerHeader>
        <FaInfoCircle color="#171717" size={36} /> Atenção!
      </ContainerHeader>
      <ContainerTitle>{children}</ContainerTitle>
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
