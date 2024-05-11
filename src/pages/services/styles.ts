import styled from 'styled-components';

export const TableComponent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  height: calc(100vh - 18rem);

  overflow-y: auto;
  padding-right: 0.5rem;

  color: black;
`;

export const TableCard = styled.div`
  position: relative;

  display: flex;
  flex-direction: row;

  width: 250px;
  padding: 1rem 0 1rem 1rem;

  border: ${({ theme }) => `1px solid ${theme.colors.graya1}`};
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 10px;

  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const TableCell = styled.div`
  position: relative;

  display: flex;
  flex-direction: row;
`;

export const SectionList = styled.div`
  display: flex;
  gap: 1rem;
`;

export const Check = styled.div`
  position: absolute;
  top: 6px;
  right: 12px;
  height: 12px;
  width: 12px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  color: black;

  margin-top: 2rem;
`;

export const ButtonConfirm = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  gap: 0.5rem;

  width: 180px;
  height: 40px;

  background-color: #8cd630;
  border: none;
  border-radius: 6px;

  color: #fff;
  font-weight: 500;
`;

export const Resume = styled.div`
  width: 100%;
  padding: 1rem;

  border: 2px solid #e4e4e4;
  border-radius: 8px;

  span {
    font-size: 1rem;
    font-weight: 600;
  }
`;

export const ExportRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  padding-bottom: 10px;
  color: #8cd630;
`;
