import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TableCell, TableRow } from '@mui/material';
import { FaClipboardList, FaRedoAlt } from 'react-icons/fa';
import { FaDownload } from 'react-icons/fa6';

import Header from '@/components/Header/Header';
import InativasDetails from '@/components/Details/InativasDetails/InativasDetails';
import InputText from '@/components/Input/Input';
import Modal from '@/components/Modals/Modal/Modal';
import RootLayout from '@/components/RootLayout/Layout';
import Select from '@/components/Select/Select';
import TableComponent from '@/components/Table/Table';
import ModalQuest from '@/components/Modals/ModalQuest/Modal';
import Loading from '@/components/Modals/Loading/Loading';

import { Inativas, InativasSent } from '@/interfaces/inativas';
import { useInativas } from '@/services/querys/inativas';
import { useUsers } from '@/services/querys/user';
import { normalize } from '@/utils/format';
import { INACTIVE_OPTIONS } from '@/utils/options';
import { renderSituationColors, renderStatus } from '@/utils/verifications';
import { handleError, handleSuccess } from '@/utils/message';
import api from '@/services/api';

import ModalExportFicha from '@/components/Modals/ModalExportFicha/ModalExportFicha';
import {
  ButtonImport,
  ButtonOutlined,
  ExportSection,
  Field,
  RowButtons,
} from './styles';

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
  const [showQuest, setShowQuest] = useState('');
  const [showReturn, setShowReturn] = useState(false);
  const [showFiles, setShowFiles] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const { data: users } = useUsers();
  const { data: inativasList } = useInativas({
    status: watch('status').value,
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

  const handleDonwload = async () => {
    try {
      setLoading(true);

      const { data } = await api.get<string>('/inativa/export', {
        params: {
          ...(showQuest === 'ALL' ? {} : { status: showQuest }),
        },
      });

      setShowQuest('');
      window.open(data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async () => {
    try {
      setLoading(true);

      const { data } = await api.post<{ count: number }>('/inativa/return');

      setShowReturn(false);
      handleSuccess(
        `Ordens retornadas com sucesso! Quantidade: ${data.count || 0}`,
      );
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const fields = ['Nome', 'PDE', 'Endereço', 'Agente', 'Tipo', 'Status'];

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

        <RowButtons>
          <ExportSection>
            <ButtonImport onClick={() => setShowQuest('ALL')}>
              <FaDownload className="icon" />
              Exportar todas as inativas
            </ButtonImport>

            <ButtonImport onClick={() => setShowQuest('VALIDATED')}>
              <FaDownload className="icon" />
              Exportar inativas validadas
            </ButtonImport>
          </ExportSection>

          <ExportSection>
            <ButtonOutlined onClick={() => setShowFiles(true)}>
              <FaClipboardList className="icon" />
              Imprimir fichas
            </ButtonOutlined>

            <ButtonOutlined onClick={() => setShowReturn(true)}>
              <FaRedoAlt className="icon" />
              Retornar ordens
            </ButtonOutlined>
          </ExportSection>
        </RowButtons>

        <div className="flex flex-col w-full max-h-full overflow-y-auto mt-4">
          <TableComponent headers={fields}>
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
                        inativa.InativasSent?.[0]?.status,
                      ),
                    }}
                  >
                    {renderStatus(inativa.InativasSent?.[0]?.status)}
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

      {showQuest !== '' && (
        <ModalQuest onClose={() => setShowQuest('')} onConfirm={handleDonwload}>
          Tem certeza que deseja exportar os dados?
        </ModalQuest>
      )}

      {showReturn && (
        <ModalQuest
          onClose={() => setShowReturn(false)}
          onConfirm={handleReturn}
        >
          Tem certeza que deseja retornar as ordens criadas anteriormente?
        </ModalQuest>
      )}

      {showFiles && <ModalExportFicha onClose={() => setShowFiles(false)} />}

      {loading && <Loading />}
    </RootLayout>
  );
};

export default IndexPage;
