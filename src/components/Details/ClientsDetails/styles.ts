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
  overflow-x: hidden;

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
  font-size: 1.1rem;
  color: #8cd630;
  margin-top: 1rem;
  font-weight: 500;
  border-bottom: 1px solid #d8d8d8;
  margin-bottom: 1rem;
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
  border: none;
  cursor: pointer;
`;

export const BackText = styled.div`
  font-size: 1rem;
  color: #a5a5a5;
`;

export const TextArea = styled.textarea`
  width: 90%;
  height: 210px;
  resize: none;
  border: 2px solid #e4e4e4;
  border-radius: 8px;
  color: #000;
  padding: 0.5rem 1rem;
`;

const backgroundButton = {
  confirm: '#8cd630',
  deleted: '#e70a0a',
  validated: '#ffffff',
  pdf: '#ffffff',
  cancel: '#ffffff',
} as any;

const colorButton = {
  confirm: '#ffffff',
  deleted: '#ffffff',
  validated: '#8cd630',
  pdf: '#000000',
  cancel: '#e70a0a',
} as any;

const borderButton = {
  confirm: '2px solid #8cd630',
  deleted: '2px solid #e70a0a',
  validated: '2px solid #8cd630',
  pdf: '2px solid #000000',
  cancel: '2px solid #e70a0a',
} as any;

interface IButtonProps {
  relationship: 'confirm' | 'deleted' | 'validated' | 'pdf' | 'cancel';
}

export const Button = styled.button<IButtonProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 180px;
  height: 45px;
  padding: 0.5rem 1rem;
  background-color: ${props => backgroundButton[props.relationship]};
  border: ${props => borderButton[props.relationship]};
  border-radius: 8px;
  color: ${props => colorButton[props.relationship]};
  font-weight: 500;
`;

export const Hidden = styled.div`
  display: none;
`;
