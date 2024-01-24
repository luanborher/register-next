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

export const Input = styled.input`
  width: 100%;

  display: flex;
  flex-direction: column;

  padding: 0.6rem 1rem;

  border: 2px solid #e4e4e4;
  border-radius: 8px;

  color: #000;

  &:focus {
    outline: none;
  }
`;

export const Title = styled.p`
  font-size: 1.2rem;
  color: #8cd630;

  margin-top: 1rem;
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
