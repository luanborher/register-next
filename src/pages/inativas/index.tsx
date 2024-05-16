/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
import Header from '@/components/Header/Header';
import InativasDetails from '@/components/Details/InativasDetails/InativasDetails';
import InputText from '@/components/Input/Input';
import Modal from '@/components/Modals/Modal/Modal';
import RootLayout from '@/components/RootLayout/Layout';
import Select from '@/components/Select/Select';
import TableComponent from '@/components/Table/Table';
import { Inativas, InativasSent } from '@/interfaces/inativas';
import { getInativas } from '@/services/querys/inativas';
import { getUser } from '@/services/querys/user';
import { TableCell, TableRow } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { INACTIVE_OPTIONS } from '@/utils/options';
import { useForm } from 'react-hook-form';
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
  const [selected, setSelected] = useState<Inativas>({} as Inativas);
  const [inativa, setInativa] = useState<InativasSent>({} as InativasSent);

  const { register, setValue, watch } = useForm({
    defaultValues: {
      status: option,
      name: '',
      pde: '',
      date: '',
      type: {
        label: '',
        value: '',
      },
    },
  });

  const inativasParam = {
    status: watch('status').value,
  };

  const { data: inativasList } = useQuery({
    queryKey: ['inativasData', inativasParam],
    queryFn: async () => getInativas(inativasParam),
  });

  const normalizeText = (texto: string) => {
    return texto
      ?.normalize('NFD')
      ?.replace(/[\u0300-\u036f]/g, '')
      ?.replace(/[^\w\s]/gi, '');
  };

  const inativas = inativasList?.filter(
    item =>
      item.pde.includes(watch('pde')) &&
      normalizeText(item.InativasSent?.[0]?.name)
        .toLowerCase()
        .includes(normalizeText(watch('name')).toLowerCase()) &&
      normalizeText(item.InativasSent?.[0]?.type).includes(
        normalizeText(watch('type')?.value || ''),
      ),
  );

  console.log(watch('date'));

  const { data: users } = useQuery({
    queryKey: ['usersData'],
    queryFn: async () => getUser(),
  });

  const renderSituationColors = (status: string) => {
    const colors = {
      VALIDATED: '#14dd46',
      SENT: '#FF9100',
      REVIEW: '#008cff',
    } as any;

    return colors[status || 'NORMAL'];
  };

  return (
    <RootLayout>
      <main className="flex flex-col gap-2 h-full">
        <Header title="Listagem de inativas" action />

        <div className="w-full flex flex-row gap-4 mt-4">
          <InputText
            type="text"
            placeholder="Buscar por nome"
            {...register('name')}
          />

          <InputText
            type="text"
            placeholder="Buscar por PDE"
            {...register('pde')}
          />

          <Select
            id="status"
            placeholder="Selecione..."
            onChange={e => e && setValue('status', e)}
            defaultValue={option}
            options={[
              { value: 'REVIEW', label: 'Em análise' },
              { value: 'SENT', label: 'Pendente' },
            ]}
          />

          <Select
            id="type"
            refetch={() => setValue('type', {} as Option)}
            placeholder="Selecione..."
            onChange={e => e && setValue('type', e)}
            options={INACTIVE_OPTIONS}
          />
        </div>

        <div className="flex flex-col w-full max-h-full overflow-y-auto mt-4">
          <TableComponent
            headers={['Nome', 'PDE', 'Endereço', 'Agente', 'Tipo', 'Status']}
          >
            {inativas?.map(inativa => (
              <TableRow
                onClick={() => {
                  setShowDetails(true);
                  setInativa(inativa?.InativasSent?.[0]);
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

                <TableCell align="left" className="pl-1 flex flex-col">
                  <Field>
                    {inativa?.InativasSent?.[0]?.type.toUpperCase() || '--'}
                  </Field>
                </TableCell>

                <TableCell
                  align="left"
                  width={120}
                  className="pl-1 flex flex-col"
                >
                  <Field
                    style={{
                      color: renderSituationColors(
                        inativa.InativasSent?.[0]?.status || 'VALIDATED',
                      ),
                    }}
                  >
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
            inativa={inativa}
            client={selected}
            onClose={() => setShowDetails(false)}
          />
        </Modal>
      )}
    </RootLayout>
  );
};

export default IndexPage;
