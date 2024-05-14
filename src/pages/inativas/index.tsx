import Header from '@/components/Header/Header';
import InativasDetails from '@/components/InativasDetails/InativasDetails';
import Modal from '@/components/Modals/Modal/Modal';
import RootLayout from '@/components/RootLayout/Layout';
import Select from '@/components/Select/Select';
import TableComponent from '@/components/Table/Table';
import { Inativas } from '@/interfaces/inativas';
import { getInativas } from '@/services/querys/inativas';
import { getUser } from '@/services/querys/user';
import { TableCell, TableRow } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

interface Option {
  value: string;
  label: string;
}

const IndexPage = () => {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [status, setStatus] = useState<Option>({
    label: 'Em análise',
    value: 'REVIEW',
  });
  const [clientSelected, setClientSelected] = useState<Inativas>(
    {} as Inativas,
  );

  const inativasParam = {
    status: status.value,
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

        <div className="w-full flex flex-row gap-4">
          <Select
            id="status"
            placeholder="Status"
            onChange={e => e && setStatus(e)}
            options={[
              { value: 'REVIEW', label: 'Em análise' },
              { value: 'SENT', label: 'Pendente' },
            ]}
          />
        </div>

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
                    {inativa.InativasSent?.[0]?.name?.toLowerCase() || '--'}
                  </div>
                </TableCell>
                <TableCell align="left" className="pl-1 flex flex-col">
                  <div className="text-black text-xs md:text-sm xxl:base font-semibold">
                    {inativa.pde || '--'}
                  </div>
                </TableCell>
                <TableCell align="left" className="pl-1 flex flex-col">
                  <div className="text-black text-xs md:text-sm xxl:base font-semibold">
                    {`${inativa.street?.toLowerCase()}, ${inativa.number?.toLowerCase()}${
                      inativa.complement !== 'undefined'
                        ? `, ${inativa.complement?.toLowerCase()}`
                        : ''
                    }`}
                  </div>
                </TableCell>
                <TableCell align="left" className="pl-1 flex flex-col">
                  <div className="text-black text-xs md:text-sm xxl:base font-semibold">
                    {users
                      ?.find(u => u.id === inativa?.InativasSent?.[0]?.user_id)
                      ?.name?.toLowerCase() || ''}
                  </div>
                </TableCell>
                <TableCell align="left" className="pl-1 flex flex-col">
                  <div className="text-black text-xs md:text-sm xxl:base font-semibold">
                    {inativa.InativasSent?.[0]?.status === 'REVIEW'
                      ? 'EM ANÁLISE'
                      : 'PENDENTE'}
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
