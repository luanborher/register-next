import styled from 'styled-components';

export const LabelButton = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: #fff;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 350px;
  height: 45px;
  padding: 1rem;
  gap: 1rem;
  color: #fff;
  background-color: #8cd630;
  border-radius: 8px;
  border: none;

  &:hover {
    background-color: #8cd630;
    opacity: 0.8;
  }
`;
