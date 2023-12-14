import React from 'react';
import { ModalContainer } from './styles';

interface ModalProps {
  children: React.ReactNode;
}

const Modal = ({ children }: ModalProps) => (
  <ModalContainer>{children}</ModalContainer>
);

export default Modal;
