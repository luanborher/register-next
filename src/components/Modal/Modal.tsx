import { ModalContainer } from './styles';

interface ModalProps {
  children: React.ReactNode;
}

const Modal = ({ children }: ModalProps) => {
  return <ModalContainer>{children}</ModalContainer>;
};

export default Modal;
