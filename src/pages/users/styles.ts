import styled from 'styled-components';

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
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

export const ActionsIcons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;
