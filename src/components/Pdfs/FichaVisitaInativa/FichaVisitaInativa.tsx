import React from 'react';

import { InativasSent } from '@/interfaces/inativas';
import { format, parseISO } from 'date-fns';
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
  client: InativasSent;
  community: string;
  pde: string;
  cep: string;
  situation: string;
  fornecimento: string;
  property_type: string;
}

const status = {
  REVIEW: 'Em análise',
  SENT: 'Pendente',
  VALIDATED: 'Validado',
  STAND_BY: 'Prateleira',
} as any;

const FichaVisitaInativa = React.forwardRef<
  HTMLDivElement,
  ComponentToPrintProps
>(
  (
    { client, community, pde, cep, situation, fornecimento, property_type },
    ref,
  ) => (
    <Files ref={ref}>
      <Main key={1}>
        <Content style={{ height: '165px' }}>
          <Header>
            <Logo src="/assets/logos.png" />

            <div>
              Saneamento Básico do Estado de São Paulo <br />
              INATIVA - CONSUMO ZERO <br />
              COMPROVANTE DE VISITA
            </div>

            <Logo src="/assets/Sabesp.svg" />
          </Header>

          <Info>
            <InfoRow style={{ gridTemplateColumns: '2fr 1fr' }}>
              <div className="row">Cliente: {client?.name}</div>
              <div className="row">CPF/CNPJ: {client?.cpf}</div>
            </InfoRow>
            <InfoRow>
              <div className="row">RG: {client?.rg}</div>
              <div className="row">Data de Nasc.: {client?.birthDate}</div>
              <div className="row">
                Chefe de familia: {client?.headedFamily}
              </div>
            </InfoRow>
            <InfoRow>
              <div className="row">Telefone: {client?.phone1}</div>
              <div className="row">Ocupação: {client?.headedFamily}</div>
              <div className="row">Situação Habitação: {client?.owner}</div>
            </InfoRow>
          </Info>
        </Content>

        <Content style={{ height: '140px' }}>
          <Title>INFORMAÇÕES DO IMÓVEL</Title>

          <Info>
            <InfoRow>
              <div className="row">PDE: {pde}</div>
              <div className="row">Hidrômetro: {client?.hydrometer}</div>
              <div className="row">Qtd. Economia: {client?.qntEconomies}</div>
            </InfoRow>
            <InfoRow style={{ gridTemplateColumns: '2fr 1fr' }}>
              <div>
                Endereço:{' '}
                {`${client?.address || ''} ${
                  client?.number && `, ${client?.number}`
                } ${client?.complement && `, ${client?.complement}`}`}
              </div>
              <div className="row">Comunidade: {community}</div>
            </InfoRow>
            <InfoRow>
              <div className="row">Contrato:</div>
              <div className="row">Entre Números: {client?.betweenNumbers}</div>
              <div className="row">CEP: {cep}</div>
            </InfoRow>
            <InfoRow>
              <div className="row">Estrutura Imóvel:</div>
              <div className="row">Leito:</div>
              <div className="row">Passeio:</div>
            </InfoRow>
            <InfoRow>
              <div className="row">Fornecimento.: {fornecimento}</div>
              <div className="row">Situação Imóvel: {situation}</div>
              <div className="row">Tipo Imóvel: {property_type}</div>
            </InfoRow>
          </Info>
        </Content>

        <Content style={{ height: '185px' }}>
          <Title>DADOS SOCIOECONÔMICOS</Title>

          <Info>
            <InfoRow style={{ gridTemplateColumns: '2fr 1fr' }}>
              <div className="row">Provedora: {client?.headedFamily}</div>
              <div className="row">
                Nº Pessoas Trabalhando: {client?.qntWorkers}
              </div>
            </InfoRow>
            <InfoRow style={{ gridTemplateColumns: '2fr 1fr' }}>
              <div className="row">
                Nº Adulto (19 a 59 anos): {client?.qntAdults}
              </div>
              <div className="row">
                Nº Crianca (0 a 12 anos): {client?.qntChildren}
              </div>
            </InfoRow>
            <InfoRow style={{ gridTemplateColumns: '1fr' }}>
              <div className="row">Qual a renda familiar?</div>
            </InfoRow>
            <InfoRow style={{ gridTemplateColumns: '1fr' }}>
              <div className="row">{client?.income || ''}</div>
            </InfoRow>
            <InfoRow style={{ gridTemplateColumns: '1fr' }}>
              <div className="row">
                Possui Caixa de agua? {client?.hasWaterBox || ''}
              </div>
            </InfoRow>
            <InfoRow style={{ gridTemplateColumns: '1fr' }}>
              <div className="row">Tempo de ocupação da propriedade? </div>
            </InfoRow>
            <InfoRow style={{ gridTemplateColumns: '1fr' }}>
              <div className="row">{client?.occupancyTime || ''}</div>
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
              <Image src={client?.documentPic1 || ''} alt="" />
            </div>
            <div className="row">
              <Image src={client?.documentPic2 || ''} alt="" />
            </div>
            <div className="row">
              <Image src={client?.facadePic || ''} alt="" />
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
              <Image src={client?.signature || ''} alt="" />
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
              <div className="row">Agente: </div>
              <div className="row">
                Data Visita:{' '}
                {client?.created_at
                  ? format(parseISO(client?.created_at), 'dd/MM/yyyy')
                  : ''}
              </div>
              <div className="row">Status: {status[client?.status] || ''}</div>
              <div className="row">Evento: Consumo Zero</div>
            </InfoRow>
          </Info>
        </Content>
      </Main>
    </Files>
  ),
);

export default FichaVisitaInativa;
