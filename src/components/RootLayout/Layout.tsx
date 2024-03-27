/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/function-component-definition */
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Users, LogOut, User, Map, FileHeart } from 'lucide-react';

import { useAuth } from '@/hooks/useAuth';

import NavLink from '../Navbar/NavLink/NavLink';
import Title from '../Navbar/Title/Title';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

import { Container, MainContainer, NameContainer } from './styles';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { push } = useRouter();
  const { user } = useAuth();

  const signOut = () => {
    localStorage.removeItem('@register:accessToken');
    localStorage.removeItem('@register:user');

    push('/');
  };

  return (
    <PrivateRoute>
      <Container>
        <MainContainer>
          <div className="w-1/6 flex flex-col bg-secondary md:px-4 xl:px-6 px-2 pb-8 justify-between">
            <div className="w-full flex flex-col">
              <div className="flex items-center gap-2 mt-8 font-medium pb-4">
                <Image
                  src="https://ui-avatars.com/api/?name=R&background=8cd630&color=000&font-size=0.6"
                  alt="User"
                  width={30}
                  height={30}
                  className="rounded-full ml-4"
                />
                REGISTER
              </div>

              <Title text="MENU PRINCIPAL" />

              {/* <NavLink icon={BarChartBig} text="Dashboard" href="/home" /> */}
              <NavLink icon={Users} text="Cadastros" href="/records" />

              <Title text="CONFIGURAÇÕES" margin />

              <NavLink icon={User} text="Usuários" href="/users" />
              <NavLink icon={Map} text="Contratos" href="/address" />
              <NavLink icon={FileHeart} text="Relatórios" href="/reports" />
              {/* <NavLink icon={Settings} text="Geral" href="/general" /> */}
            </div>

            <div className="w-full bg-gray px-4 xxl:px-6 py-5 rounded-large flex">
              <div className="flex flex-col w-full">
                <div className="flex flex-row items-center justify-between">
                  <NameContainer>
                    <span className="text-white text-xxs md:text-xs xxl:text-sm font-medium">
                      Olá, <span className="text-primary">{user.name}</span>
                    </span>
                  </NameContainer>

                  <div
                    className="flex justify-center items-center w-[24px] h-[24px] xxl:w-[30px] xxl:h-[30px] bg-primary rounded-extra cursor-pointer hover:bg-primaryLight"
                    onClick={signOut}
                  >
                    <LogOut className="text-secondary w-[14px] h-[14px] xxl:w-[18px] xxl:h-[18px]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <main className="w-5/6 bg-secondary">
            <div className="w-full h-full bg-white rounded-large p-10">
              {children}
            </div>
          </main>
        </MainContainer>
      </Container>
    </PrivateRoute>
  );
}
