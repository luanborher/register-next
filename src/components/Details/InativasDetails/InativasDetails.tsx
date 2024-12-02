import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ChevronLeft } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';

import { Inativas, InativasSent } from '@/interfaces/inativas';
import { INACTIVE_OPTIONS } from '@/utils/options';
import { handleError, handleSuccess } from '@/utils/message';
import api from '@/services/api';

import ModalQuest from '@/components/Modals/ModalQuest/Modal';
import FichaCampo from '@/components/Pdfs/FichaCampo/FichaCampo';
import Dropdown from '@/components/Dropdown/Dropdown';

import Header from '../../Header/Header';
import InputText from '../../Input/Input';

import {
  BackButton,
  BackText,
  Row,
  Title,
  Wrapper,
  Image,
  ButtonValidated,
  Hidden,
  ButtonDownload,
  ButtonUpdate,
} from './styles';

interface DetailsProps {
  client: Inativas;
  inativa: InativasSent;
  onClose: () => void;
}

const InativasDetails = ({ client, inativa, onClose }: DetailsProps) => {
  const componentRef = useRef<HTMLDivElement>(null);

  const [showQuest, setShowQuest] = useState(false);

  console.log(client);

  const { register, watch, control } = useForm({
    defaultValues: {
      ...inativa,
      status: client.status,
      pde: client.pde,
      community: client.community,
      neighborhood: client.neighborhood,
      cep: client.cep,
      situation: client.situation,
      property_type: client.property_type,
      economy_count: client.economy_count,
      fornecimento: client.fornecimento,
      hidrometer: client.hidrometer,
      bill_quantity: client.bill_quantity,
      total_value: client.total_value,
      proposal: client.proposal,
      total_value_corrected: client.total_value_corrected,
      consulted_status: client.consulted_status,
      atc: client.atc,
      group: client.group,
      sector: client.sector,
      route: client.route,
      block: client.block,
      local: client.local,
      sublocal: client.sublocal,
      village: client.village,
    },
  });

  const onValidated = async () => {
    try {
      await api.put('/inativa', {
        id: inativa.id,
        status: 'VALIDATED',
      });

      handleSuccess('Serviço validado com sucesso.');
      setShowQuest(false);
      onClose();
    } catch (error: any) {
      handleError(error);
    }
  };

  const onUpdate = async () => {
    const form = watch();

    try {
      await api.put('/inativa', {
        ...form,
        pde: undefined,
        street: undefined,
        community: undefined,
        neighborhood: undefined,
        cep: undefined,
        situation: undefined,
        property_type: undefined,
        economy_count: undefined,
        fornecimento: undefined,
        hidrometer: undefined,
        bill_quantity: undefined,
        total_value: undefined,
        proposal: undefined,
        total_value_corrected: undefined,
        consulted_status: undefined,
        atc: undefined,
        group: undefined,
        sector: undefined,
        route: undefined,
        block: undefined,
        local: undefined,
        sublocal: undefined,
        village: undefined,
      });

      handleSuccess('Serviço validado com sucesso.');
      setShowQuest(false);
      onClose();
    } catch (error: any) {
      handleError(error);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current as HTMLDivElement,
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') onClose();
  });

  const status = {
    REVIEW: 'Em análise',
    SENT: 'Pendente',
    VALIDATED: 'Validado',
    STAND_BY: 'Prateleira',
  } as any;

  return (
    <Wrapper>
      <Header
        title={inativa?.name || ''}
        subtitle={`${inativa?.date || ''} - ${status[inativa.status]}`}
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
        <InputText label="PDE" placeholder="PDE" {...register('pde')} />
        <Dropdown
          name="type"
          label="Tipo de serviço"
          control={control}
          options={INACTIVE_OPTIONS.map(item => ({
            value: item.value.toUpperCase(),
            label: item.label.toUpperCase(),
          }))}
        />
      </Row>

      <Row>
        <InputText label="RG" placeholder="RG" {...register('rg')} />
        <InputText label="CPF" placeholder="CPF" {...register('cpf')} />
        <InputText
          label="Data de Nascimento"
          placeholder="Data de Nascimento"
          {...register('birthDate')}
        />
      </Row>

      <Row>
        <InputText
          label="Telefone 1"
          placeholder="Telefone 1"
          {...register('phone1')}
        />
        <InputText
          label="Telefone 2"
          placeholder="Telefone 2"
          {...register('phone2')}
        />
        <InputText
          label="Entidade atendente"
          placeholder="Atentende"
          {...register('owner')}
        />
      </Row>

      <Title>Informações do imóvel</Title>

      <Row>
        <InputText label="Rua" placeholder="Rua" {...register('address')} />
        <InputText type="number" label="Numero" {...register('number')} />
        <InputText
          label="Complemento"
          placeholder="Complemento"
          {...register('complement')}
        />
      </Row>

      <Row>
        <InputText
          label="Comunidade"
          placeholder="Comunidade"
          {...register('community')}
        />
        <InputText
          label="Bairro"
          placeholder="Bairro"
          {...register('neighborhood')}
        />
        <InputText label="CEP" placeholder="CEP" {...register('cep')} />
      </Row>

      <Row>
        <InputText
          label="Referência"
          placeholder="Referência"
          {...register('reference')}
        />
        <InputText
          label="Entre números"
          placeholder="Entre números"
          {...register('betweenNumbers')}
        />
        <InputText
          label="Leitura"
          placeholder="Leitura"
          {...register('reading')}
        />
      </Row>

      <Row>
        <InputText
          label="Situação imóvel"
          placeholder="Situação imóvel"
          {...register('situation')}
        />
        <InputText
          label="Tipo imóvel"
          placeholder="Tipo imóvel"
          {...register('property_type')}
        />
        <InputText
          label="Qtd. Economias"
          placeholder="Qtd. Economias"
          {...register('economy_count')}
        />
      </Row>

      <Row>
        <InputText
          label="Fornecimento"
          placeholder="Fornecimento"
          {...register('fornecimento')}
        />
        <InputText
          label="Hidrômetro antigo"
          placeholder="Hidrômetro antigo"
          {...register('hidrometer')}
        />
        <InputText
          label="Hidrômetro novo"
          placeholder="Hidrômetro novo"
          {...register('hydrometer')}
        />
      </Row>

      <Title>Informações socioeconômico</Title>

      <Row>
        <InputText
          label="Provedora"
          placeholder="Provedora"
          {...register('headedFamily')}
        />
        <InputText
          label="Renda familiar"
          placeholder="Renda familiar"
          {...register('income')}
        />
        <InputText
          label="Possui caixa d'aguá"
          placeholder="Possui caixa d'aguá"
          {...register('hasWaterBox')}
        />
      </Row>

      <Row>
        <InputText
          label="Tempo de ocupação"
          placeholder="Tempo de ocupação"
          {...register('occupancyTime')}
        />
        <InputText
          label="Qtd. Adultos"
          placeholder="Qtd. Adultos"
          {...register('qntAdults')}
        />
        <InputText
          label="Qtd. Crianças"
          placeholder="Qtd. Crianças"
          {...register('qntChildren')}
        />
      </Row>

      <Title>Informações da inativa</Title>

      <Row>
        <InputText
          label="Quantidade de contas"
          placeholder="Quantidade de contas"
          {...register('bill_quantity')}
        />
        <InputText
          label="Valor total"
          placeholder="Valor total"
          {...register('total_value')}
        />
        <InputText
          label="Proposta"
          placeholder="Proposta"
          {...register('proposal')}
        />
      </Row>

      <Row>
        <InputText
          label="Valor total corrigido"
          placeholder="Valor corrigido"
          {...register('total_value_corrected')}
        />
        <InputText
          label="Status consultado"
          placeholder="Status consultado"
          {...register('consulted_status')}
        />
      </Row>

      <Row>
        <InputText label="ATC" placeholder="ATC" {...register('atc')} />
        <InputText label="Grupo" placeholder="Grupo" {...register('group')} />
        <InputText label="Setor" placeholder="Setor" {...register('sector')} />
        <InputText label="Rota" placeholder="Rota" {...register('route')} />
      </Row>

      <Row>
        <InputText label="Quadra" placeholder="Quadra" {...register('block')} />
        <InputText label="Local" placeholder="Local" {...register('local')} />
        <InputText
          label="Sublocal"
          placeholder="Sublocal"
          {...register('sublocal')}
        />
        <InputText label="Vila" placeholder="Vila" {...register('village')} />
      </Row>

      <Title>Imagens</Title>

      <Row style={{ justifyContent: 'center' }}>
        {inativa?.facadePic && (
          <Image src={inativa?.facadePic} alt="img_campo" />
        )}
        {inativa?.documentPic1 && (
          <Image src={inativa?.documentPic1} alt="img_campo" />
        )}
        {inativa?.documentPic2 && (
          <Image src={inativa?.documentPic2} alt="img_campo" />
        )}
      </Row>

      <Row style={{ justifyContent: 'center' }}>
        {inativa?.hydroPicOld && (
          <Image src={inativa?.hydroPicOld} alt="img_campo" />
        )}
        {inativa?.hydroPicNew && (
          <Image src={inativa?.hydroPicNew} alt="img_campo" />
        )}
        {inativa?.serviceDonePic && (
          <Image src={inativa?.serviceDonePic} alt="img_campo" />
        )}
      </Row>

      {inativa?.signature ? (
        <>
          <Title>Assinatura</Title>

          <Row style={{ justifyContent: 'center' }}>
            <Image src={inativa?.signature} style={{ width: '500px' }} />
          </Row>
        </>
      ) : (
        <Title
          style={{
            color: '#c91919e4',
            textAlign: 'center',
            padding: '0.3rem',
            borderRadius: '5px',
          }}
        >
          Sem assinatura cadastrada
        </Title>
      )}

      <Title>Dados de cadastros</Title>

      <Row>
        <InputText
          label="Nome do agente"
          placeholder="Nome do agente"
          value={inativa?.user_id}
          disabled
        />
        <InputText
          label="Data de cadastro"
          placeholder="Data de cadastro"
          value={inativa?.date}
          disabled
        />
      </Row>

      <Row style={{ justifyContent: 'flex-end', marginTop: '2rem' }}>
        <ButtonDownload type="button" onClick={handlePrint}>
          Baixar ficha
        </ButtonDownload>

        <ButtonUpdate type="button" onClick={onUpdate}>
          Editar
        </ButtonUpdate>

        {inativa.status === 'REVIEW' && (
          <ButtonValidated type="button" onClick={() => setShowQuest(true)}>
            Validar
          </ButtonValidated>
        )}
      </Row>

      {showQuest && (
        <ModalQuest onClose={() => setShowQuest(false)} onConfirm={onValidated}>
          Deseja validar esse serviço?
        </ModalQuest>
      )}

      <Hidden>
        <FichaCampo
          ref={componentRef}
          contract="PIRITUBA - EXTREMO NORTE"
          date={client.created_at || '__/__/____'}
          inativas={[
            {
              ...client,
              name: inativa.name,
              hidrometer: inativa.hydrometer || client.hidrometer,
              number: inativa.number,
              complement: inativa.complement,
            },
          ]}
        />
      </Hidden>
    </Wrapper>
  );
};

export default InativasDetails;
