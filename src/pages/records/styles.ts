import styled from 'styled-components';

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-height: 100%;

  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: white;
  }

  &::-webkit-scrollbar-thumb {
    background: #8cd630;
  }
`;

export const ContainerPagination = styled.div`
  width: 100%;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: black;
  padding: 0 2rem;

  span {
    font-weight: 600;
    color: #5c8826;
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

export const ExportRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
`;

export const ExportSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  color: #8cd630;
`;

export const Field = styled.div`
  color: black;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
`;

export const LabelButton = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: #fff;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 175px;
  padding: 0.3rem 1rem;
  gap: 0.5rem;
  color: #fff;
  background-color: #8cd630;
  border-radius: 8px;
  border: none;

  &:hover {
    background-color: #8cd630;
    opacity: 0.8;
  }
`;
