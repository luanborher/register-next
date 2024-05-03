import { useForm } from 'react-hook-form';
import { ChevronLeft } from 'lucide-react';
import { Inativas } from '@/interfaces/inativas';
import Header from '../Header/Header';
import InputText from '../Input/Input';
import { BackButton, BackText, Row, Title, Wrapper, Image } from './styles';

interface DetailsProps {
  client: Inativas;
  onClose: () => void;
}

const InativasDetails = ({ client, onClose }: DetailsProps) => {
  const { register } = useForm({
    defaultValues: {
      ...client,
      name: client?.InativasSent?.[0]?.name,
    },
  });

  const renderStatus = (status: string) => {
    const statusList = {
      REVIEW: 'Em análise',
      SENT: 'Pendente',
    } as any;

    return statusList[status || 'SENT'];
  };

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      onClose();
    }
  });

  return (
    <Wrapper>
      <Header
        title={client.InativasSent?.[0]?.name || ''}
        subtitle={
          `${client.InativasSent?.[0]?.date} - ${renderStatus(
            client.status,
          )}` || ''
        }
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
        <InputText label="RG" placeholder="RG" {...register('community')} />

        <InputText label="Rua" placeholder="Rua" {...register('street')} />

        <InputText type="number" label="Numero" {...register('number')} />
      </Row>
      <Row>
        <InputText
          label="Bairro"
          placeholder="Bairro"
          {...register('neighborhood')}
        />

        <InputText
          label="Complemento"
          placeholder="Complemento"
          {...register('complement')}
        />
      </Row>

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
        <InputText label="RG" placeholder="RG" {...register('community')} />

        <InputText label="Rua" placeholder="Rua" {...register('street')} />

        <InputText type="number" label="Numero" {...register('number')} />
      </Row>
      <Row>
        <InputText
          label="Bairro"
          placeholder="Bairro"
          {...register('neighborhood')}
        />

        <InputText
          label="Complemento"
          placeholder="Complemento"
          {...register('complement')}
        />
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
