import React from 'react';
import { Content, Files, Footer, Header, Logo, Main } from './styles';

interface ComponentToPrintProps {
  //
}

const OrdensServico = React.forwardRef<HTMLDivElement, ComponentToPrintProps>(
  (props, ref) => (
    <Files ref={ref}>
      <Main>
        <Content>
          <Header>
            <Logo src="/assets/logos.png" />
            <div>
              VISITA DE INATIVA/CONSUMO ZERO <br /> PIRITUBA - EXTREMO NORTE
            </div>
            <Logo src="/assets/Sabesp.svg" />
          </Header>
        </Content>

        <Content />

        <Footer />

        <Footer />
      </Main>
    </Files>
  ),
);

export default OrdensServico;
