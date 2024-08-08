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
  height: 450px;
  padding: 2rem 3rem;
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
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
  width: 100%;
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

export const ButtonClose = styled.button`
  position: absolute;
  bottom: 2rem;
  right: 15rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 180px;
  height: 40px;
  background-color: #eeeeee;
  border: 1px solid #8cd630;
  border-radius: 8px;
  color: #8cd630;
  font-weight: 500;
`;

export const ButtonConfirm = styled.button`
  position: absolute;
  bottom: 2rem;
  right: 3rem;
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
  top: 1rem;
  right: 1rem;
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

export const Hidden = styled.div`
  display: none;
`;
