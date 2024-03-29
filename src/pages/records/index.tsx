/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { MoreHorizontal } from 'lucide-react';
import { FaDownload } from 'react-icons/fa6';

import Header from '@/components/Header/Header';
import Search from '@/components/Search/Search';
import TableComponent from '@/components/Table/Table';
import Modal from '@/components/Modal/Modal';
import RootLayout from '@/components/RootLayout/Layout';
import ClientsDetails from '@/components/ClientsDetails/ClientsDetails';
import Pagination from '@/components/Pagination/Pagination';

import api from '@/services/api';
import { handleError } from '@/utils/message';
import { formatDate } from '@/utils/format';

import {
  Records,
  Paginated,
  RecordsFilter,
  Contract,
  Community,
  Street,
} from '@/interfaces/Records';

import ModalQuest from '@/components/ModalQuest/Modal';
import { ContainerPagination, Content, ExportRow } from './styles';

const IndexPage = () => {
  const [clientsList, setClientsList] = useState<Records[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [community, setCommunity] = useState<Community[]>([]);
  const [streets, setStreets] = useState<Street[]>([]);

  const [clientSelected, setClientSelected] = useState<Records | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showQuest, setShowQuest] = useState(false);

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const { register, getValues, setValue, watch } = useForm<RecordsFilter>({
    defaultValues: {
      status: 'IN_REVIEW',
      situation: 'NORMAL',
    },
  });

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

  const openDetails = (client: Records) => {
    setClientSelected(client);
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

  const handleDonwload = async () => {
    try {
      const { data } = await api.get<string>('/client/export-data');

      window.open(data);
    } catch (error) {
      handleError(error);
    }
  };

  const renderSituationColors = (status: string) => {
    const colors = {
      NORMAL: '#14dd46',
      AUSENTE: '#FF9100',
      VAGO: '#008cff',
    } as any;

    return colors[status || 'NORMAL'];
  };

  return (
    <RootLayout>
      <main className="flex flex-col gap-2 h-full">
        <Header
          title="Cadastros"
          subtitle="Primeira ligação, validação de cadastro e correções de dados."
          action
        />

        <Search
          register={register}
          onSubmit={getClients}
          filtered={{
            contracts,
            communities: community,
            streets,
          }}
          setValue={setValue}
          watch={watch}
        />

        <ExportRow>
          <FaDownload
            style={{ cursor: 'pointer' }}
            color="#8cd630"
            size={22}
            onClick={() => setShowQuest(true)}
          />
        </ExportRow>

        <Content>
          <TableComponent
            headers={[
              'Situação',
              'Nome',
              'Endereço',
              'Comunidade',
              'Contrato',
              'Data',
              'Status',
              'Ações',
            ]}
          >
            {clientsList?.map(row => (
              <TableRow
                key={row.id}
                onClick={() => openDetails(row)}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                className="hover:opacity-80 cursor-pointer border-b-2 border-shadow hover:bg-shadow scroll"
              >
                <TableCell align="left" height={10} className="p-0">
                  <div
                    style={{
                      color: renderSituationColors(row.situation_status),
                    }}
                  >
                    {row.situation_status || ''}
                  </div>
                </TableCell>

                <TableCell align="left" height={55} className="p-0">
                  <div>{row.name.toUpperCase() || '-- --'}</div>
                </TableCell>

                <TableCell align="left" height={55} className="p-0">
                  <div>
                    {row.property.street.name.toUpperCase() || ''},{' '}
                    {row.property.number.toUpperCase() || ''}
                    {row.property.complement
                      && `, ${row.property.complement.toUpperCase()}`}
                  </div>
                </TableCell>

                <TableCell align="left" className="p-0">
                  <div>{row.property.street.community.name.toUpperCase() || ''}</div>
                </TableCell>

                <TableCell align="left" className="p-0">
                  <div>{row.property.street.community.contract.name.toUpperCase() || ''}</div>
                </TableCell>

                <TableCell align="left" className="p-0">
                  <div>
                    {(row.created_at && formatDate(row.created_at)) || ''}
                  </div>
                </TableCell>

                <TableCell align="left" height={55} className="p-0">
                  <div style={{ color: renderColors(row.status) }}>
                    {renderStatus(row.status)}
                  </div>
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

        {showDetails && clientSelected && (
          <Modal>
            <ClientsDetails
              client={clientSelected}
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
      </main>
    </RootLayout>
  );
};

export default IndexPage;
