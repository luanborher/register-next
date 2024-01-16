import styled from 'styled-components';

export const Container = styled.html``;

export const MainContainer = styled.body`
  display: flex;
  height: 100vh;
`;

export const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
`;
