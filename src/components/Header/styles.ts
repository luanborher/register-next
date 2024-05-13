import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
  border: none;
`;

export const Title = styled.span`
  color: black;
  font-size: 1rem;
  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
  @media (min-width: 1280px) {
    font-size: 1.5rem;
  }
  font-weight: 700;
`;

export const Subtitle = styled.span`
  color: black;
  font-size: 0.75rem;
  @media (min-width: 768px) {
    font-size: 0.875rem;
  }
  @media (min-width: 1280px) {
    font-size: 1rem;
  }
  font-weight: medium;
`;

export const Id = styled.span`
  color: black;
  font-size: 0.75rem;
  @media (min-width: 768px) {
    font-size: 0.875rem;
  }
  @media (min-width: 1280px) {
    font-size: 1rem;
  }
  font-weight: medium;
`;

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 400px;
  border: none;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

export const ProfileItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background-color: #f0f0f0;
  border-radius: 50%;
  color: black;
  cursor: pointer;
  &:hover {
    background-color: #333333;
    color: white;
  }
`;

export const ProfileImage = styled.img`
  border-radius: 50%;
  margin-left: 0.5rem;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  height: 45px;
  width: 45px;
`;

export const ProfileText = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProfileName = styled.span`
  color: black;
  font-size: 0.75rem;
  @media (min-width: 768px) {
    font-size: 0.875rem;
  }
  @media (min-width: 1280px) {
    font-size: 1rem;
  }
  font-weight: medium;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

export const ProfileEmail = styled.span`
  color: black;
  font-size: 0.625rem;
  @media (min-width: 768px) {
    font-size: 0.75rem;
  }
  @media (min-width: 1280px) {
    font-size: 0.875rem;
  }
  font-weight: normal;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

export const ActionContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 400px;
  border: none;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
`;
