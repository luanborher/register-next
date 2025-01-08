import styled from 'styled-components';

export const Files = styled.div`
  width: 793px;
`;

export const Main = styled.div`
  width: 793px;
  height: 1122px;
  padding: 1.5rem;
  display: block;
`;

export const Content = styled.div`
  width: 100%;
  height: 290px;
  border: 2px solid black;
  margin-bottom: 15px;
`;

export const Header = styled.div`
  width: 100%;
  height: 90px;
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

export const Info = styled.div`
  width: 100%;
  height: 95px;
`;

export const InfoRow = styled.div`
  width: 100%;
  height: 23.6px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding-left: 1rem;
  margin-bottom: -2px;
  flex-direction: row;
  font-size: 0.9rem;

  .row {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const Title = styled.div`
  display: flex;
  width: 100%;
  height: 25px;
  border-bottom: 2px solid black;
  font-size: 0.9rem;
  font-weight: 500;
  text-align: center;
  padding-left: 16px;
`;

export const Hidden = styled.div`
  display: none;
`;
