import React from 'react';
import { ModalContainer } from './styles';

interface ModalProps {
  children: React.ReactNode;
}

const ModalImport = ({ children }: ModalProps) => (
  <ModalContainer>{children}</ModalContainer>
);

export default ModalImport;
