'use client';

import 'styles/globals.css';

import Image from 'next/image';
import Link from 'next/link';

import { NavLink } from 'components/NavLink/NavLink';

import { Users, LogOut, BarChartBig, Map, User, Settings } from 'lucide-react';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="h-screen flex">
        <div className="w-1/6 flex flex-col bg-neutral-900 px-8 pb-8 justify-between">
          <div className="w-full flex flex-col">
            <div className="flex items-center justify-center mt-6">
              <Image
                src="/assets/logo-2.png"
                alt="Logo"
                width={210}
                height={100}
                placeholder="blur"
                blurDataURL="/assets/logo-2.png"
              />
            </div>

            <div className="flex flex-col w-full mt-8">
              <div className="flex w-full px-4">
                <span className="text-white text-sm font-medium">
                  MENU PRINCIPAL
                </span>
              </div>
            </div>

            <NavLink icon={BarChartBig} text="Dashboard" href="/" />
            <NavLink icon={Users} text="Cadastros" href="/records" />

            <div className="flex flex-col w-full mt-8">
              <div className="flex w-full px-4">
                <span className="text-white text-sm font-medium">
                  CONFIGURAÇÕES
                </span>
              </div>
            </div>

            <NavLink icon={User} text="Usuários" href="/users" />
            <NavLink icon={Map} text="Contrato" href="/address" />
            <NavLink icon={Settings} text="Geral" href="/general" />
          </div>

          <div className="w-full bg-neutral-700 px-10 py-5 rounded-large flex">
            <div className="flex flex-col w-full">
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-white text-sm font-medium">
                    Olá, <span className="text-teal-400">Administrador</span>
                  </span>
                </div>

                <Link href="/signin">
                  <div className="flex justify-center items-center w-[30px] h-[30px] bg-teal-400 rounded-extra cursor-pointer hover:bg-teal-500">
                    <LogOut color="#171717" size={18} />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <main className="w-5/6 bg-neutral-900">
          <div className="w-full h-full bg-white rounded-extra p-10">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
