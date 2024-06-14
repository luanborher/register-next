import styled from 'styled-components';

export const Field = styled.div`
  color: black;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
`;

export const ExportSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  color: #8cd630;
  margin-top: 1rem;
`;

export const ButtonImport = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem 1rem;
  border: 2px solid #8cd630;
  border-radius: 8px;
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
