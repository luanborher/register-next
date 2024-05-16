import styled from 'styled-components';

export const Files = styled.div`
  width: 793px;
`;

export const Main = styled.div`
  width: 100%;
  height: 1122px;
  padding: 1.5rem;
  display: block;
`;

export const Content = styled.div`
  width: 100%;
  height: 290px;
  border: 2px solid black;
  margin-bottom: 10px;
`;

export const Header = styled.div`
  width: 100%;
  height: 70px;
  border-bottom: 2px solid black;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  gap: 2rem;

  div {
    text-align: center;
    font-size: 1rem;
    font-weight: 500;
  }
`;

export const Logo = styled.img`
  object-fit: contain;
  height: 55px;
  width: 100px;
`;

export const Footer = styled.div`
  width: 100%;
  height: 230px;
  border: 2px solid black;
  margin-bottom: 10px;
`;
