import { useForm } from 'react-hook-form';

import Header from 'components/Header/Header';
import InputText from 'components/Input/Input';

import { BackButton, BackText, Row, Title, Wrapper } from './styles';

import { Records } from 'interfaces/Records';
import { ChevronLeft } from 'lucide-react';

interface ClientsDetailsProps {
  client: Records;
  onClose: () => void;
}

export default function ClientsDetails({
  client,
  onClose
}: ClientsDetailsProps) {
  const { register } = useForm<Records>({
    defaultValues: client
  });

  return (
    <Wrapper>
      <Header title={client.name || ''} subtitle={client.cpf || ''} action>
        <BackButton onClick={onClose}>
          <ChevronLeft color="#a5a5a5" size={22} />
          <BackText>Voltar</BackText>
        </BackButton>
      </Header>

      <Title>Informações pessoais</Title>

      <Row>
        <InputText
          label="Nome"
          placeholder="Nome Completo"
          {...register('name')}
        />

        <InputText label="CPF" placeholder="CPF" {...register('cpf')} />
      </Row>

      <Row>
        <InputText label="RG" placeholder="RG" {...register('rg')} />

        <InputText
          label="Telefone"
          placeholder="Telefone"
          {...register('telephone')}
        />

        <InputText
          label="Celular"
          placeholder="Celular"
          {...register('phone')}
        />

        <InputText type="date" label="Nascimento" {...register('birthDate')} />
      </Row>

      <Row>
        <InputText label="Gênero" {...register('gender')} />

        <InputText
          label="Provedora"
          {...register('social_information.provider')}
        />

        <InputText label="Entidade" {...register('entity_type')} />
      </Row>

      <Row>
        <InputText label="Estado Civíl" {...register('marital_status')} />

        <InputText label="Profissão" {...register('profession')} />
      </Row>

      <Row>
        <InputText label="Trabalhando" {...register('number_people_working')} />

        <InputText label="Habitantes" {...register('number_people_living')} />

        <InputText label="Benefício Social" {...register('social_benefit')} />
      </Row>

      <Row>
        <InputText label="Renda Familiar" {...register('family_income')} />

        <InputText label="Empregado" {...register('unemployed')} />

        <InputText label="Benefício Social" {...register('social_benefit')} />
      </Row>

      <Row>
        <InputText
          label="Nome Atendente"
          placeholder="Nome Completo"
          {...register('attendant_name')}
        />

        <InputText
          label="Entidade Atendente"
          {...register('attendant_entity')}
        />
      </Row>

      <Row>
        <InputText
          label="RG Atendente"
          placeholder="RG"
          {...register('attendant_rg')}
        />

        <InputText
          label="CPF Atendente"
          placeholder="CPF"
          {...register('attendant_cpf')}
        />

        <InputText
          label="Telefone Atendente"
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
      </Row>

      <Row>
        <InputText
          label="Contrato"
          placeholder="Contrato"
          {...register('property.street.community.contract.name')}
        />

        <InputText
          label="Área Atuação"
          placeholder="Área Atuação"
          {...register('property.street.community.name')}
        />

        <InputText
          label="Rua"
          placeholder="Rua"
          {...register('property.street.name')}
        />

        <InputText
          label="Número"
          placeholder="Número"
          {...register('property.number')}
        />
      </Row>

      <Row style={{ justifyContent: 'flex-end', marginTop: '2rem' }}>
        <button className="flex items-center justify-center w-[250px] h-[45px] px-2 gap-2 py-2 text-white bg-primary rounded-md hover:bg-opacity-80">
          <span className="text-xs md:text-sm xxl:text-base font-medium">
            Salvar
          </span>
        </button>
      </Row>
    </Wrapper>
  );
}
