import styled from 'styled-components';

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #1f2420ea;
`;

export const ImageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

export const ThumbnailsWrapper = styled.div`
  width: 120px;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

export const Thumbnails = styled.img`
  width: 100%;
  height: 120px;

  background-color: white;
  object-fit: cover;

  transition: all 0.3s ease-in;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const Image = styled.img`
  width: 550px;
  height: auto;
  max-height: 80vh;

  box-shadow: 1px 1px 4px 0px #b1b1b1;
  background-color: white;
  object-fit: contain;

  cursor: pointer;
`;

export const CloseButton = styled.button`
  width: 100%;
  height: 40px;

  background-color: #c01414;
  border-radius: 8px;

  color: #ffffff;
  font-weight: 600;

  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  margin-top: 0.3rem;
`;

export const UploadButton = styled.label`
  width: 100%;
  height: 40px;

  background-color: #6cb117;
  border-radius: 8px;

  color: #ffffff;
  font-weight: 600;

  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;

  user-select: none;
  cursor: pointer;

  input {
    display: none;
  }
`;

export const ButtonsWrapper = styled.div`
  width: 120px;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  gap: 0.3rem;
`;

export const ActionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 2rem;
  padding-bottom: 10px;
  margin-top: 2rem;
  color: #8cd630;
`;

interface Props {
  cancel?: boolean;
}

export const Button = styled.button<Props>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 180px;
  height: 40px;
  background-color: ${({ cancel }) => (cancel ? 'transparent' : '#8cd630')};
  border: ${({ cancel }) => (cancel ? '2px solid #ff0000' : 'none')};
  border-radius: 6px;
  color: ${({ cancel }) => (cancel ? '#ff0000' : '#ffffff')};
  font-weight: 500;

  &:hover {
    background-color: ${({ cancel }) => (cancel ? '#FF000017' : '#8BD630D0')};
  }
`;

export const ImportWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;
