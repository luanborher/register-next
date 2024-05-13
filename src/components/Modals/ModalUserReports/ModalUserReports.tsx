import { ChevronLeft } from 'lucide-react';
import { TableCell, TableRow } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getUserDetails } from '@/services/querys/reportsUserData';

import Header from '../../Header/Header';
import TableComponent from '../../Table/Table';

import { BackButton, BackText, Wrapper } from './styles';

interface ClientsDetailsProps {
  user: { name: string; user_id: string };
  startDate: string;
  endDate: string;
  onClose: () => void;
}

const ModalUserReports = ({
  user,
  startDate,
  endDate,
  onClose,
}: ClientsDetailsProps) => {
  const userDetailsParams = {
    startDate,
    endDate,
    user_id: user.user_id,
  };

  const { data: userDetailsData } = useQuery({
    queryKey: ['userDetails', userDetailsParams],
    queryFn: () => getUserDetails(userDetailsParams),
    enabled: !!user,
  });

  return (
    <Wrapper>
      <Header title={user.name} action>
        <BackButton onClick={onClose}>
          <ChevronLeft color="#a5a5a5" size={22} />
          <BackText>Fechar</BackText>
        </BackButton>
      </Header>

      <div
        style={{ marginTop: '1rem' }}
        className="flex flex-col w-full max-h-full overflow-y-auto"
      >
        <TableComponent
          headers={[
            'Data de cadastro',
            'Cadastros normais',
            'Ausentes',
            'Vagos',
          ]}
        >
          {userDetailsData?.registersByDay.map(row => (
            <TableRow
              key={row.date}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              className="hover:opacity-80 cursor-pointer border-b-2 border-shadow hover:bg-shadow scroll"
            >
              <TableCell align="left" className="pl-1 flex flex-col">
                <div>{row.date}</div>
              </TableCell>
              <TableCell align="left" className="pl-1 flex flex-col">
                <div>{row.NORMAL || 0}</div>
              </TableCell>
              <TableCell align="left" className="pl-1 flex flex-col">
                <div>{row.AUSENTE || 0}</div>
              </TableCell>
              <TableCell align="left" className="pl-1 flex flex-col">
                <div>{row.VAGO || 0}</div>
              </TableCell>
            </TableRow>
          ))}
          <TableRow
            key="total_"
            sx={{ '&:last-child td, &:last-child th ': { border: 0 } }}
            className="hover:opacity-80 cursor-pointer border-b-2 border-shadow hover:bg-shadow scroll "
          >
            <TableCell align="left" className="pl-1 flex flex-col">
              <div className="text-primary">TOTAL</div>
            </TableCell>
            <TableCell align="left" className="pl-1 flex flex-col">
              <div className="text-primary">
                {userDetailsData?.registersByDay?.reduce(
                  (total, obg) => total + (obg.NORMAL || 0),
                  0,
                )}
              </div>
            </TableCell>
            <TableCell align="left" className="pl-1 flex flex-col">
              <div className="text-primary">
                {userDetailsData?.registersByDay?.reduce(
                  (total, obg) => total + (obg.AUSENTE || 0),
                  0,
                )}
              </div>
            </TableCell>
            <TableCell align="left" className="pl-1 flex flex-col">
              <div className="text-primary">
                {userDetailsData?.registersByDay?.reduce(
                  (total, obg) => total + (obg.VAGO || 0),
                  0,
                )}
              </div>
            </TableCell>
          </TableRow>
        </TableComponent>
      </div>
    </Wrapper>
  );
};

export default ModalUserReports;
