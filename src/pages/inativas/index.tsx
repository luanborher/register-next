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
import { FaDatabase } from 'react-icons/fa';
import api from '@/services/api';
import { handleError } from '@/utils/message';
import Loading from '@/components/Modals/Loading/Loading';
import { ButtonImport, ExportRow, Field } from './styles';

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
  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<Inativas>({} as Inativas);
  const [inativa, setInativa] = useState<InativasSent>({} as InativasSent);

  const { register, setValue, watch } = useForm({
    defaultValues: {
      status: option,
      name: '',
      pde: '',
      date: '',
      type: {
        label: 'Todos',
        value: '',
      },
    },
  });

  const onGenerateCodification = async () => {
    try {
      setLoading(true);
      const { data } = await api.get<string>('/client/export-cod');
      window.open(data, '_blank');
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const inativasParam = {
    status: watch('status').value,
  };

  const normalize = (texto: string) => {
    return texto
      ?.normalize('NFD')
      ?.replace(/[\u0300-\u036f]/g, '')
      ?.replace(/[^\w\s]/gi, '')
      ?.replace(' ', '')
      ?.toLowerCase();
  };

  const { data: inativasList } = useQuery({
    queryKey: ['inativasData', inativasParam],
    queryFn: async () => {
      const data = await getInativas(inativasParam);

      return data.map(item => ({
        ...item,
        filter: normalize(item.InativasSent?.[0]?.type),
        userName: normalize(item.InativasSent?.[0]?.name),
      }));
    },
  });

  const inativas = inativasList?.filter(item => {
    if (watch('type')?.value !== '') {
      return (
        item.pde.includes(watch('pde')) &&
        normalize(item.userName)?.includes(normalize(watch('name'))) &&
        item?.filter === normalize(watch('type')?.value)
      );
    }

    return (
      item.pde.includes(watch('pde')) &&
      normalize(item.userName)?.includes(normalize(watch('name')))
    );
  });

  const { data: users } = useQuery({
    queryKey: ['usersData'],
    queryFn: async () => getUser(),
  });

  const colors = {
    VALIDATED: '#14dd46',
    SENT: '#FF9100',
    REVIEW: '#008cff',
  } as any;

  const status = {
    VALIDATED: 'VALIDADO',
    SENT: 'PENDENTE',
    REVIEW: 'EM ANÁLISE',
  } as any;

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
            isClearable={false}
            options={[
              { value: 'REVIEW', label: 'Em análise' },
              { value: 'SENT', label: 'Pendente' },
              { value: 'VALIDATED', label: 'Validados' },
            ]}
          />

          <Select
            id="type"
            placeholder="Selecione..."
            onChange={e => e && setValue('type', e)}
            isClearable={false}
            defaultValue={{ value: '', label: 'Todos' }}
            options={[{ value: '', label: 'Todos' }, ...INACTIVE_OPTIONS]}
          />
        </div>

        <ExportRow>
          <ButtonImport onClick={onGenerateCodification}>
            <FaDatabase className="icon" />
            Gerar codificação
          </ButtonImport>
        </ExportRow>

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
                      color:
                        colors[
                          inativa.InativasSent?.[0]?.status || 'VALIDATED'
                        ],
                    }}
                  >
                    {status[inativa.InativasSent?.[0]?.status]}
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

      {loading && <Loading />}
    </RootLayout>
  );
};

export default IndexPage;
