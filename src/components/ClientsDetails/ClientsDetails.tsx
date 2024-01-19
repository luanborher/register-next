/* eslint-disable prettier/prettier */
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ChevronLeft } from 'lucide-react';

import { Filtered, Records } from '@/interfaces/Records';
import api, { baseURL } from '@/services/api';
import { handleSuccess, handleError } from '@/utils/message';
import { options } from '@/utils/options';

import { formatDateHours } from '@/utils/format';
import { useAuth } from '@/hooks/useAuth';
import Header from '../Header/Header';
import InputText from '../Input/Input';
import Dropdown from '../Dropdown/Dropdown';
import ModalImage from '../ModalImage/Modal';
import ModalQuest from '../ModalQuest/Modal';

import {
  BackButton,
  BackText,
  ButtonCancel,
  ButtonConfirm,
  ButtonDeletar,
  ButtonValidated,
  Row,
  Title,
  Wrapper,
  Image,
} from './styles';

interface ClientsDetailsProps {
  client: Records;
  filtered: Filtered;
  onClose: () => void;
  refetch: () => void;
}

const ClientsDetails = ({ client, filtered, onClose, refetch }: ClientsDetailsProps) => {
  const { user } = useAuth();

  const date = new Date(client.birthDate);

  const [showImage, setShowImage] = useState(false);
  const [urlImage, setUrlImage] = useState('');
  const [showQuest, setShowQuest] = useState(false);
  const [showRejected, setShowRejected] = useState(false);
  const [showDeleted, setShowDeleted] = useState(false);

  const { register, handleSubmit, control, watch } = useForm<Records>({
    defaultValues: {
      ...client,
      birthDate: date.toISOString().split('T')[0],
    },
  });

  const onUpdate: SubmitHandler<Records> = async data => {
    try {
      await api.put(`/client/${client.id}`, {
        ...data,
        ...data.social_information,
        ...data.property,
        status: client.status,
        social_information: undefined,
        property: undefined,
      });

      handleSuccess('Cliente alterado com sucesso!');

      refetch();
      onClose();
    } catch (error: any) {
      handleError(error);
    }
  };

  const onDelete = async () => {
    try {
      await api.delete(`/client/${client.id}`);

      handleSuccess('Cliente deletado com sucesso!');

      setShowDeleted(false);
      refetch();
      onClose();
    } catch (error: any) {
      handleError(error);
    }
  };

  const onValidated = async () => {
    try {
      await api.patch(`/client/validate/${client.id}`);

      handleSuccess('Cliente validado com sucesso!');

      setShowQuest(false);
      refetch();
      onClose();
    } catch (error: any) {
      handleError(error);
    }
  };

  const onRejected = async () => {
    try {
      await api.patch(`/client/reject/${client.id}`);

      handleSuccess('Cliente rejeitado com sucesso!');

      setShowRejected(false);
      refetch();
      onClose();
    } catch (error: any) {
      handleError(error);
    }
  };

  const renderStatus = (status: string) => {
    const statusList = {
      VALIDATED: 'Validado',
      IN_REVIEW: 'Auditoria',
      REJECTED: 'Rejeitado',
    } as any;

    return statusList[status || 'IN_REVIEW'];
  };

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      onClose();
    }
  });

  return (
    <Wrapper>
      <Header
        title={client.name || ''}
        subtitle={`${formatDateHours(client.created_at)} - ${renderStatus(client.status)}` || ''}
        id={client.property.registration}
        action
      >
        <BackButton onClick={onClose}>
          <ChevronLeft color="#a5a5a5" size={22} />

          <BackText>Fechar</BackText>
        </BackButton>
      </Header>

      <Title>Informações pessoais</Title>

      <Row>
        <InputText
          label="Nome"
          placeholder="Nome completo"
          {...register('name')}
        />

        <InputText label="CPF" placeholder="CPF" {...register('cpf')} />
      </Row>

      <Row>
        <InputText label="RG" placeholder="RG" {...register('rg')} />

        <InputText
          label="Celular"
          placeholder="Celular"
          {...register('phone')}
        />

        <InputText type="date" label="Nascimento" {...register('birthDate')} />
      </Row>

      <Row>
        <Dropdown
          name="gender"
          label="Gênero"
          control={control}
          options={options?.Genero}
        />

        <Dropdown
          name="marital_status"
          label="Estado civíl"
          control={control}
          options={options?.EstadoCivil}
        />

        <Dropdown
          name="entity_type"
          label="Situação habitação"
          control={control}
          options={options?.SituacaoHabitacao}
        />
      </Row>

      <Row>
        <Dropdown
          name="unemployed"
          label="Empregado"
          control={control}
          options={options?.SimNao}
        />

        {/* <InputText label="Trabalhando" {...register('number_people_working')} /> */}

        <InputText label="Habitantes" {...register('number_people_living')} />
      </Row>

      <Row>
        <InputText
          label="Nome atendente"
          placeholder="Nome completo"
          {...register('attendant_name')}
        />

        <Dropdown
          name="attendant_entity"
          label="Entidade atendente"
          control={control}
          options={options?.EntidadeAtendente}
        />
      </Row>

      <Row>
        <InputText
          label="RG atendente"
          placeholder="RG"
          {...register('attendant_rg')}
        />

        <InputText
          label="CPF atendente"
          placeholder="CPF"
          {...register('attendant_cpf')}
        />

        <InputText
          label="Telefone atendente"
          placeholder="Telefone"
          {...register('attendant_telephone')}
        />
      </Row>

      <Title>Informações do imóvel</Title>

      <Row>
        <InputText
          label="Codificação"
          placeholder="Codificação"
          {...register('property.codification')}
        />

        <InputText
          label="Cód. Logradouro"
          placeholder="Cód. Logradouro"
          {...register('property.street_code')}
        />

        <InputText
          label="Área"
          placeholder="Área"
          {...register('property.area')}
        />
      </Row>

      <Row>
        <InputText
          label="Hidrômetro"
          placeholder="Hidrômetro"
          {...register('property.hydrometer_number')}
        />

        <InputText
          label="Hidrômetro antigo"
          placeholder="Hidrômetro antigo"
          {...register('property.old_hydro')}
        />
      </Row>

      <Row>
        <Dropdown
          name="property.street.community.contract_id"
          label="Contrato"
          control={control}
          options={[
            ...(filtered?.contracts?.map(contract => ({
              value: contract.id,
              label: contract.name,
            })) || []),
          ]}
        />

        <Dropdown
          name="property.street.community_id"
          label="Área Atuação"
          control={control}
          options={[
            ...(filtered?.communities?.map(communitie => ({
              value: communitie.id,
              label: communitie.name,
            })) || []),
          ]}
        />

        <Dropdown
          name="property.street_id"
          label="Rua"
          control={control}
          options={[
            ...(filtered?.streets?.map(street => ({
              value: street.id,
              label: street.name,
            })) || []),
          ]}
        />
      </Row>

      <Row>
        <InputText
          label="Número"
          placeholder="Número"
          {...register('property.number')}
        />

        <InputText
          label="CEP"
          placeholder="CEP"
          {...register('property.street.cep')}
        />
      </Row>

      <Row>
        <InputText
          label="Complemento"
          placeholder="Complemento"
          {...register('property.complement')}
        />

        <InputText
          label="Referência"
          placeholder="Referência"
          {...register('property.reference')}
        />
      </Row>

      <Row>
        <InputText
          label="Entre números"
          placeholder="Entre números"
          {...register('property.between_numbers')}
        />

        <InputText
          label="Qtd. cômodos"
          placeholder="Qtd. cômodos"
          {...register('property.quantity_rooms')}
        />

        <InputText
          label="Qtd. Economias"
          placeholder="Qtd. Economias"
          {...register('property.quantity_amount')}
        />
      </Row>

      <Row>
        <Dropdown
          name="property.property_situation"
          label="Situação imóvel"
          control={control}
          options={options?.SituacaoImovel}
        />

        <Dropdown
          name="property.property_type"
          label="Tipo imóvel"
          control={control}
          options={options?.TipoImovel}
        />

        <Dropdown
          name="property.structure_type"
          label="Estrutura imóvel"
          control={control}
          options={options?.EstruturaImovel}
        />
      </Row>

      <Row>
        <Dropdown
          name="property.bed"
          label="Leito"
          control={control}
          options={options?.TipoLeitoPasseio}
        />

        <Dropdown
          name="property.tour"
          label="Passeio"
          control={control}
          options={options?.TipoLeitoPasseio}
        />
      </Row>

      <Row>
        <Dropdown
          name="property.reservoir"
          label="Reservatório"
          control={control}
          options={options?.Reservatorio}
        />

        <Dropdown
          name="property.connection_type"
          label="Tipo Ligação"
          control={control}
          options={options?.TipoLigacao}
        />
      </Row>

      <Title>Informações socioeconômico</Title>

      <Row>
        <Dropdown
          name="social_information.scholarity"
          label="Escolaridade"
          control={control}
          options={options?.Escolaridade}
        />

        <Dropdown
          name="social_information.provider"
          label="Provedora"
          control={control}
          options={options?.Provedora}
        />

        <InputText
          label="Renda familiar"
          placeholder="Renda familiar"
          {...register('social_information.income')}
        />
      </Row>

      <Row>
        <Dropdown
          name="social_information.benefit"
          label="Benefício familiar"
          control={control}
          options={options?.Beneficio}
        />

        <Dropdown
          name="profession"
          label="Profissão"
          control={control}
          options={options?.Profissao}
        />

        <InputText
          type="number"
          label="Nº matriculados na escola"
          placeholder="Nº matriculados na escola"
          {...register('social_information.registered_people')}
        />
      </Row>

      <Row>
        <InputText
          type="number"
          label="Nº Crianca (0 a 12 anos)"
          placeholder="Qtd. crianças"
          {...register('social_information.quantity_children')}
        />

        <InputText
          type="number"
          label="Nº Adolescente (13 a 18 anos)"
          placeholder="Qtd. adolescentes"
          {...register('social_information.quantity_teenagers')}
        />

        {Number(watch('social_information.quantity_teenagers')) > 0 && (
          <Dropdown
            options={options?.SimNao}
            name="social_information.teenager_contributes"
            control={control}
            label="Adolescente contribuinte?"
          />
        )}

        <InputText
          type="number"
          label="Nº Adulto (19 a 59 anos)"
          placeholder="Qtd. adultos"
          {...register('social_information.quantity_adults')}
        />
      </Row>

      <Row>
        <InputText
          type="number"
          label="Nº Idoso (60 anos ou mais)"
          placeholder="Qtd. idosos"
          {...register('social_information.quantity_elder')}
        />

        <InputText
          type="number"
          label="Quantidade de pessoas trabalhando"
          placeholder="Qtd. Trabalhando"
          {...register('social_information.quantity_working')}
        />

        <Dropdown
          name="social_information.race"
          label="Grupo Racial"
          control={control}
          options={options?.Racial}
        />
      </Row>

      <Row>
        <InputText
          disabled
          label="Histórico de Doenças Transmitidas Pela Água"
          placeholder="Histórico de Doenças Transmitidas Pela Água"
          value={client.social_information.have_history_of_illness.join(', ')}
        />
      </Row>

      <Row>
        <InputText
          disabled
          label="O que espera para a família tendo saneamento básico?"
          placeholder="O que espera para a família tendo saneamento básico?"
          value={client.what_awaits_your_family}
        />
      </Row>

      <Title>Imagens</Title>

      <Row style={{ justifyContent: 'center' }}>
        {client.property.first_document_url && (
          <Image
            src={
              client.property.first_document_url.includes('https')
                ? client.property.first_document_url
                : `${baseURL}files/${client.property.first_document_url}`
            }
            alt="Documento 1"
            onClick={() => {
              setShowImage(true);
              setUrlImage(
                `${baseURL}files/${client.property.first_document_url}`,
              );
            }}
            style={{ objectFit: 'contain' }}
          />
        )}

        {client.property.second_document_url && (
          <Image
            src={
              client.property.second_document_url.includes('https')
                ? client.property.second_document_url
                : `${baseURL}files/${client.property.second_document_url}`
            }
            alt="Documento 2"
            onClick={() => {
              setShowImage(true);
              setUrlImage(
                `${baseURL}files/${client.property.second_document_url}`,
              );
            }}
            style={{ objectFit: 'contain' }}
          />
        )}

        {client.property.facade_url && (
          <Image
            src={
              client.property.facade_url.includes('https')
                ? client.property.facade_url
                : `${baseURL}files/${client.property.facade_url}`
            }
            alt="Fachada"
            onClick={() => {
              setShowImage(true);
              setUrlImage(`${baseURL}files/${client.property.facade_url}`);
            }}
            style={{ objectFit: 'contain' }}
          />
        )}

        {client.property.additional_url && (
          <Image
            src={
              client.property.additional_url.includes('https')
                ? client.property.additional_url
                : `${baseURL}files/${client.property.additional_url}`
            }
            alt="Adicional"
            onClick={() => {
              setShowImage(true);
              setUrlImage(`${baseURL}files/${client.property.additional_url}`);
            }}
            style={{ objectFit: 'contain' }}
          />
        )}
      </Row>

      <Title>Dados de cadastros</Title>

      <Row>
        <InputText
          label="Nome do agente"
          placeholder="Nome do agente"
          value={client.user.name}
          disabled
        />

        <InputText
          label="Data de cadastro"
          placeholder="Data de cadastro"
          value={formatDateHours(client.created_at)}
          disabled
        />
      </Row>

      {client.property.signature_url ? (
        <>
          <Title>Assinatura</Title>

          <Row style={{ justifyContent: 'center' }}>
            <Image
              src={
                client.property.signature_url.includes('https')
                  ? client.property.signature_url
                  : `${baseURL}files/${client.property.signature_url}`
              }
              alt="Assinatura"
              style={{ width: '500px', objectFit: 'contain' }}
            />
          </Row>
        </>
      ) : (
        <Title
          style={{
            color: '#c91919e4',
            border: '1px solid #c91919e4',
            textAlign: 'center',
            padding: '0.3rem',
            borderRadius: '5px',
          }}
        >
          Sem assinatura cadastrada
        </Title>
      )}

      <Row style={{ justifyContent: 'flex-end', marginTop: '2rem' }}>
        {(user.role === 'DEVELOPER' || user.role === 'MASTER') && (
          <ButtonDeletar
            type="button"
            onClick={() => {
              setShowDeleted(true);
            }}
          >
            Apagar
          </ButtonDeletar>
        )}

        <ButtonCancel
          type="button"
          onClick={() => {
            setShowRejected(true);
          }}
        >
          Rejeitar
        </ButtonCancel>

        <ButtonValidated
          type="button"
          onClick={() => {
            setShowQuest(true);
          }}
        >
          Validar
        </ButtonValidated>

        <ButtonConfirm type="submit" onClick={handleSubmit(onUpdate)}>
          Editar
        </ButtonConfirm>
      </Row>

      {showImage && urlImage !== '' && (
        <ModalImage
          onClose={() => {
            setShowImage(false);
            setUrlImage('');
          }}
        >
          <Image
            src={urlImage}
            alt=""
            style={{ width: '500px', height: 'auto' }}
          />
        </ModalImage>
      )}

      {showQuest && (
        <ModalQuest
          onClose={() => setShowQuest(false)}
          onConfirm={() => onValidated()}
        >
          Deseja validar este cliente?
        </ModalQuest>
      )}

      {showRejected && (
        <ModalQuest
          onClose={() => setShowRejected(false)}
          onConfirm={() => onRejected()}
        >
          Deseja rejeitar este cliente?
        </ModalQuest>
      )}

      {showDeleted && (
        <ModalQuest
          onClose={() => setShowDeleted(false)}
          onConfirm={() => onDelete()}
        >
          Deseja apagar este cliente?
        </ModalQuest>
      )}
    </Wrapper>
  );
};

export default ClientsDetails;
