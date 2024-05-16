import React from 'react';
import { ResponseInativas } from '@/interfaces/inativas';
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
  Terms,
  Title,
} from './styles';

interface ComponentToPrintProps {
  inativas: ResponseInativas[];
}

const FichaCampo = React.forwardRef<HTMLDivElement, ComponentToPrintProps>(
  ({ inativas }, ref) => (
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
            atc,
            group,
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
            <Content>
              <Header>
                <Logo src="/assets/logos.png" />

                <div>
                  VISITA DE INATIVA/CONSUMO ZERO <br /> PIRITUBA - EXTREMO NORTE
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
                    {`${atc}.${group}.${sector}.${route}.${block}.${local}.${sublocal}.${village}`}
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

            <Content>
              <Header>
                <Logo src="/assets/logos.png" />

                <div>
                  VISITA DE INATIVA/CONSUMO ZERO <br /> PIRITUBA - EXTREMO NORTE
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
                    {`${atc}.${group}.${sector}.${route}.${block}.${local}.${sublocal}.${village}`}
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

            <Footer>
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
                <DescribeRow>Assinatura:</DescribeRow>
                <DescribeRow style={{ paddingLeft: '18rem' }}>
                  Data:
                </DescribeRow>
              </Describe>
              <Describe>
                <DescribeRow />
                <DescribeRow />
              </Describe>
            </Footer>
          </Main>
        ),
      )}
    </Files>
  ),
);

export default FichaCampo;
