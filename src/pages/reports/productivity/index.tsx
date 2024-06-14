/* eslint-disable prettier/prettier */
import { TableCell, TableRow } from '@mui/material';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import Header from '@/components/Header/Header';
import RootLayout from '@/components/RootLayout/Layout';
import TableComponent from '@/components/Table/Table';
import InputText from '@/components/Input/Input';
import ModalUserReports from '@/components/Modals/ModalUserReports/ModalUserReports';
import Modal from '@/components/Modals/Modal/Modal';
import { BookOpenCheck, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getUserReports } from '@/services/querys/cadastros';
import { Row } from './styles';
import { BackButton, BackText } from '../styles';

interface User {
  name: string;
  user_id: string;
}

const IndexPage = () => {
  const { push } = useRouter();

  const [showDetails, setShowDetails] = useState(false);
  const [userInfo, setUser] = useState<User>({} as User);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const userReportsParams = {
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
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
          action
        >
          <BackButton onClick={() => push('/reports')}>
            <ChevronLeft color="#a5a5a5" size={22} />
            <BackText>Fechar</BackText>
          </BackButton>
        </Header>

        <Row style={{ margin: '1rem 0' }}>
          <InputText
            type="date"
            style={{ maxWidth: '300px' }}
            width={300}
            value={format(startDate, 'yyyy-MM-dd')}
            onChange={e => setStartDate(new Date(e.target.value))}
          />
          <InputText
            type="date"
            style={{ maxWidth: '300px' }}
            width={300}
            value={format(endDate, 'yyyy-MM-dd')}
            onChange={e => setEndDate(new Date(e.target.value))}
          />
        </Row>

        <div className="flex flex-col w-full max-h-full overflow-y-auto">
          <TableComponent
            headers={[
              '',
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
                <TableCell align="left" width={60} className="p-0">
                  <BookOpenCheck className="text-secondary self-center" />
                </TableCell>
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
                  TOTAL
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
            startDate={startDate.toISOString() || ''}
            endDate={endDate.toISOString() || ''}
          />
        </Modal>
      )}
    </RootLayout>
  );
};

export default IndexPage;
