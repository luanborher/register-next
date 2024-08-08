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

export const ButtonOutlined = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem 1rem;
  border: 2px solid #8cd630;
  border-radius: 8px;
  font-weight: 600;
  color: #f5f5f5;
  cursor: pointer;
  background-color: #7fd11bc2;

  .icon {
    color: #f5f5f5;
    size: 22px;
    cursor: pointer;
  }

  &:hover {
    opacity: 0.8;
  }

  input {
    display: none;
  }
`;

export const RowButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Hidden = styled.div`
  display: none;
`;
