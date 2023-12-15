/* eslint-disable no-unused-vars */
import Image from 'next/image';
import { useEffect, useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { TrashIcon, UserPlus } from 'lucide-react';

import Header from '@/components/Header/Header';
import TableComponent from '@/components/Table/Table';
import RootLayout from '@/components/RootLayout/Layout';

import { UserClass } from '@/interfaces/User';
import api from '@/services/api';
import { handleError } from '@/utils/message';
import InputText from '@/components/Input/Input';
import Modal from '@/components/Modal/Modal';
import ModalUsers from '@/components/ModalUsers/ModalUsers';
import { ButtonConfirm, Row } from './styles';

const IndexPage = () => {
  const [users, setUsers] = useState<UserClass[]>([]);
  const [usersDefault, setUsersDefault] = useState<UserClass[]>([]);
  const [search, setSearch] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);

  const getUsers = async () => {
    try {
      const { data } = await api.get<UserClass[]>('/user');

      setUsers(data);
      setUsersDefault(data);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    const filtered = usersDefault.filter(user => {
      const name = user.name.toLowerCase();

      return name.includes(search.toLowerCase());
    });

    setUsers(filtered);
  }, [search]);

  const renderColors = (role: string) => {
    const colors = {
      ADMIN: 'bg-role-1',
      REGISTER: 'bg-role-3',
      MASTER: 'bg-role-5',
      DEVELOPER: 'bg-role-7',
    } as any;

    return colors[role || 'REGISTER'];
  };

  const renderFontColors = (role: string) => {
    const colors = {
      ADMIN: 'text-role-2',
      REGISTER: 'text-role-4',
      MASTER: 'text-role-6',
      DEVELOPER: 'text-role-8',
    } as any;

    return colors[role || 'REGISTER'];
  };

  return (
    <RootLayout>
      <main className="flex flex-col gap-2 h-full">
        <Header
          title="Usuários"
          subtitle="Gerencie e adicione novos acessos de usuários"
          action
        />

        <Row style={{ marginTop: '1rem' }}>
          <InputText
            placeholder="Pesquisa por nome"
            onChange={e => setSearch(e.target.value)}
          />
        </Row>

        <Row
          style={{
            marginTop: '0.5rem',
            marginBottom: '1rem',
            justifyContent: 'flex-end',
          }}
        >
          <ButtonConfirm onClick={() => setShowModal(true)}>
            <UserPlus />
            Adicionar
          </ButtonConfirm>
        </Row>

        <div className="flex flex-col w-full max-h-full overflow-y-auto">
          <TableComponent>
            {users.map(row => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                className="hover:opacity-80 cursor-pointer border-b-2 border-shadow hover:bg-shadow scroll"
              >
                <TableCell align="left" width={60} className="p-0">
                  <Image
                    src="https://ui-avatars.com/api/?name=register"
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
                    {row.login}
                  </div>
                </TableCell>
                <TableCell align="right" width={40} className="p-0">
                  <TrashIcon size={24} className="text-secondary self-end" />
                </TableCell>
              </TableRow>
            ))}
          </TableComponent>
        </div>

        {showModal && (
          <Modal>
            <ModalUsers onClose={() => setShowModal(false)} />
          </Modal>
        )}
      </main>
    </RootLayout>
  );
};

export default IndexPage;
