import { styled } from 'styled-components';

export const MainContainer = styled.div`
  position: relative;
  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;
  width: 100%;

  background-image: url('/assets/paisagem.jpg');
  background-size: cover;
  background-repeat: no-repeat;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 255, 0.12);
    pointer-events: none;
  }
`;

export const FormContainer = styled.form`
  position: absolute;
  z-index: 9999;
  top: calc(50% - 325px);
  left: calc(50% - 250px);

  max-width: 500px;
  width: 100%;

  height: 650px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  background-color: #00000083;
  padding: 3.5rem 4rem;
  border-radius: 0.3rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
`;

export const InputColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  width: 100%;
`;

export const InputContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  label {
    font-size: 1rem;
    color: #ffffffb4;
  }

  input {
    width: 100%;
    height: 3rem;
    border-bottom: 1px solid #ccc;
    border-radius: 0.2rem;
    padding: 0 1rem;
    font-size: 1rem;
    font-weight: 500;
    color: #ffffffd0;
    background-color: transparent;
  }

  input:focus {
    outline: none;
    border-color: #fff;
  }

  input::placeholder {
    color: #ccc;
  }
`;

export const Button = styled.button`
  width: 100%;
  height: 3rem;
  border: none;
  border-radius: 0.3rem;
  background-color: #8cd630;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #333;
  }
`;

export const Label = styled.label``;
