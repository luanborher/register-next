/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
import Header from '@/components/Header/Header';
import InativasDetails from '@/components/Details/InativasDetails/InativasDetails';
import InputText from '@/components/Input/Input';
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
import { Field } from './styles';

interface Option {
  value: string;
  label: string;
}

const option = {
  label: 'Em análise',
  value: 'REVIEW',
} as Option;

const IndexPage = () => {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [status, setStatus] = useState<Option>(option);
  const [selected, setSelected] = useState<Inativas>({} as Inativas);
  const [name, setName] = useState('');
  const [pde, setPDE] = useState('');
  // const [date, setDate] = useState('');

  const inativasParam = {
    status: status.value,
  };

  const { data: inativasList } = useQuery({
    queryKey: ['inativasData', inativasParam],
    queryFn: async () => getInativas(inativasParam),
  });

  const inativas = inativasList?.filter(
    item =>
      item.pde.includes(pde) &&
      item.InativasSent?.[0]?.name.toLowerCase().includes(name.toLowerCase()),
  );

  const { data: users } = useQuery({
    queryKey: ['usersData'],
    queryFn: async () => getUser(),
  });

  return (
    <RootLayout>
      <main className="flex flex-col gap-2 h-full">
        <Header title="Listagem de inativas" action />

        <div className="w-full flex flex-row gap-4 mt-4">
          <InputText
            placeholder="Buscar por nome"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <InputText
            placeholder="Buscar por PDE"
            value={pde}
            onChange={e => setPDE(e.target.value)}
          />

          <Select
            id="status"
            placeholder="Status"
            onChange={e => e && setStatus(e)}
            value={status}
            options={[
              { value: 'REVIEW', label: 'Em análise' },
              { value: 'SENT', label: 'Pendente' },
            ]}
          />
          {/*
          <InputText
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
          /> */}
        </div>

        <div className="flex flex-col w-full max-h-full overflow-y-auto mt-4">
          <TableComponent
            headers={['Nome', 'PDE', 'Endereço', 'Agente', 'Status']}
          >
            {inativas?.map(inativa => (
              <TableRow
                onClick={() => {
                  setShowDetails(true);
                  setSelected(inativa);
                }}
              >
                <TableCell align="left" className="pl-1 flex flex-col">
                  <Field>
                    {inativa.InativasSent?.[0]?.name?.toUpperCase() || '--'}
                  </Field>
                </TableCell>
                <TableCell
                  align="left"
                  width={110}
                  className="pl-1 flex flex-col"
                >
                  <Field>{inativa.pde || '--'}</Field>
                </TableCell>
                <TableCell align="left" className="pl-1 flex flex-col">
                  <Field>
                    {`${inativa.street?.toUpperCase()}, ${inativa.number?.toUpperCase()}${
                      inativa.complement !== 'undefined'
                        ? `, ${inativa.complement?.toUpperCase()}`
                        : ''
                    }`}
                  </Field>
                </TableCell>
                <TableCell align="left" className="pl-1 flex flex-col">
                  <Field>
                    {users
                      ?.find(u => u.id === inativa?.InativasSent?.[0]?.user_id)
                      ?.name?.toUpperCase() || ''}
                  </Field>
                </TableCell>
                <TableCell
                  align="left"
                  width={120}
                  className="pl-1 flex flex-col"
                >
                  <Field>
                    {inativa.InativasSent?.[0]?.status === 'REVIEW'
                      ? 'EM ANÁLISE'
                      : 'PENDENTE'}
                  </Field>
                </TableCell>
              </TableRow>
            ))}
          </TableComponent>
        </div>
      </main>
      {showDetails && selected && (
        <Modal>
          <InativasDetails
            client={selected}
            onClose={() => setShowDetails(false)}
          />
        </Modal>
      )}
    </RootLayout>
  );
};

export default IndexPage;
