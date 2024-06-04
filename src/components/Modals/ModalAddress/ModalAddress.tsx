/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ChevronLeft, Map, TrashIcon, Edit3Icon } from 'lucide-react';
import { TableCell, TableRow } from '@mui/material';

import { Community, Contract, Street } from '@/interfaces/Records';
import api from '@/services/api';
import { handleError, handleSuccess } from '@/utils/message';

import Header from '../../Header/Header';
import InputText from '../../Input/Input';
import Dropdown from '../../Dropdown/Dropdown';
import TableComponent from '../../Table/Table';

import {
  ActionsIcons,
  BackButton,
  BackText,
  ButtonConfirm,
  Row,
  Title,
  Wrapper,
} from './styles';
import ModalQuest from '../ModalQuest/Modal';
import ModalStreet from '../ModalStreet/ModalStreet';
import Loading from '../Loading/Loading';

interface Option {
  label: string;
  value: string;
}

interface IStreet {
  name: string;
  id: string;
  cep?: string | null;
  community_id?: string | null;
  contract_id?: string | null;
}

interface IInfo {
  name: string;
  id: string;
}

interface IAdreess {
  name: string;
  id: string;
  cep?: string;
  community_id?: string | null;
  contract_id?: string | null;
}

interface FormProps {
  name: string;
  community_id: Option;
  contract_id: Option;
  cep: string;
}

interface ClientsDetailsProps {
  onClose: () => void;
  type: 'contract' | 'community' | 'street' | '';
}

const ModalAddress = ({ onClose, type }: ClientsDetailsProps) => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [community, setCommunity] = useState<Community[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [street, setStreet] = useState({} as IStreet);
  const [deleteInfo, setDeleteInfo] = useState<IInfo | null>(null);
  const [address, setAddress] = useState<IAdreess[]>([]);

  const { register, handleSubmit, control } = useForm<FormProps>();

  const getContract = async () => {
    try {
      const { data } = await api.get<Contract[]>('/general/contract');

      if (type === 'contract') {
        setAddress(data?.map(contract => ({
          name: contract.name,
          id: contract.id,
        })).reverse() || []);
      }

      setContracts(data);
    } catch (error) {
      handleError(error);
    }
  };

  const getCommunity = async () => {
    try {
      const { data } = await api.get<Community[]>('/general/community');

      if (type === 'community') {
        setAddress(data?.map(communitys => ({
          name: communitys.name,
          id: communitys.id,
          contract_id: communitys.contract_id,
        })).reverse() || []);
      }

      setCommunity(data);

      return data;
    } catch (error) {
      handleError(error);
    }
  };

  const getStreet = async () => {
    try {
      const result = await getCommunity();

      setCommunity(result as Community[]);

      const { data } = await api.get<Street[]>('/general/street');

      if (type === 'street') {
        setAddress(data?.map(streets => ({
          id: streets.id,
          name: streets.name,
          cep: streets.cep,
          community_id: streets.community_id,
        })).reverse() || []);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const onReset = () => {
    if (type === 'contract') getContract();
    if (type === 'community') {
      getContract();
      getCommunity();
    }
    if (type === 'street') {
      getStreet();
    }
  };

  useEffect(() => {
    onReset();
  }, [type]);

  const onSaveContract: SubmitHandler<FormProps> = async data => {
    try {
      setLoading(true);
      await api.post('/general/contract', {
        name: data.name,
      });

      handleSuccess('Cadastrado com sucesso!');
      getContract();
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const onSaveCommunities: SubmitHandler<FormProps> = async data => {
    try {
      setLoading(true);
      await api.post('/general/community', {
        name: data.name,
        contract_id: data.contract_id,
      });

      handleSuccess('Cadastrado com sucesso!');
      getCommunity();
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const onSaveStreet: SubmitHandler<FormProps> = async data => {
    try {
      setLoading(true);
      await api.post('/general/street', {
        name: data.name,
        cep: data.cep || '00000-000',
        community_id: data.community_id,
      });

      handleSuccess('Cadastrado com sucesso!');
      getStreet();
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await api.delete(`/general/${type}/${deleteInfo?.id}`);
      handleSuccess('Deletado com sucesso!');
      setDeleteInfo(null);
      setShowModal(false);
      onReset();
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const renderTitle = () => {
    const titles = {
      contract: 'Cadastro de contrato',
      community: 'Cadastro de comunidade',
      street: 'Cadastro de rua',
    } as const;

    return titles[type || 'contract'];
  };

  const functions = {
    contract: onSaveContract,
    community: onSaveCommunities,
    street: onSaveStreet,
  } as any;

  return (
    <Wrapper onSubmit={handleSubmit(functions[type])}>
      <Header title={renderTitle()} action>
        <BackButton onClick={onClose}>
          <ChevronLeft color="#a5a5a5" size={22} />
          <BackText>Fechar</BackText>
        </BackButton>
      </Header>

      <Title>Preencha os campos</Title>

      <Row>
        <InputText
          label="Nome"
          placeholder="Nome"
          {...register('name', { required: true })}
        />

        {type === 'community' && (
          <Dropdown
            name="contract_id"
            label="Contrato"
            control={control}
            options={contracts?.map(contract => ({
              label: contract.name,
              value: contract.id,
            })) || []}
          />
        )}

        {type === 'street' && (
          <>
            <Dropdown
              name="community_id"
              label="Comunidade"
              control={control}
              options={community.length > 0 ? community.map(communitie => ({
                label: communitie.name,
                value: communitie.id,
              })) : []}
            />

            <InputText label="CEP" placeholder="CEP" {...register('cep')} />
          </>
        )}
      </Row>

      <Row style={{ justifyContent: 'flex-end', marginTop: '2rem' }}>
        <ButtonConfirm type="submit" disabled={loading}>
          Salvar
        </ButtonConfirm>
      </Row>

      <div style={{ marginTop: '1rem' }} className="flex flex-col w-full max-h-full overflow-y-auto">
        <TableComponent>
          {address.map(row => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              className="hover:opacity-80 cursor-pointer border-b-2 border-shadow hover:bg-shadow scroll"
            >
              <TableCell align="left" width={60} className="p-0">
                <Map className="text-secondary self-center" />
              </TableCell>

              <TableCell align="left" className="pl-1 flex flex-col">
                <div>
                  {row.name}
                </div>
              </TableCell>

              <TableCell align="right" width={40} className="p-0">
                <ActionsIcons>
                    <Edit3Icon
                      size={24}
                      className="self-end"
                      onClick={() => {
                        setStreet(row);
                        setShowEdit(true);
                      }}
                    />

                  <TrashIcon
                    size={24}
                    color="#DF4343"
                    className="self-end"
                    onClick={() => {
                      setDeleteInfo(row);
                      setShowModal(true);
                    }}
                  />
                </ActionsIcons>
              </TableCell>
            </TableRow>
          ))}
        </TableComponent>
      </div>

      {showModal && deleteInfo && (
        <ModalQuest
          onConfirm={onDelete}
          loading={loading}
          onClose={() => {
            setDeleteInfo(null);
            setShowModal(false);
          }}
        >
          Deseja deletar esse cadastro?
        </ModalQuest>
      )}

      {showEdit && street?.id && (
        <ModalStreet
          onRefresh={onReset}
          street={street}
          type={type}
          onClose={() => {
            setStreet({} as any);
            setShowEdit(false);
          }}
        />
      )}

      {loading && <Loading />}
    </Wrapper>
  );
};

export default ModalAddress;
