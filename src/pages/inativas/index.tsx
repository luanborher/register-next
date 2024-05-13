import Header from '@/components/Header/Header';
import InativasDetails from '@/components/InativasDetails/InativasDetails';
import Modal from '@/components/Modals/Modal/Modal';
import RootLayout from '@/components/RootLayout/Layout';
import TableComponent from '@/components/Table/Table';
import { Inativas } from '@/interfaces/inativas';
import { getInativas } from '@/services/querys/inativas';
import { getUser } from '@/services/querys/user';
import { TableCell, TableRow } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const IndexPage = () => {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [clientSelected, setClientSelected] = useState<Inativas>(
    {} as Inativas,
  );

  const inativasParam = {
    status: 'REVIEW',
  };

  const { data: inativas } = useQuery({
    queryKey: ['inativasData', inativasParam],
    queryFn: async () => getInativas(inativasParam),
  });

  const { data: users } = useQuery({
    queryKey: ['usersData'],
    queryFn: async () => getUser(),
  });

  return (
    <RootLayout>
      <main className="flex flex-col gap-2 h-full">
        <Header title="Listagem de inativas" action />
        <div className="flex flex-col w-full max-h-full overflow-y-auto">
          <TableComponent
            headers={['Nome', 'PDE', 'Endereço', 'Agente', 'Status']}
          >
            {inativas?.map(inativa => (
              <TableRow
                onClick={() => {
                  setShowDetails(true);
                  setClientSelected(inativa);
                }}
              >
                <TableCell align="left" className="pl-1 flex flex-col">
                  <div className="text-black text-xs md:text-sm xxl:base font-semibold">
                    {inativa.InativasSent?.[0]?.name || '--'}
                  </div>
                </TableCell>
                <TableCell align="left" className="pl-1 flex flex-col">
                  <div className="text-black text-xs md:text-sm xxl:base font-semibold">
                    {inativa.pde || '--'}
                  </div>
                </TableCell>
                <TableCell align="left" className="pl-1 flex flex-col">
                  <div className="text-black text-xs md:text-sm xxl:base font-semibold">
                    {`${inativa.street}, ${inativa.number}${
                      inativa.complement !== 'undefined'
                        ? `, ${inativa.complement}`
                        : ''
                    }`}
                  </div>
                </TableCell>
                <TableCell align="left" className="pl-1 flex flex-col">
                  <div className="text-black text-xs md:text-sm xxl:base font-semibold">
                    {users?.find(
                      user => user.id === inativa?.InativasSent?.[0]?.user_id,
                    )?.name || ''}
                  </div>
                </TableCell>
                <TableCell align="left" className="pl-1 flex flex-col">
                  <div className="text-black text-xs md:text-sm xxl:base font-semibold">
                    {inativa.InativasSent?.[0]?.status === 'REVIEW'
                      ? 'Em análise'
                      : 'Pendente'}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableComponent>
        </div>
      </main>
      {showDetails && clientSelected && (
        <Modal>
          <InativasDetails
            client={clientSelected}
            onClose={() => setShowDetails(false)}
          />
        </Modal>
      )}
    </RootLayout>
  );
};

export default IndexPage;
