import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BookOpenCheck, MoreHorizontal } from 'lucide-react';
import { FaFileImport, FaDownload } from 'react-icons/fa6';
import { useQueryClient } from '@tanstack/react-query';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Header from '@/components/Header/Header';
import Search from '@/components/Search/Search';
import TableComponent from '@/components/Table/Table';
import Modal from '@/components/Modals/Modal/Modal';
import RootLayout from '@/components/RootLayout/Layout';
import ClientsDetails from '@/components/Details/ClientsDetails/ClientsDetails';
import Pagination from '@/components/Pagination/Pagination';
import ModalQuest from '@/components/Modals/ModalQuest/Modal';
import Loading from '@/components/Modals/Loading/Loading';
import { handleError, handleSuccess } from '@/utils/message';
import { formatDate } from '@/utils/format';
import { Records, RecordsFilter } from '@/interfaces/Records';
import ModalImport from '@/components/Modals/ModalImport/ModalImport';
import { useClients, useCommunity } from '@/services/querys/cadastros';
import { useContract, useStreet } from '@/services/querys/cadastros';
import { onValidateStatus, renderSituationColors } from '@/utils/verifications';
import { renderColors, renderStatus } from '@/utils/verifications';
import api from '@/services/api';
import { Content, ButtonImport, ContainerPagination, Field } from './styles';
import { ExportRow, ExportSection, ButtonConfirm, ImportRow } from './styles';

