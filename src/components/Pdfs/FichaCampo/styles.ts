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

export const Info = styled.div`
  width: 100%;
  height: 95px;
  border-bottom: 2px solid black;
`;

export const InfoRow = styled.div`
  width: 100%;
  height: 23.6px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding-left: 1rem;
  margin-bottom: -2px;

  .row {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
`;

export const Title = styled.div`
  width: 100%;
  height: 25px;
  border-bottom: 2px solid black;
  font-size: 0.9rem;
  font-weight: 500;
  text-align: center;
`;

export const Terms = styled.div`
  width: 100%;
  height: 100px;
  font-size: 0.7rem;
  text-align: center;
  padding: 0.45rem 1rem;
`;

export const Footer = styled.div`
  width: 100%;
  height: 230px;
  border: 2px solid black;
  margin-bottom: 10px;
`;

export const Materiais = styled.div`
  width: 100%;
  height: 19px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Item = styled.div`
  width: 100%;
  height: 100%;
  font-size: 0.9rem;
  padding: 0 1rem;
  display: flex;
  align-items: flex-start;
`;

export const Describe = styled.div`
  width: 100%;
  height: 32.6px;
  display: flex;
  flex-direction: row;
`;

export const DescribeRow = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: end;
  padding: 0 1rem;
  font-size: 0.9rem;
  border-bottom: 1px solid black;
`;

export const DescribeColumn = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: end;
  border-left: 1px solid black;
  align-items: start;
  text-align: center;
  font-style: italic;
  color: #535353;
  font-size: 0.8rem;
  justify-content: center;
`;
