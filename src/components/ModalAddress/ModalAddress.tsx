/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ChevronLeft, Map, TrashIcon, Edit3Icon } from 'lucide-react';
import { TableCell, TableRow } from '@mui/material';

import { Community, Contract, Street } from '@/interfaces/Records';
import api from '@/services/api';
import { handleError, handleSuccess } from '@/utils/message';

import Header from '../Header/Header';
import InputText from '../Input/Input';
import Dropdown from '../Dropdown/Dropdown';
import TableComponent from '../Table/Table';

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

interface Option {
  label: string;
  value: string;
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
  const [street, setStreet] = useState({} as {
    name: string;
    id: string;
    cep?: string;
  });
  const [deleteInfo, setDeleteInfo] = useState<{
    name: string;
    id: string;
  } | null>(null);
  const [address, setAddress] = useState<{
    name: string;
    id: string;
    cep?: string;
  }[]>([]);

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
        })).reverse() || []);
      }
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    if (type === 'contract') {
      getContract();
    }
    if (type === 'community') {
      getContract();
      getCommunity();
    }
    if (type === 'street') {
      getStreet();
    }
  }, []);

  const onSaveContract: SubmitHandler<FormProps> = async data => {
    try {
      await api.post('/general/contract', {
        name: data.name,
      });

      handleSuccess('Cadastrado com sucesso!');
      getContract();
    } catch (error) {
      handleError(error);
    }
  };

  const onSaveCommunities: SubmitHandler<FormProps> = async data => {
    try {
      await api.post('/general/community', {
        name: data.name,
        contract_id: data.contract_id,
      });

      handleSuccess('Cadastrado com sucesso!');
      getCommunity();
    } catch (error) {
      handleError(error);
    }
  };

  const onSaveStreet: SubmitHandler<FormProps> = async data => {
    try {
      await api.post('/general/street', {
        name: data.name,
        cep: data.cep || '00000-000',
        community_id: data.community_id,
      });

      handleSuccess('Cadastrado com sucesso!');
      getStreet();
    } catch (error) {
      handleError(error);
    }
  };

  const onDelete = async () => {
    try {
      if (type === 'contract') {
        await api.delete(`/general/contract/${deleteInfo?.id}`);
      }
      if (type === 'community') {
        await api.delete(`/general/community/${deleteInfo?.id}`);
      }
      if (type === 'street') {
        await api.delete(`/general/street/${deleteInfo?.id}`);
      }

      handleSuccess('Deletado com sucesso!');
      setDeleteInfo(null);
      setShowModal(false);

      if (type === 'contract') {
        getContract();
      }
      if (type === 'community') {
        getCommunity();
        getContract();
      }
      if (type === 'street') {
        getCommunity();
        getStreet();
      }
    } catch (error) {
      handleError(error);
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

  return (
    <Wrapper>
      <Header
        title={renderTitle()}
        action
      >
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
        <ButtonConfirm
          type="submit"
          onClick={() => {
            if (type === 'contract') {
              handleSubmit(onSaveContract)();
            }
            if (type === 'community') {
              handleSubmit(onSaveCommunities)();
            }
            if (type === 'street') {
              handleSubmit(onSaveStreet)();
            }
          }}
        >
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
                <div className="text-black text-xs md:text-sm xxl:base font-semibold">
                  {row.name}
                </div>
              </TableCell>

              <TableCell align="right" width={40} className="p-0">
                <ActionsIcons>
                  {type === 'street' && (
                    <Edit3Icon
                      size={24}
                      className="self-end"
                      onClick={() => {
                        setStreet(row);
                        setShowEdit(true);
                      }}
                    />
                  )}

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
          onClose={() => {
            setDeleteInfo(null);
            setShowModal(false);
          }}
          onConfirm={onDelete}
        >
          Deseja deletar esse cadastro?
        </ModalQuest>
      )}

      {showEdit && street?.id && (
        <ModalStreet
          onClose={() => {
            setStreet({} as {
              name: string;
              id: string;
              cep?: string;
            });
            setShowEdit(false);
          }}
          onRefresh={() => getStreet()}
          street={street}
        />
      )}
    </Wrapper>
  );
};

export default ModalAddress;
