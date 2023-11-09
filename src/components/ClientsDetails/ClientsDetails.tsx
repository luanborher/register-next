import { SubmitHandler, useForm } from 'react-hook-form';
import { ChevronLeft } from 'lucide-react';

import Header from '../Header/Header';
import InputText from '../Input/Input';

import { Records } from '@/interfaces/Records';

import { BackButton, BackText, ButtonCancel, ButtonConfirm, ButtonDeletar, ButtonValidated, Row, Title, Wrapper } from './styles';
import api from '@/services/api';

interface ClientsDetailsProps {
  client: Records;
  onClose: () => void;
}

export default function ClientsDetails({
  client,
  onClose
}: ClientsDetailsProps) {
  const { register, handleSubmit } = useForm<Records>({
    defaultValues: client
  });

  const onUpdate: SubmitHandler<Records> = async data => {
    try {
      await api.put(`/client/${client.id}`, data)

    } catch (error: any) {
      console.log(error);
    }
  }

  const onValidated = async () => {
    try {
      await api.patch(`/client/validate/${client.id}`)

      onClose();
    } catch (error: any) {
      console.log(error);
    }
  }

  const onRejected = async () => {
    try {
      await api.patch(`/client/reject/${client.id}`)

      onClose();
    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <Wrapper onSubmit={handleSubmit(onUpdate)}>
      <Header title={client.name || ''} subtitle={client.cpf || ''} action>
        <BackButton onClick={onClose}>
          <ChevronLeft color="#a5a5a5" size={22} />
          <BackText>Fechar</BackText>
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

        <InputText
          label="Área"
          placeholder="Área"
          {...register('property.area')}
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
          {...register('property.zip_code')}
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
          label="Quantidade de cômodos"
          placeholder="Quantidade de cômodos"
          {...register('property.quantity_rooms')}
        />
      </Row>

      <Row>
        <InputText
          label="Situação do imóvel"
          placeholder="Situação do imóvel"
          {...register('property.property_situation')}
        />

        <InputText
          label="Tipo do imóvel"
          placeholder="Tipo do imóvel"
          {...register('property.property_type')}
        />

        <InputText
          label="Estrutura do imóvel"
          placeholder="Estrutura do imóvel"
          {...register('property.structure_type')}
        />
      </Row>

      <Title>Informações socioeconômico</Title>

      <Row>
        <InputText
          label="Escolaridade"
          placeholder="Escolaridade"
          {...register('social_information.scholarity')}
        />

        <InputText
          label="Provedora"
          placeholder="Provedora"
          {...register('social_information.provider')}
        />
      </Row>

      <Row>
        <InputText
          label="Renda"
          placeholder="Renda"
          {...register('social_information.income')}
        />

        <InputText
          label="Benefício"
          placeholder="Benefício"
          {...register('social_information.benefit')}
        />

        <InputText
          label="Profissão"
          placeholder="Profissão"
          {...register('social_information.profission')}
        />
      </Row>

      <Row style={{ justifyContent: 'flex-end', marginTop: '2rem' }}>
        <ButtonDeletar>
          Deletar
        </ButtonDeletar>

        <ButtonCancel onClick={onRejected}>
          Rejeitar
        </ButtonCancel>

        <ButtonValidated onClick={onValidated}>
          Validar
        </ButtonValidated>

        <ButtonConfirm>
          Salvar
        </ButtonConfirm>
      </Row>
    </Wrapper>
  );
}
