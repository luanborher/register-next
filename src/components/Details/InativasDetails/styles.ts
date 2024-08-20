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

export const ButtonValidated = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 180px;
  height: 45px;
  padding: 0.5rem 1rem;
  background-color: #8cd630;
  border: 2px solid #8cd630;
  border-radius: 8px;
  color: #ffffff;
  font-weight: 500;
`;

export const ButtonCancel = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 180px;
  height: 45px;
  padding: 0.5rem 1rem;
  background-color: #fff;
  border: 2px solid #e70a0a;
  border-radius: 8px;
  color: #e70a0a;
  font-weight: bold;
`;

export const ButtonDeletar = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 180px;
  height: 45px;
  padding: 0.5rem 1rem;
  background-color: #e70a0a;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-weight: bold;
`;

export const ButtonDownload = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 180px;
  height: 45px;
  padding: 0.5rem 1rem;
  background-color: #fff;
  border: 2px solid #d6aa30;
  border-radius: 8px;
  color: #d6aa30;
  font-weight: 500;
`;

export const ButtonUpdate = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 180px;
  height: 45px;
  padding: 0.5rem 1rem;
  background-color: #fff;
  border: 2px solid #8cd630;
  border-radius: 8px;
  color: #8cd630;
  font-weight: 500;
`;

export const Image = styled.img`
  width: 320px;
  height: 350px;
  box-shadow: 1px 1px 4px 0px #b1b1b1;
  object-fit: contain;
  cursor: pointer;
`;

export const Hidden = styled.div`
  display: none;
`;
