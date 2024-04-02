import { styled } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 0.6rem;
  padding-right: 15px;
  padding-left: 5px;

  height: 100%;
  width: 100%;

  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: white;
  }

  &::-webkit-scrollbar-thumb {
    background: #8cd630;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

export const BackButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 0.3rem;

  width: auto;

  cursor: pointer;
`;

export const BackText = styled.div`
  font-size: 1rem;
  color: #a5a5a5;
`;
