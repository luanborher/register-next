/* eslint-disable no-unused-vars */
import Image from 'next/image';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { MoreHorizontal } from 'lucide-react';

import Header from '@/components/Header/Header';
import TableComponent from '@/components/Table/Table';
import RootLayout from '@/components/RootLayout/Layout';

export enum Roles {
  ADMIN = 'ADMIN',
  REGISTER = 'REGISTER',
  DEVELOPER = 'DEVELOPER',
  MASTER = 'MASTER',
}

function createData(name: string, role: Roles, email: string) {
  return { name, role, email };
}

const rows = [
  createData('Administrador ADM', Roles.ADMIN, 'administrador@gmail.com'),
  createData('Caio Augusto', Roles.REGISTER, 'cacacaio@gmail.com'),
  createData('Luan Viana', Roles.DEVELOPER, 'luan.borher@gmail.com'),
  createData('Kelvin Mendes', Roles.MASTER, 'reidelas@gmail.com'),
  createData('Caio Augusto', Roles.REGISTER, 'cacacaio@gmail.com'),
  createData('Caio Augusto', Roles.REGISTER, 'cacacaio@gmail.com'),
  createData('Caio Augusto', Roles.REGISTER, 'cacacaio@gmail.com'),
  createData('Caio Augusto', Roles.REGISTER, 'cacacaio@gmail.com'),
  createData('Juliana Maita', Roles.DEVELOPER, 'marialiceog2003@gmail.com'),
];

const IndexPage = () => {
  const renderColors = (role: Roles) => {
    const colors = {
      ADMIN: 'bg-role-1',
      REGISTER: 'bg-role-3',
      MASTER: 'bg-role-5',
      DEVELOPER: 'bg-role-7',
    } as const;

    return colors[role];
  };

  const renderFontColors = (role: Roles) => {
    const colors = {
      ADMIN: 'text-role-2',
      REGISTER: 'text-role-4',
      MASTER: 'text-role-6',
      DEVELOPER: 'text-role-8',
    } as const;

    return colors[role];
  };

  return (
    <RootLayout>
      <main className="flex flex-col gap-2 h-full">
        <Header
          title="Usuários"
          subtitle="Gerencie e adicione novos acessos de usuários"
          action
        />

        <div className="flex flex-col w-full max-h-full overflow-y-auto">
          <TableComponent>
            {rows.map(row => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                className="hover:opacity-80 cursor-pointer border-b-2 border-shadow hover:bg-shadow scroll"
              >
                <TableCell align="left" width={60} className="p-0">
                  <Image
                    src={`https://ui-avatars.com/api/?name=${row.name}`}
                    alt="User"
                    width={45}
                    height={45}
                    className="rounded-full ml-2"
                  />
                </TableCell>

                <TableCell align="left" className="pl-1 flex flex-col">
                  <div className="text-black text-xs md:text-sm xxl:base font-semibold">
                    {row.name}
                    <span
                      className={`${renderColors(row.role)} ${renderFontColors(
                        row.role,
                      )} text-xxs font-normal py-0.5 rounded-md px-1 ml-1`}
                    >
                      {row.role}
                    </span>
                  </div>

                  <div className="text-black text-xxs md:text-xs xxl:text-sm font-normal">
                    {row.email}
                  </div>
                </TableCell>
                <TableCell align="right" width={40} className="p-0">
                  <MoreHorizontal
                    size={24}
                    className="text-secondary self-end"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableComponent>
        </div>
      </main>
    </RootLayout>
  );
};

export default IndexPage;
