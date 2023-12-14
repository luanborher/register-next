import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0.8;
    left: 35%;
  }
  to {
    opacity: 1;
    left: 16.666%;
  }
`;

export const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 16.666%;
  z-index: 999;

  background-color: #fff;
  border-radius: 36px;
  padding: 2rem;
  box-shadow: 0 0 60px rgba(0, 0, 0, 0.05);

  animation: ${fadeIn} 0.6s;
`;
