import styled from 'styled-components';

export const PaginationNav = styled.nav`
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const PaginationUl = styled.ul`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  list-style: none;
`;

export const PaginationLi = styled.li`
  font-size: 0.75rem;
  font-weight: 400;
  color: #171717;
`;

export const PaginationPrev = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 0.375rem;
  height: 0.9375rem;
  transform: rotate(180);
  background-color: transparent;
  color: transparent;
  font-size: 0;
  border: none;
  cursor: pointer;

  svg {
    transform: rotate(180deg);
  }
`;

export const PaginationPageActual = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  font-size: 0.875rem;
  font-weight: 700;
  border-radius: 0.3125rem;
  background-color: #8cd630;
  color: #fff;
`;

export const PaginationPageLimit = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 1.5rem;
  height: 1.5rem;
  font-size: 0.875rem;
  font-weight: 700;
  border-radius: 0.3125rem;
  background-color: #bbe28a;
  color: #171717;
  padding: 0 0.2rem;

  cursor: pointer;
`;

export const PaginationNext = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 0.375rem;
  height: 0.9375rem;
  background-color: transparent;
  color: transparent;
  font-size: 0;
  border: none;
  cursor: pointer;
`;

export const TotalText = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: #020c3b;
  margin-left: 2rem;
`;
