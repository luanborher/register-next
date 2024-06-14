import styled from 'styled-components';

interface ModalProps {
  zIndex?: number;
}

export const ModalContainer = styled.div<ModalProps>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${({ zIndex }) => zIndex || '99999'};
  background-color: #1f2420c0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  width: 450px;
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const ContainerHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 3rem 1rem 2rem 1rem;
  color: #000;
  font-size: 1.4rem;
  font-weight: 500;
  text-align: center;
`;

export const ContainerTitle = styled.div`
  width: 100%;
  padding: 1rem 3rem 2rem 3rem;
  border-bottom: 1px solid #e5e5e5;
  color: #000;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
`;

export const ContainerButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding: 2rem 1rem 1.5rem 1rem;
`;

export const ButtonCancel = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 180px;
  height: 45px;
  padding: 0.5rem 1rem;
  background-color: #fff;
  border: 2px solid #e70a0a;
  border-radius: 8px;
  color: #e70a0a;
  font-weight: bold;
`;

export const ButtonConfirm = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 180px;
  height: 45px;
  padding: 0.5rem 1rem;
  background-color: #8cd630;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-weight: 500;
`;
