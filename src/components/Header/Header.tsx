import React from 'react';

import { Moon, Bell } from 'lucide-react';
import {
  ActionContainer,
  Container,
  Id,
  InfoContainer,
  ProfileContainer,
  ProfileEmail,
  ProfileImage,
  ProfileItem,
  ProfileName,
  ProfileText,
  Subtitle,
  Title,
} from './styles';

interface HeaderProps {
  profile?: boolean;
  title: string;
  subtitle?: string;
  id?: string;
  action?: boolean;
  children?: React.ReactNode;
}

const Header = ({
  profile,
  title,
  id,
  subtitle,
  action,
  children,
}: HeaderProps) => (
  <Container>
    <InfoContainer>
      <Title>{title}</Title>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
      {id && <Id>{id}</Id>}
    </InfoContainer>

    {profile && (
      <ProfileContainer>
        <ProfileItem>
          <Moon width="15px" height="15px" />
        </ProfileItem>
        <ProfileItem>
          <Bell width="15px" height="15px" />
        </ProfileItem>
        <ProfileImage src="/assets/no-user.jpg" alt="User" />
        <ProfileText>
          <ProfileName>Administrador</ProfileName>
          <ProfileEmail>administrador@gmail.com</ProfileEmail>
        </ProfileText>
      </ProfileContainer>
    )}

    {action && <ActionContainer>{children}</ActionContainer>}
  </Container>
);

export default Header;
