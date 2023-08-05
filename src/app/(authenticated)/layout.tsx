'use client';

import Image from 'next/image';

import 'styles/globals.css';

import { NavLink } from 'components/NavLink/NavLink';

import { Users, LogOut, BarChartBig } from 'lucide-react';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="h-screen flex">
        <div className="w-1/6 bg-neutral-900 px-8">
          <div className="w-full flex flex-col items-center">
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

          <NavLink icon={LogOut} text="Sair" href="/signin" />
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
