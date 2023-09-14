import { styled } from 'styled-components';

export const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;
  width: 100%;

  background-color: #f5f5f5;
`;

export const FormContainer = styled.form`
  max-width: 500px;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: #fff;
  padding: 3rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
`;

export const InputContainer = styled.div`
  width: 100%;
  margin-bottom: 1rem;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  label {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: #000;
  }

  input {
    width: 100%;
    height: 3rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    padding: 0 1rem;
    font-size: 1.5rem;
    color: #000;
  }

  input:focus {
    outline: none;
    border-color: #000;
  }

  input::placeholder {
    color: #ccc;
  }
`;

export const Button = styled.button`
  width: 100%;
  height: 3rem;
  border: none;
  border-radius: 0.5rem;
  background-color: #000;
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #333;
  }
`;
