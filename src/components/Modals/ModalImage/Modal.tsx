import React from 'react';
import { ModalContainer } from './styles';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const ModalImage = ({ children, onClose }: ModalProps) => (
  <ModalContainer onClick={onClose}>{children}</ModalContainer>
);

export default ModalImage;
