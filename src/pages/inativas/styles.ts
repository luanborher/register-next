import styled from 'styled-components';

export const Field = styled.div`
  color: black;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
`;

export const ExportRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 10px 0 0 0;
  color: #8cd630;
`;

export const ButtonImport = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
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
