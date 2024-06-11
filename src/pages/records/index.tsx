import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MoreHorizontal } from 'lucide-react';
import { FaSearch } from 'react-icons/fa';
import { FaDownload, FaDatabase } from 'react-icons/fa6';
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
import api from '@/services/api';
import { handleError } from '@/utils/message';
import { formatDate } from '@/utils/format';
import { Records, Paginated, RecordsFilter } from '@/interfaces/Records';
import { Contract, Community, Street } from '@/interfaces/Records';
import { Button, ButtonImport, ContainerPagination, Content } from './styles';
import { ExportRow, ExportSection, Field, LabelButton } from './styles';

const IndexPage = () => {
  const [clientsList, setClientsList] = useState<Records[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [community, setCommunity] = useState<Community[]>([]);
  const [streets, setStreets] = useState<Street[]>([]);
  const [selected, setSelected] = useState<Records | null>(null);

  const [showDetails, setShowDetails] = useState(false);
  const [showQuest, setShowQuest] = useState(false);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const { register, getValues, setValue, watch } = useForm<RecordsFilter>({
    defaultValues: {
      status: 'IN_REVIEW',
      situation: 'NORMAL',
    },
  });

  const onValidateStatus = () => {};

  const getClients = async () => {
    try {
      const { data } = await api.get<Paginated<Records[]>>(
        '/client/filter/validated',
        {
          params: {
            page,
            limit: 10,
            name: getValues('name') || undefined,
            number: getValues('number') || undefined,
            contract_id: getValues('contract_id') || undefined,
            street_id: getValues('street_id') || undefined,
            community_id: getValues('community_id') || undefined,
            situation_status: getValues('situation') || undefined,
            status: getValues('status') || undefined,
            date: getValues('date') || undefined,
          },
        },
      );

      setTotalPages(Math.ceil(data.totalCount / 10));
      setClientsList(data.data);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    getClients();
  }, [page]);

  const getStreet = async () => {
    try {
      const { data } = await api.get<Street[]>('/general/street');

      const result = data.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });

      setStreets(result);
    } catch (error) {
      handleError(error);
    }
  };

  const getCommunity = async () => {
    try {
      const { data } = await api.get<Community[]>('/general/community');

      const result = data.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });

      setCommunity(result);

      await getStreet();
    } catch (error) {
      handleError(error);
    }
  };

  const getContract = async () => {
    try {
      const { data } = await api.get<Contract[]>('/general/contract');

      const result = data.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });

      setContracts(result);

      await getCommunity();
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    getContract();
  }, []);

  const onGenerateCodification = async () => {
    setLoading(true);

    try {
      const { data } = await api.get<string>('/client/export-cod');

      window.open(data, '_blank');
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const openDetails = (client: Records) => {
    setSelected(client);
    setShowDetails(true);
  };

  const renderStatus = (status: string) => {
    const statusList = {
      VALIDATED: 'VALIDADO',
      IN_REVIEW: 'AUDITORIA',
      REJECTED: 'REJEITADO',
    } as any;

    return statusList[status || 'IN_REVIEW'];
  };

  const renderColors = (status: string) => {
    const colors = {
      VALIDATED: '#14dd46',
      IN_REVIEW: '#008cff',
      REJECTED: '#ff0000',
    } as any;

    return colors[status || 'IN_REVIEW'];
  };

  const renderSituationColors = (status: string) => {
    const colors = {
      NORMAL: '#14dd46',
      AUSENTE: '#FF9100',
      VAGO: '#008cff',
    } as any;

    return colors[status || 'NORMAL'];
  };

  const handleDonwload = async () => {
    setLoading(true);

    try {
      const { data } = await api.get<string>('/client/export-data');

      window.open(data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    'Situação',
    'Nome',
    'Endereço',
    'Comunidade',
    'Contrato',
    'Data',
    'Status',
    'Ações',
  ];

  return (
    <RootLayout>
      <main className="flex flex-col gap-2 h-full">
        <Header
          title="Cadastros"
          subtitle="Listagem de primeira ligação, validação e correções das informações."
          action
        />

        <Search
          filtered={{
            contracts,
            communities: community,
            streets,
          }}
          onSubmit={getClients}
          register={register}
          setValue={setValue}
          watch={watch}
        />

        <ExportRow>
          <ExportSection>
            <ButtonImport>
              <FaDatabase className="icon" onClick={onGenerateCodification} />
              Exportar codificação
            </ButtonImport>

            <ButtonImport>
              <FaDownload className="icon" onClick={() => setShowQuest(true)} />
              Exportar cadastros
            </ButtonImport>
          </ExportSection>

          <Button onClick={getClients}>
            <FaSearch />
            <LabelButton>Buscar</LabelButton>
          </Button>
        </ExportRow>

        <Content>
          <TableComponent headers={fields}>
            {clientsList?.map(row => (
              <TableRow
                key={row.id}
                onClick={() => openDetails(row)}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                className="hover:opacity-80 cursor-pointer border-b-2 border-shadow hover:bg-shadow scroll"
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
                  <Field title={row.property.street.community.contract.name}>
                    {row.property.street.community.contract.name.toUpperCase() ||
                      ''}
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
            <Pagination
              onChangePage={setPage}
              page={page}
              pageCount={totalPages}
            />
          </ContainerPagination>
        )}

        {showDetails && selected && (
          <Modal>
            <ClientsDetails
              client={selected}
              onClose={() => setShowDetails(false)}
              refetch={getClients}
              filtered={{
                contracts,
                communities: community,
                streets,
              }}
            />
          </Modal>
        )}

        {showQuest && (
          <ModalQuest
            onClose={() => setShowQuest(false)}
            onConfirm={handleDonwload}
          >
            Deseja exportar os dados?
          </ModalQuest>
        )}

        {loading && <Loading />}
      </main>
    </RootLayout>
  );
};

export default IndexPage;
