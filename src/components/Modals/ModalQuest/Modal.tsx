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
  zIndex?: number;
}

const ModalQuest = ({ children, onClose, onConfirm, zIndex }: ModalProps) => (
  <ModalContainer zIndex={zIndex}>
    <ModalContent>
      <ContainerHeader>
        <FaInfoCircle color="#171717" size={36} /> Atenção!
      </ContainerHeader>

      <ContainerTitle>{children}</ContainerTitle>

      <ContainerButtons>
        <ButtonCancel onClick={onClose}>Fechar</ButtonCancel>

        <ButtonConfirm onClick={onConfirm}>Confirmar</ButtonConfirm>
      </ContainerButtons>
    </ModalContent>
  </ModalContainer>
);

export default ModalQuest;
