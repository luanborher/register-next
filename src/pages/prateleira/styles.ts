import styled from 'styled-components';

export const TableComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  height: calc(100vh - 23rem);
  overflow-y: auto;
  padding: 0.5rem 0;

  color: black;

  background-color: #fafafaff;
  border-radius: 8px;
  border: ${({ theme }) => `1px solid ${theme.colors.primary}`};

  @media (max-width: 755px) {
    height: 15rem;
    width: 100%;
    padding: 0.5rem;
  }
`;

export const TableHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

interface CardProps {
  active?: boolean;
}

export const TableCard = styled.div<CardProps>`
  position: relative;
  display: flex;
  flex-direction: row;
  min-width: 205px;
  padding: 0.8rem;
  border: ${({ theme, active }) =>
    active
      ? `2px solid ${theme.colors.primary}`
      : `1px solid ${theme.colors.graya1}`};
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 10px;
  cursor: pointer;
  user-select: none;
  background-color: ${({ active }) => (active ? '#8BD63011' : '#ffffff')};

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 900px) {
    padding: 0.8rem 0.5rem;
    min-width: 190px;
  }

  @media (max-width: 844px) {
    padding: 0.5rem;
    min-width: 177px;
  }

  @media (max-width: 798px) {
    padding: 0.3rem;
    min-width: 170px;
  }

  @media (max-width: 755px) {
    min-width: 100%;
    width: 95%;
    justify-content: space-between;
    padding: 0.5rem;
  }
`;

export const SelectedAllCard = styled.div`
  position: relative;

  display: flex;
  flex-direction: row;
  gap: 0.3rem;

  border-radius: 6px;

  font-size: 0.9rem;

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

  @media (max-width: 844px) {
    padding-left: 0.3rem;
  }
`;

export const CheckBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  text-align: left;
  width: 20px;
`;

export const SectionList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 2px solid #e2e2e2ff;

  @media (max-width: 1030px) {
    gap: 0.5rem;
  }

  @media (max-width: 755px) {
    flex-direction: column;
    overflow-y: auto;
    height: calc(100vh - 23rem);
    align-items: center;
    justify-content: flex-start;
    padding: 1.5rem 0;
    border-radius: 8px;
    border: ${({ theme }) => `1px solid ${theme.colors.primary}`};
    margin-top: 1rem;
  }
`;

export const Check = styled.div`
  position: absolute;
  top: 6.5px;
  right: 5px;
  height: 10px;
  width: 10px;
  border-radius: 1px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: black;
  min-width: 270px;

  @media (max-width: 1200px) {
    min-width: 250px;
  }

  @media (max-width: 1100px) {
    min-width: 225px;
  }

  @media (max-width: 874px) {
    min-width: 215px;
  }

  @media (max-width: 840px) {
    min-width: 200px;
  }

  @media (max-width: 790px) {
    min-width: 190px;
  }

  @media (max-width: 755px) {
    min-width: 96%;
  }
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
  justify-content: center;
  align-items: center;
  align-items: end;
  gap: 0.5rem;
  overflow-y: auto;
  padding-right: 0 0.5rem 0 2rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 2px solid #e2e2e2ff;
  color: black;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 1rem;
  color: #8cd630;

  @media (max-width: 940px) {
    gap: 0.5rem;
  }
`;

export const ExportRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
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

  height: 35px;

  padding: 0 1rem;
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

  height: 35px;

  padding: 0 1rem;
  border: 2px solid #8cd630;
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

export const FileCountBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 1rem;

  width: fit-content;
  padding: 0.35rem 0.8rem;

  border-radius: 12px;
  background-color: #8cd630;

  color: white;
  font-size: 0.9rem;
  font-weight: bold;
`;