const IndexPage = () => {
  const query = useQueryClient();

  const [selected, setSelected] = useState<Records | null>(null);
  const [file, setFile] = useState<File>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showDetails, setShowDetails] = useState(false);
  const [showQuest, setShowQuest] = useState(false);
  const [showQuestCod, setShowQuestCod] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, setValue, watch } = useForm<RecordsFilter>({
    defaultValues: {
      status: 'IN_REVIEW',
      situation: 'NORMAL',
    },
  });

  const onRefresh = () => query.invalidateQueries({ queryKey: ['getClients'] });

  const { data: clients } = useClients({
    page: currentPage,
    limit: 10,
    number: watch('number') || undefined,
    name: watch('name') || undefined,
    contract_id: watch('contract_id') || undefined,
    street_id: watch('street_id') || undefined,
    community_id: watch('community_id') || undefined,
    situation_status: watch('situation') || undefined,
    status: watch('status') || undefined,
    date: watch('date') || undefined,
    ...onValidateStatus(watch('field')),
  });
  const totalPages = Math.ceil((clients?.totalCount || 0) / 10);
  const { data: contracts } = useContract({});
  const hasContract = contracts && contracts.length > 0;
  const { data: communities } = useCommunity({}, hasContract);
  const hasCommunity = communities && communities.length > 0;
  const { data: streets } = useStreet({}, hasCommunity);

  const onGenerateCodification = async () => {
    try {
      setLoading(true);
      setShowQuestCod(false);

      const { data } = await api.get<string>('/client/export-cod');

      window.open(data, '_blank');
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDonwload = async () => {
    try {
      setLoading(true);
      setShowQuest(false);

      const { data } = await api.get<string>('/client/export-data');

      window.open(data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmitImport = async () => {
    if (file) {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        await api.post('/client/import-cod', formData);

        handleSuccess('Importação realizada sucesso.');
        setFile(undefined);
        onRefresh();
      } catch (error) {
        setFile(undefined);
        handleError(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const fields = [
    'Situação',
    'Nome',
    'Endereço',
    'Comunidade',
    'Hidrômetro',
    'Data',
    'Status',
    'Ações',
  ];

  const filtered = { contracts, communities, streets };

  return (
    <RootLayout>
      <main className="flex flex-col gap-2 h-full">
        <Header
          title="Cadastros"
          subtitle="Listagem de primeira ligação, validação e correções das informações."
          action
        />

        <Search
          filtered={filtered}
          onSubmit={onRefresh}
          register={register}
          setValue={setValue}
          watch={watch}
        />

        <ExportRow>
          <ExportSection>
            <ButtonImport onClick={() => setShowQuestCod(true)}>
              <FaDownload className="icon" />
              Exportar codificação
            </ButtonImport>

            <ButtonImport>
              <FaFileImport className="icon" />
              Importar codificação
              <input
                type="file"
                accept=".xlsx, .xls, .csv, .xlsm"
                onChange={e => {
                  setFile(e?.target?.files?.[0]);
                  e.target.value = '';
                }}
              />
            </ButtonImport>

            <ButtonImport onClick={() => setShowQuest(true)}>
              <FaDownload className="icon" />
              Exportar cadastros
            </ButtonImport>
          </ExportSection>
        </ExportRow>

        <Content>
          <TableComponent headers={fields}>
            {clients?.data?.map(row => (
              <TableRow
                key={row.id}
                onClick={() => {
                  setSelected(row);
                  setShowDetails(true);
                }}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                className="tableRow"
              >
                <TableCell align="left" height={10} className="p-0">
                  <Field
                    style={{
                      color: renderSituationColors(row.situation_status),
                    }}
                  >
                    {row.situation_status || ''}
                  </Field>
                </TableCell>

                <TableCell align="left" height={55} className="p-0">
                  <Field title={row.name}>
                    {row.name.toUpperCase() || '-- --'}
                  </Field>
                </TableCell>

                <TableCell align="left" height={55} className="p-0">
                  <Field>
                    {row.property.street.name.toUpperCase() || ''},{' '}
                    {row.property.number.toUpperCase() || ''}
                    {row.property.complement &&
                      `, ${row.property.complement.toUpperCase()}`}
                  </Field>
                </TableCell>

                <TableCell align="left" className="p-0">
                  <Field title={row.property.street.community.name}>
                    {row.property.street.community.name.toUpperCase() || ''}
                  </Field>
                </TableCell>

                <TableCell align="left" className="p-0">
                  <Field title={row.property.hydrometer_number}>
                    {row.property.hydrometer_number.toUpperCase() || ''}
                  </Field>
                </TableCell>

                <TableCell align="left" className="p-0">
                  <Field>
                    {(row.created_at && formatDate(row.created_at)) || ''}
                  </Field>
                </TableCell>

                <TableCell align="left" height={55} className="p-0">
                  <Field style={{ color: renderColors(row.status) }}>
                    {renderStatus(row.status)}
                  </Field>
                </TableCell>

                <TableCell align="right" width={40} className="p-0">
                  <MoreHorizontal
                    size={24}
                    className="text-secondary self-end"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableComponent>
        </Content>

        {totalPages > 1 && (
          <ContainerPagination>
            <div />

            <Pagination
              onChangePage={setCurrentPage}
              page={currentPage}
              pageCount={totalPages}
            />

            <div>
              <span>Total:</span> {clients?.totalCount || 0}
            </div>
          </ContainerPagination>
        )}

        {showDetails && selected && (
          <Modal>
            <ClientsDetails
              client={selected}
              onClose={() => setShowDetails(false)}
              refetch={onRefresh}
              filtered={filtered}
            />
          </Modal>
        )}

        {showQuest && (
          <ModalQuest
            onClose={() => setShowQuest(false)}
            onConfirm={handleDonwload}
          >
            Deseja exportar os dados de cadastros?
          </ModalQuest>
        )}

        {showQuestCod && (
          <ModalQuest
            onClose={() => setShowQuestCod(false)}
            onConfirm={onGenerateCodification}
          >
            Deseja exportar cadastros para a criação de codificação?
          </ModalQuest>
        )}

        {file && (
          <ModalImport>
            <BookOpenCheck size={90} color="white" />
            <div>{file?.name || 'Arquivo selecionado'}</div>
            <ImportRow>
              <ButtonConfirm cancel onClick={() => setFile(undefined)}>
                Cancelar
              </ButtonConfirm>
              <ButtonConfirm onClick={onSubmitImport}>Importar</ButtonConfirm>
            </ImportRow>
          </ModalImport>
        )}

        {loading && <Loading />}
      </main>
    </RootLayout>
  );
};

export default IndexPage;
