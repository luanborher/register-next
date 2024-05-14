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
  justify-content: center;
`;

export const ButtonImport = styled.label`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.3rem 1rem;
  border: 1px solid #8cd630;
  border-radius: 6px;
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

export const ExportRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  padding-bottom: 10px;
  color: #8cd630;
`;

export const Field = styled.div`
  color: black;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
`;
