import { useForm } from 'react-hook-form';
import { ChevronLeft } from 'lucide-react';
import { Inativas } from '@/interfaces/inativas';
import Header from '../../Header/Header';
import InputText from '../../Input/Input';
import { BackButton, BackText, Row, Title, Wrapper, Image } from './styles';

interface DetailsProps {
  client: Inativas;
  onClose: () => void;
}

const InativasDetails = ({ client, onClose }: DetailsProps) => {
  const { register } = useForm({
    defaultValues: {
      ...client?.InativasSent?.[0],
      pde: client?.pde,
      street: client?.street,
      neighborhood: client?.neighborhood,
      type: client?.type,
      community: client?.community,
      cep: client?.cep,
      economy_count: client?.economy_count,
      property_type: client?.property_type,
      situation: client?.situation,
      hidrometerOld: client?.hidrometer,
      fornecimento: client?.fornecimento,
      bill_quantity: client?.bill_quantity,
      total_value: client?.total_value,
      proposal: client?.proposal,
      total_value_corrected: client?.total_value_corrected,
      consulted_status: client?.consulted_status,
      village: client?.village,
      sublocal: client?.sublocal,
      local: client?.local,
      block: client?.block,
      route: client?.route,
      sector: client?.sector,
      group: client?.group,
      atc: client?.atc,
    },
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') onClose();
  });

  const status = { REVIEW: 'Em análise', SENT: 'Pendente' } as any;
  const title = client.InativasSent?.[0]?.name || '';
  const date = client.InativasSent?.[0]?.date || '';

  return (
    <Wrapper>
      <Header
        title={title}
        subtitle={`${date} - ${status[client.status || 'REVIEW']}` || ''}
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

        <InputText
          label="Tipo de serviço"
          placeholder="Tipo de serviço"
          {...register('type')}
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
        <InputText label="Rua" placeholder="Rua" {...register('street')} />

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
          {...register('hidrometerOld')}
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
          placeholder="Valor total corrigido"
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
        {client.InativasSent?.[0]?.facadePic && (
          <Image
            src={client.InativasSent?.[0]?.facadePic}
            alt="Documento 1"
            style={{ objectFit: 'contain' }}
          />
        )}

        {client.InativasSent?.[0]?.documentPic1 && (
          <Image
            src={client.InativasSent?.[0]?.documentPic1}
            alt="Documento 1"
            style={{ objectFit: 'contain' }}
          />
        )}

        {client.InativasSent?.[0]?.documentPic2 && (
          <Image
            src={client.InativasSent?.[0]?.documentPic2}
            alt="Documento 1"
            style={{ objectFit: 'contain' }}
          />
        )}
      </Row>

      <Row style={{ justifyContent: 'center' }}>
        {client.InativasSent?.[0]?.hydroPicOld && (
          <Image
            src={client.InativasSent?.[0]?.hydroPicOld}
            alt="Documento 1"
            style={{ objectFit: 'contain' }}
          />
        )}

        {client.InativasSent?.[0]?.hydroPicNew && (
          <Image
            src={client.InativasSent?.[0]?.hydroPicNew}
            alt="Documento 1"
            style={{ objectFit: 'contain' }}
          />
        )}

        {client.InativasSent?.[0]?.serviceDonePic && (
          <Image
            src={client.InativasSent?.[0]?.serviceDonePic}
            alt="Documento 1"
            style={{ objectFit: 'contain' }}
          />
        )}
      </Row>

      {client.InativasSent?.[0]?.signature ? (
        <>
          <Title>Assinatura</Title>

          <Row style={{ justifyContent: 'center' }}>
            <Image
              src={client.InativasSent?.[0]?.signature}
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

      <Title>Dados de cadastros</Title>
      <Row>
        <InputText
          label="Nome do agente"
          placeholder="Nome do agente"
          value={client.InativasSent?.[0]?.user_id}
          disabled
        />

        <InputText
          label="Data de cadastro"
          placeholder="Data de cadastro"
          value={client.InativasSent?.[0]?.date}
          disabled
        />
      </Row>
    </Wrapper>
  );
};

export default InativasDetails;
