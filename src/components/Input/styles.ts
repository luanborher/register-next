import { styled } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  gap: 0.32rem;
`;

export const Input = styled.input`
  width: 100%;

  padding: 0.6rem 1rem;

  border: 2px solid #e4e4e4;
  border-radius: 8px;

  color: #818181;

  &:focus {
    outline: none;
  }
`;

export const Label = styled.label`
  font-size: 1rem;
  font-weight: 500;
  color: #3b3b3b;
`;
