import styled from 'styled-components';

export const Image = styled.img`
  width: 500px;
  height: 350px;

  box-shadow: 1px 1px 4px 0px #b1b1b1;
  background-color: white;
  object-fit: contain;

  cursor: pointer;
`;

export const SignatureText = styled.p`
  font-size: 1.1rem;
  color: #8cd630;
  font-weight: 500;

  margin-top: 1rem;
  border-bottom: 1px solid #d8d8d8;
  margin-bottom: 1rem;
`;

export const NotSignatureText = styled.p`
  margin-bottom: 1rem;
  margin-top: 1rem;
  padding: 0.3rem;

  text-align: center;
  border: 1px solid #c91919e4;
  border-radius: 5px;

  font-size: 1.1rem;
  color: #c91919e4;
  font-weight: 500;
`;

export const SignatureWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
`;
