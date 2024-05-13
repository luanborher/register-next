import styled from 'styled-components';

export const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99999;

  background-color: #1f2420c0;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  position: relative;

  width: 850px;
  padding: 2rem 4rem;

  background-color: #fff;

  border-radius: 8px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
`;

export const RowSection = styled.div`
  width: 100%;

  display: flex;
  gap: 1.2rem;
`;

export const Field = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  color: black;
`;

export const FieldData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export const Label = styled.div`
  width: 100%;
  color: black;
  font-size: 1rem;
  padding-left: 6px;
`;

export const ButtonConfirm = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  width: 180px;
  height: 40px;

  background-color: #8cd630;
  border: none;
  border-radius: 8px;

  color: #fff;
  font-weight: 500;
`;

export const ClosePosition = styled.div`
  position: absolute;

  top: 10px;
  right: 10px;

  color: black;
  cursor: pointer;
`;

export const Header = styled.div`
  width: 100%;

  color: black;
  font-size: 1.2rem;
  font-weight: 700;

  margin: 1rem 0 0 0;
`;

export const ButtonSection = styled.div`
  width: 100%;

  display: flex;
  justify-content: flex-end;
`;
