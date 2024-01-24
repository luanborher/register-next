/* eslint-disable operator-linebreak */
import Image from 'next/image';
import { useEffect, useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { TrashIcon, UserPlus, Edit3Icon } from 'lucide-react';

import Header from '@/components/Header/Header';
import TableComponent from '@/components/Table/Table';
import RootLayout from '@/components/RootLayout/Layout';
import InputText from '@/components/Input/Input';
import Modal from '@/components/Modal/Modal';
import ModalUsers from '@/components/ModalUsers/ModalUsers';
import ModalQuest from '@/components/ModalQuest/Modal';
import ModalUsersEdit from '@/components/ModalUsersEdit/ModalUsersEdit';

import { UserClass } from '@/interfaces/User';
import { handleError, handleSuccess } from '@/utils/message';
import api from '@/services/api';
import { useAuth } from '@/hooks/useAuth';

import { ActionsIcons, ButtonConfirm, Row } from './styles';

const IndexPage = () => {
  const { user } = useAuth();

  const [users, setUsers] = useState<UserClass[]>([]);
  const [usersDefault, setUsersDefault] = useState<UserClass[]>([]);
  const [search, setSearch] = useState<string>('');
  const [userInfo, setUser] = useState<UserClass>({} as UserClass);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalEdit, setShowModalEdit] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState<string | null>(null);

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

  const onDelete = async () => {
    try {
      await api.delete(`/user/${deleteInfo}`);

      handleSuccess('Deletado com sucesso!');
      setDeleteInfo(null);
      setShowModal(false);

      getUsers();
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    setUsers([]);

    if (search === '') {
      setUsers(usersDefault);
    } else {
      const filtered = usersDefault.filter(_user => {
        const name = _user.name.toLowerCase();
        return name.includes(search.toLowerCase());
      });

      setUsers(filtered);
    }
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
            value={search}
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
              <TableRow>
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

                <TableCell align="right" width={80} className="p-0">
                  <ActionsIcons>
                    {(user?.role === 'MASTER' ||
                      user?.role === 'DEVELOPER') && (
                      <>
                        <Edit3Icon
                          size={24}
                          style={{ cursor: 'pointer' }}
                          className="text-secondary self-end"
                          onClick={() => {
                            setUser(row);
                            setShowModalEdit(true);
                          }}
                        />

                        <TrashIcon
                          size={24}
                          style={{ cursor: 'pointer' }}
                          className="text-secondary self-end"
                          onClick={() => {
                            setDeleteInfo(row.id);
                            setShowModalDelete(true);
                          }}
                        />
                      </>
                    )}
                  </ActionsIcons>
                </TableCell>
              </TableRow>
            ))}
          </TableComponent>
        </div>

        {showModal && (
          <Modal>
            <ModalUsers
              onClose={() => setShowModal(false)}
              refetch={getUsers}
            />
          </Modal>
        )}

        {showModalEdit && userInfo?.id && (
          <Modal>
            <ModalUsersEdit
              onClose={() => {
                setUser({} as UserClass);
                setShowModal(false);
              }}
              refetch={getUsers}
              user={userInfo}
            />
          </Modal>
        )}

        {showModalDelete && deleteInfo && (
          <ModalQuest
            onClose={() => {
              setDeleteInfo(null);
              setShowModalDelete(false);
            }}
            onConfirm={onDelete}
          >
            Deseja deletar esse usuário?
          </ModalQuest>
        )}
      </main>
    </RootLayout>
  );
};

export default IndexPage;
