import React from 'react';
import { ResponseInativas } from '@/interfaces/inativas';
import { formatCod } from '@/utils/codification';
import {
  Content,
  Describe,
  DescribeColumn,
  DescribeRow,
  Files,
  Footer,
  Header,
  Info,
  InfoRow,
  Item,
  Logo,
  Main,
  Materiais,
  Separator,
  Terms,
  Title,
  Name,
  HeaderList,
  Column,
  Row,
  NameColumn,
} from './styles';

interface ComponentToPrintProps {
  inativas: ResponseInativas[];
  contract: string;
  date: string;
  total?: number;
  user?: string;
}

const FichaCampo = React.forwardRef<HTMLDivElement, ComponentToPrintProps>(
  ({ inativas, contract, date, user, total }, ref) => (
    <Files ref={ref}>
      {inativas?.map(
        (
          {
            pde,
            community,
            type,
            name,
            hidrometer,
            number,
            street,
            block,
            local,
            route,
            sector,
            sublocal,
            village,
            complement,
          },
          index,
        ) => (
          <Main key={Number(index)}>
            <Content style={{ height: '320px' }}>
              <Header>
                <Logo src="/assets/logos.png" />

                <div>
                  COMPROVANTE DE VISITA DE INATIVA/CONSUMO ZERO <br />
                  {contract}
                </div>

                <Logo src="/assets/Sabesp.svg" />
              </Header>

              <Info>
                <InfoRow>
                  <div className="row">Pde: {pde}</div>
                  <div className="row">
                    Comunidade: {community.toUpperCase()}
                  </div>
                  <div className="row">Motivo: {type.toUpperCase()}</div>
                </InfoRow>
                <InfoRow style={{ gridTemplateColumns: '1fr 1fr' }}>
                  <div className="row">Cliente: {name.toUpperCase()}</div>
                  <div className="row">
                    Hidrômetro: {hidrometer.toUpperCase()}
                  </div>
                </InfoRow>
                <InfoRow style={{ gridTemplateColumns: '1fr' }}>
                  <div>
                    Endereço:{' '}
                    {`${street.toUpperCase()} ${number && `, ${number}`} ${
                      complement && `, ${complement.toUpperCase()}`
                    }`}
                  </div>
                </InfoRow>
                <InfoRow>
                  <div className="row">
                    Cod.:{' '}
                    <span>
                      {`${formatCod(sector, 3)}.${formatCod(
                        route,
                        3,
                      )}.${formatCod(block, 4)}.${formatCod(
                        local,
                        4,
                      )}.${formatCod(sublocal, 4)}.${formatCod(village, 4)}`}
                    </span>
                  </div>
                  <div className="row">Setor: {sector}</div>
                  <div className="row">Serviço: {type.toUpperCase()}</div>
                </InfoRow>
              </Info>

              <Title>
                TERMO DE RESPONSABILIDADE PELO IMÓVEL E UTILIZAÇÃO DOS SERVIÇOS
                PRESTADOS - VIA CLIENTE
              </Title>

              <Terms>
                Declaro a paritr desta data que autorizo a reativação e/ ou
                religação do imóvel a cima, e estou ciente da obrigatoriedade de
                manter o cadastro atualizado conforme orientação da visita,
                estando ciente também que, caso deixe de ser responsável pelo
                pagamento das contas de consumo de água e/ou esgoto do (s)
                imóvel (is), devo entrar em contato com a Sabesp para solicitar
                o encerramento da relação contratual, sob pena de se manter
                responsável pelos débitos caso não avise. Tendo em vista que no
                endereço em questão foi efetuado a troca do hidrômetro,
                atualização de dados pessoais do titular.
                <Describe>
                  <DescribeRow style={{ padding: '0', border: 'none' }}>
                    Assinatura cliente:
                    __________________________________________________________________
                  </DescribeRow>
                  <DescribeRow style={{ width: '235px', border: 'none' }}>
                    Data: {date}
                  </DescribeRow>
                </Describe>
              </Terms>
            </Content>

            <Separator />

            <Content>
              <Header>
                <Logo src="/assets/logos.png" />

                <div>
                  COMPROVANTE DE VISITA DE INATIVA/CONSUMO ZERO <br />
                  {contract}
                </div>

                <Logo src="/assets/Sabesp.svg" />
              </Header>

              <Info>
                <InfoRow>
                  <div className="row">Pde: {pde}</div>
                  <div className="row">
                    Comunidade: {community.toUpperCase()}
                  </div>
                  <div className="row">Motivo: {type.toUpperCase()}</div>
                </InfoRow>
                <InfoRow style={{ gridTemplateColumns: '1fr 1fr' }}>
                  <div className="row">Cliente: {name.toUpperCase()}</div>
                  <div className="row">
                    Hidrômetro: {hidrometer.toUpperCase()}
                  </div>
                </InfoRow>
                <InfoRow style={{ gridTemplateColumns: '1fr' }}>
                  <div>
                    Endereço:{' '}
                    {`${street.toUpperCase()} ${number && `, ${number}`} ${
                      complement && `, ${complement.toUpperCase()}`
                    }`}
                  </div>
                </InfoRow>
                <InfoRow>
                  <div className="row">
                    Cod.:{' '}
                    <span>
                      {`${formatCod(sector, 3)}.${formatCod(
                        route,
                        3,
                      )}.${formatCod(block, 4)}.${formatCod(
                        local,
                        4,
                      )}.${formatCod(sublocal, 4)}.${formatCod(village, 4)}`}
                    </span>
                  </div>
                  <div className="row">Setor: {sector}</div>
                  <div className="row">Serviço: {type.toUpperCase()}</div>
                </InfoRow>
              </Info>

              <Title>
                TERMO DE RESPONSABILIDADE PELO IMÓVEL E UTILIZAÇÃO DOS SERVIÇOS
                PRESTADOS - VIA SABESP
              </Title>

              <Terms>
                Declaro a paritr desta data que autorizo a reativação e/ ou
                religação do imóvel a cima, e estou ciente da obrigatoriedade de
                manter o cadastro atualizado conforme orientação da visita,
                estando ciente também que, caso deixe de ser responsável pelo
                pagamento das contas de consumo de água e/ou esgoto do (s)
                imóvel (is), devo entrar em contato com a Sabesp para solicitar
                o encerramento da relação contratual, sob pena de se manter
                responsável pelos débitos caso não avise. Tendo em vista que no
                endereço em questão foi efetuado a troca do hidrômetro,
                atualização de dados pessoais do titular.
              </Terms>
            </Content>

            <Footer style={{ height: '210px' }}>
              <Materiais>
                <Item>_______ Adaptador ¾ PVC marrom macho/femea</Item>
                <Item>_______ Cotovelo ¾ PVC branco rosca/rosca</Item>
              </Materiais>
              <Materiais>
                <Item>_______ Cotovelo ¾ PVC marrom cola/cola</Item>
                <Item>_______ Cotovelo ¾ PVC marrom col/rosca</Item>
              </Materiais>
              <Materiais>
                <Item>_______ Dispositivo med metal DN 20 (kit caixa uma)</Item>
                <Item>_______ Guarnição</Item>
              </Materiais>
              <Materiais>
                <Item>_______ Hidro taquim extrem rosc dn20_QN0 (hidro)</Item>
                <Item>_______ Lacre bege</Item>
              </Materiais>
              <Materiais>
                <Item>_______ Luva ¾ PVC branco rosca/rosca</Item>
                <Item>_______ Luva ¾ PVC marrom cola/cola</Item>
              </Materiais>
              <Materiais>
                <Item>_______ Luva ¾ PVC marrom cola/cola</Item>
                <Item>_______ Niple ¾</Item>
              </Materiais>
              <Materiais>
                <Item>_______ Porca</Item>
                <Item>_______ Registro esfera ¾ PVC marrom</Item>
              </Materiais>
              <Materiais>
                <Item>_______ Registro esfera ¾ PVC marrom macho/femea</Item>
                <Item>_______ Tee ¾ PVC branco rosca/rosca</Item>
              </Materiais>
              <Materiais>
                <Item>_______ Tee ¾ PVC marrom cola/cola</Item>
                <Item>_______ Tee ¾ PVC marrom cola/rosca</Item>
              </Materiais>
              <Materiais>
                <Item>_______ Tubete curto</Item>
                <Item>_______ Tubete longo</Item>
              </Materiais>
              <Materiais>
                <Item>_______ Tubo ½ PVC branco</Item>
                <Item>_______ Tubo ¾ PVC marrom</Item>
              </Materiais>
              <Materiais>
                <Item>_______ Tubo ¾ PVC branco</Item>
                <Item />
              </Materiais>
            </Footer>

            <Footer>
              <Describe>
                <DescribeRow>Observações:</DescribeRow>
                <DescribeColumn>colar etiqueta hidrômetro</DescribeColumn>
              </Describe>
              <Describe>
                <DescribeRow />
                <DescribeColumn />
              </Describe>
              <Describe>
                <DescribeRow />
                <DescribeColumn style={{ borderBottom: '1px solid black' }} />
              </Describe>
              <Describe>
                <DescribeRow />
                <DescribeColumn style={{ borderBottom: '1px solid black' }}>
                  Anotar nº lacre abaixo:
                </DescribeColumn>
              </Describe>
              <Describe>
                <DescribeRow>Assinatura cliente:</DescribeRow>
                <DescribeRow style={{ paddingLeft: '15rem' }}>
                  Data: {date}
                </DescribeRow>
              </Describe>
              <Describe>
                <DescribeRow style={{ borderBottom: 'none' }}>
                  Funcionário: {user}
                </DescribeRow>
                <DescribeRow
                  style={{ paddingLeft: '15rem', borderBottom: 'none' }}
                >
                  Matrícula:
                </DescribeRow>
              </Describe>
            </Footer>
          </Main>
        ),
      )}

      {user && (
        <Main>
          <HeaderList>
            <Header>
              <Logo src="/assets/logos.png" />
              <div>VISITA DE INATIVA/CONSUMO ZERO - {date}</div>
              <Logo src="/assets/Sabesp.svg" />
            </Header>

            <Name>
              <NameColumn>Funcionário: {user}</NameColumn>
              <NameColumn>Quantidade: {total}</NameColumn>
            </Name>
          </HeaderList>

          <Content style={{ borderBottom: 'none', height: 'auto' }}>
            <Row>
              <Column style={{ fontWeight: '500', maxWidth: '40px' }}>
                QTD
              </Column>
              <Column style={{ fontWeight: '500', maxWidth: '100px' }}>
                PDE
              </Column>
              <Column style={{ maxWidth: '150px', fontWeight: '500' }}>
                Tipo de serviço
              </Column>
              <Column style={{ fontWeight: '500', maxWidth: '40px' }}>
                Setor
              </Column>
              <Column style={{ fontWeight: '500', maxWidth: '40px' }}>
                Rota
              </Column>
              <Column style={{ fontWeight: '500', maxWidth: '50px' }}>
                Quadra
              </Column>
              <Column style={{ fontWeight: '500', maxWidth: '40px' }}>
                Local
              </Column>
              <Column style={{ fontWeight: '500', maxWidth: '58px' }}>
                Sublocal
              </Column>
              <Column style={{ fontWeight: '500', maxWidth: '40px' }}>
                Vila
              </Column>
              <Column
                style={{
                  borderRight: 'none',
                  fontWeight: '500',
                }}
              >
                Retorno
              </Column>
            </Row>
            {inativas?.map(
              (
                { pde, type, block, local, route, sector, sublocal, village },
                index,
              ) => (
                <Row key={+index}>
                  <Column style={{ maxWidth: '40px' }}>1</Column>
                  <Column style={{ maxWidth: '100px' }}>{pde}</Column>
                  <Column style={{ maxWidth: '150px' }}>{type}</Column>
                  <Column style={{ maxWidth: '40px' }}>
                    {formatCod(sector, 3)}
                  </Column>
                  <Column style={{ maxWidth: '40px' }}>
                    {formatCod(route, 3)}
                  </Column>
                  <Column style={{ maxWidth: '50px' }}>
                    {formatCod(block, 4)}
                  </Column>
                  <Column style={{ maxWidth: '40px' }}>
                    {formatCod(local, 4)}
                  </Column>
                  <Column style={{ maxWidth: '58px' }}>
                    {formatCod(sublocal, 4)}
                  </Column>
                  <Column style={{ maxWidth: '40px' }}>
                    {formatCod(village, 4)}
                  </Column>
                  <Column style={{ borderRight: 'none' }} />
                </Row>
              ),
            )}
          </Content>

          <Footer style={{ height: '80px' }}>
            <Describe style={{ height: '100%' }}>
              <DescribeRow style={{ borderBottom: 'none' }}>
                Funcionário: ___________________________________________
              </DescribeRow>
              <DescribeRow style={{ borderBottom: 'none' }}>
                Atendente: ___________________________________________
              </DescribeRow>
            </Describe>
          </Footer>
        </Main>
      )}
    </Files>
  ),
);

export default FichaCampo;
