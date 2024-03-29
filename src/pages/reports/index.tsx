/* eslint-disable prettier/prettier */
import { TableCell, TableRow } from '@mui/material';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

import Header from '@/components/Header/Header';
import RootLayout from '@/components/RootLayout/Layout';
import TableComponent from '@/components/Table/Table';
import InputText from '@/components/Input/Input';

import { getUserReports } from '@/services/querys/reportsUserData';

import ModalUserReports from '@/components/ModalUserReports/ModalUserReports';
import Modal from '@/components/Modal/Modal';
import { Row } from './styles';

interface User {
  name: string;
  user_id: string;
}

const IndexPage = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [userInfo, setUser] = useState<User>({} as User);
  const [search, setSearch] = useState(new Date());

  const userReportsParams = {
    date: search.toISOString(),
  };

  const { data: usersReportsData } = useQuery({
    queryKey: ['userReports', userReportsParams],
    queryFn: () => getUserReports(userReportsParams),
  });

  return (
    <RootLayout>
      <main className="flex flex-col gap-2 h-full">
        <Header
          title="Relatório de produtividade"
          subtitle="Contagem de cadastros realizados"
        />

        <Row style={{ margin: '1rem 0' }}>
          <InputText
            type="date"
            style={{ maxWidth: '300px' }}
            width={300}
            value={format(search, 'yyyy-MM-dd')}
            onChange={e => setSearch(new Date(e.target.value))}
          />
        </Row>

        <div className="flex flex-col w-full max-h-full overflow-y-auto">
          <TableComponent
            headers={[
              'Funcionário',
              'Cadastros',
              'Ausentes',
              'Vagos',
              'Total',
              '% Cadastros',
              '% Ausentes ',
              '% Vagos',
              'Dias trabalhados',
              'Média por dia',
            ]}
          >
            {usersReportsData?.map(user => (
              <TableRow
                key={user.user_id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                className="hover:opacity-80 cursor-pointer border-b-2 border-shadow hover:bg-shadow scroll"
                onClick={() => {
                  setShowDetails(true);
                  setUser({
                    name: user.user,
                    user_id: user.user_id,
                  });
                }}
              >
                <TableCell align="left" className="p-0">
                  <div className="text-black text-xs md:text-sm xxl:base font-semibold">
                    {user.user}
                  </div>
                </TableCell>
                <TableCell align="left" className="pl-1 flex flex-col">
                  <div className="text-black text-xs md:text-sm xxl:base font-semibold">
                    {user.registers}
                  </div>
                </TableCell>
                <TableCell align="left" className="pl-1 flex flex-col">
                  <div className="text-black text-xs md:text-sm xxl:base font-semibold">
                    {user.ausente}
                  </div>
                </TableCell>
                <TableCell align="left" className="pl-1 flex flex-col">
                  <div className="text-black text-xs md:text-sm xxl:base font-semibold">
                    {user.vago}
                  </div>
                </TableCell>
                <TableCell align="left" className="pl-1 flex flex-col">
                  <div className="text-black text-xs md:text-sm xxl:base font-semibold">
                    {user.total}
                  </div>
                </TableCell>
                <TableCell align="left" className="pl-1 flex flex-col">
                  <div className="text-black text-xs md:text-sm xxl:base font-semibold">
                    {Math.round(user.registerPercentage)}%
                  </div>
                </TableCell>
                <TableCell align="left" className="pl-1 flex flex-col">
                  <div className="text-black text-xs md:text-sm xxl:base font-semibold">
                    {Math.round(user.ausentePercentage)}%
                  </div>
                </TableCell>
                <TableCell align="left" className="pl-1 flex flex-col">
                  <div className="text-black text-xs md:text-sm xxl:base font-semibold">
                    {Math.round(user.vagoPercentage)}%
                  </div>
                </TableCell>
                <TableCell align="left" className="pl-1 flex flex-col">
                  <div className="text-black text-xs md:text-sm xxl:base font-semibold">
                    {user.daysWorked}
                  </div>
                </TableCell>
                <TableCell align="left" className="pl-1 flex flex-col">
                  <div className="text-black text-xs md:text-sm xxl:base font-semibold">
                    {user.registersPerDay.toFixed(2)}
                  </div>
                </TableCell>
              </TableRow>
            ))}
            <TableRow
              key="total_"
              sx={{ '&:last-child td, &:last-child th ': { border: 0 } }}
              className="hover:opacity-80 cursor-pointer border-b-2 border-shadow hover:bg-shadow scroll "
            >
              <TableCell align="left" className="p-0">
                <div className="text-primary text-xs md:text-sm xxl:base font-semibold">
                  Total
                </div>
              </TableCell>
              <TableCell align="left" className="pl-1 flex flex-col">
                <div className="text-primary text-xs md:text-sm xxl:base font-semibold">
                  {usersReportsData?.reduce((total, obg) => total + obg.registers, 0)}
                </div>
              </TableCell>
              <TableCell align="left" className="pl-1 flex flex-col">
                <div className="text-primary text-xs md:text-sm xxl:base font-semibold">
                  {usersReportsData?.reduce((total, obg) => total + obg.ausente, 0)}
                </div>
              </TableCell>
              <TableCell align="left" className="pl-1 flex flex-col">
                <div className="text-primary text-xs md:text-sm xxl:base font-semibold">
                  {usersReportsData?.reduce((total, obg) => total + obg.vago, 0)}
                </div>
              </TableCell>
              <TableCell align="left" className="pl-1 flex flex-col">
                <div className="text-primary text-xs md:text-sm xxl:base font-semibold">
                  {usersReportsData?.reduce((total, obg) => total + obg.total, 0)}
                </div>
              </TableCell>
              <TableCell align="left" className="pl-1 flex flex-col">
                <div className="text-primary text-xs md:text-sm xxl:base font-semibold">
                  %
                </div>
              </TableCell>
              <TableCell align="left" className="pl-1 flex flex-col">
                <div className="text-primary text-xs md:text-sm xxl:base font-semibold">
                  %
                </div>
              </TableCell>
              <TableCell align="left" className="pl-1 flex flex-col">
                <div className="text-primary text-xs md:text-sm xxl:base font-semibold">
                  %
                </div>
              </TableCell>
              <TableCell align="left" className="pl-1 flex flex-col">
                <div className="text-primary text-xs md:text-sm xxl:base font-semibold">
                  {usersReportsData?.reduce((total, obg) => total + obg.daysWorked, 0)}
                </div>
              </TableCell>
              <TableCell align="left" className="pl-1 flex flex-col">
                <div className="text-primary text-xs md:text-sm xxl:base font-semibold">
                  %
                </div>
              </TableCell>
            </TableRow>
          </TableComponent>
        </div>
      </main>

      {showDetails && (
        <Modal>
          <ModalUserReports
            onClose={() => setShowDetails(false)}
            user={userInfo}
            date={search.toISOString() || ''}
          />
        </Modal>
      )}
    </RootLayout>
  );
};

export default IndexPage;
