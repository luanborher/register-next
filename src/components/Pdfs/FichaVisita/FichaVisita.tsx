import React from 'react';

import { Records } from '@/interfaces/Records';
import { formatDateHours } from '@/utils/format';
import {
  Content,
  Files,
  Header,
  Info,
  InfoRow,
  Logo,
  Main,
  Title,
  Image,
} from './styles';

interface ComponentToPrintProps {
  client: Records;
}

const FichaVisita = React.forwardRef<HTMLDivElement, ComponentToPrintProps>(
  ({ client }, ref) => (
    <Files ref={ref}>
      <Main key={1}>
        <Content style={{ height: '165px' }}>
          <Header>
            <Logo src="/assets/logos.png" />

            <div>
              Saneamento Básico do Estado de São Paulo <br />
              PRIMEIRA LIGAÇÃO <br />
              COMPROVANTE DE VISITA
            </div>

            <Logo src="/assets/Sabesp.svg" />
          </Header>

          <Info>
            <InfoRow style={{ gridTemplateColumns: '2fr 1fr' }}>
              <div className="row">Cliente: {client.name}</div>
              <div className="row">CPF/CNPJ: {client.cpf}</div>
            </InfoRow>
            <InfoRow>
              <div className="row">RG: {client.rg}</div>
              <div className="row">Data de Nasc.: {client.birthDate}</div>
              <div className="row">Gênero: {client.gender}</div>
            </InfoRow>
            <InfoRow>
              <div className="row">Telefone: {client.phone}</div>
              <div className="row">Estado Civíl: {client.marital_status}</div>
              <div className="row">
                Situação Habitação: {client.entity_type}
              </div>
            </InfoRow>
          </Info>
        </Content>

        <Content style={{ height: '140px' }}>
          <Title>INFORMAÇÕES DO IMÓVEL</Title>

          <Info>
            <InfoRow>
              <div className="row">PDE: {client.property.pde}</div>
              <div className="row">
                Hidrômetro: {client.property.hydrometer_number}
              </div>
              <div className="row">
                Qtd. Economia: {client.property.quantity_amount}
              </div>
            </InfoRow>
            <InfoRow style={{ gridTemplateColumns: '2fr 1fr' }}>
              <div>
                Endereço:{' '}
                {`${client.property.street.name || ''} ${
                  client.property.number && `, ${client.property.number}`
                } ${
                  client.property.complement &&
                  `, ${client.property.complement}`
                }`}
              </div>
              <div className="row">
                Comunidade: {client.property.street.community.name}
              </div>
            </InfoRow>
            <InfoRow>
              <div className="row">
                Contrato: {client.property.street.community.contract.name}
              </div>
              <div className="row">
                Entre Números: {client.property.between_numbers}
              </div>
              <div className="row">CEP: {client.property.zip_code}</div>
            </InfoRow>
            <InfoRow>
              <div className="row">
                Estrutura Imóvel: {client.property.structure_type}
              </div>
              <div className="row">Leito: {client.property.bed}</div>
              <div className="row">Passeio: {client.property.tour}</div>
            </InfoRow>
            <InfoRow>
              <div className="row">Cód.: {client.property.codification}</div>
              <div className="row">
                Situação Imóvel: {client.property.property_situation}
              </div>
              <div className="row">
                Tipo Imóvel: {client.property.property_type}
              </div>
            </InfoRow>
          </Info>
        </Content>

        <Content style={{ height: '185px' }}>
          <Title>DADOS SOCIOECONÔMICOS</Title>

          <Info>
            <InfoRow>
              <div className="row">
                Escolaridade: {client.social_information.scholarity}
              </div>
              <div className="row">
                Provedora: {client.social_information.provider}
              </div>
              <div className="row">
                Renda Familiar: {client.social_information.income}
              </div>
            </InfoRow>
            <InfoRow>
              <div className="row">
                Benefício Familiar: {client.social_information.benefit}
              </div>
              <div className="row">
                Profissão: {client.social_information.profission}
              </div>
              <div className="row">
                Nº Matriculados na Escola:{' '}
                {client.social_information.registered_people}
              </div>
            </InfoRow>

            <InfoRow>
              <div className="row">
                Nº Crianca (0 a 12 anos):{' '}
                {client.social_information.quantity_children}
              </div>
              <div className="row">
                Nº Adolescente (13 a 18 anos):{' '}
                {client.social_information.quantity_teenagers}
              </div>
              <div className="row">
                Nº Adulto (19 a 59 anos):{' '}
                {client.social_information.quantity_adults}
              </div>
            </InfoRow>
            <InfoRow>
              <div className="row">
                Nº Idoso (60 anos ou mais):{' '}
                {client.social_information.quantity_elder}
              </div>
              <div className="row">
                Nº Pessoas Trabalhando:{' '}
                {client.social_information.quantity_working}
              </div>
              <div className="row">
                Grupo Racial: {client.social_information.race}
              </div>
            </InfoRow>
            <InfoRow style={{ gridTemplateColumns: '1fr' }}>
              <div className="row">
                Histórico de Doenças Transmitidas Pela Água:{' '}
                {client.social_information?.have_history_of_illness.join(', ')}
              </div>
            </InfoRow>
            <InfoRow style={{ gridTemplateColumns: '1fr' }}>
              <div className="row">
                O que espera para a família tendo saneamento básico?{' '}
              </div>
            </InfoRow>
            <InfoRow style={{ gridTemplateColumns: '1fr' }}>
              <div className="row">{client.what_awaits_your_family}</div>
            </InfoRow>
          </Info>
        </Content>

        <Content style={{ height: '185px', marginBottom: '30px' }}>
          <InfoRow style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
            <div
              className="row"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              Fachada
            </div>
            <div
              className="row"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              Documento
            </div>
            <div
              className="row"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              Adicional
            </div>
          </InfoRow>
          <InfoRow
            style={{
              gridTemplateColumns: '1fr 1fr 1fr',
              height: '145px',
              marginTop: '5px',
            }}
          >
            <div className="row">
              <Image src={client.property?.first_document_url} alt="" />
            </div>
            <div className="row">
              <Image src={client.property?.second_document_url} alt="" />
            </div>
            <div className="row">
              <Image src={client.property?.facade_url} alt="" />
            </div>
          </InfoRow>
        </Content>

        <Content style={{ height: '185px', border: 'none' }}>
          <InfoRow
            style={{
              gridTemplateColumns: '1fr',
              height: '145px',
              marginTop: '5px',
            }}
          >
            <div
              className="row"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <Image src={client.property?.signature_url} alt="" />
            </div>
          </InfoRow>

          <InfoRow style={{ gridTemplateColumns: '1fr' }}>
            <div
              className="row"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              Assinatura
            </div>
          </InfoRow>
        </Content>

        <Content style={{ height: '55px' }}>
          <Title>Auditoria</Title>

          <Info>
            <InfoRow style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
              <div className="row">Agente: {client.user.name}</div>
              <div className="row">
                Data Visita: {formatDateHours(client.created_at)}
              </div>
              <div className="row">Status: {client.status}</div>
              <div className="row">Evento: Primeira Ligação</div>
            </InfoRow>
          </Info>
        </Content>
      </Main>
    </Files>
  ),
);

export default FichaVisita;
