import styled from 'styled-components';

export const TableComponent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: calc(100vh - 21rem);
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
  user-select: none;

  &:hover {
    opacity: 0.8;
  }
`;

export const SelectedAllCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 250px;
  padding: 0.5rem 1rem;
  border: ${({ theme }) => `1px solid ${theme.colors.primary}`};
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 10px;
  cursor: pointer;
  user-select: none;

  &:hover {
    opacity: 0.8;
  }
`;

export const TableCell = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  text-align: left;
`;

export const Quantity = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  text-align: left;
  padding-left: 1rem;
`;

export const CheckBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  text-align: left;
  width: 30px;
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

interface Props {
  cancel?: boolean;
}

export const ButtonConfirm = styled.button<Props>`
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

export const ActionSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: end;
  gap: 0.5rem;
  height: calc(100vh - 18rem);
  overflow-y: auto;
  padding-right: 0 0.5rem 0 2rem;
  margin-top: 4rem;
  color: black;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 1rem;
  color: #8cd630;
`;

export const ExportRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
`;

export const ImportRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 2rem;
  padding-bottom: 10px;
  margin-top: 2rem;
  color: #8cd630;
`;

export const Hidden = styled.div`
  display: none;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: row;
  color: black;
  font-size: 0.8rem;

  strong {
    font-weight: 500;
    margin-right: 4px;
  }
`;

export const SendButton = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem 1rem;
  border: 1px solid #8cd630;
  border-radius: 6px;
  font-weight: 600;
  background-color: #8cd630;
  color: white;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const ButtonImport = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem 1rem;
  border: 1px solid #8cd630;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;

  .icon {
    color: #8cd630;
    size: 22px;
    cursor: pointer;
  }

  &:hover {
    background-color: #eeeeee;
  }

  input {
    display: none;
  }
`;
