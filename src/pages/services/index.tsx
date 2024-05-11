/* eslint-disable react/jsx-no-useless-fragment */
import Header from '@/components/Header/Header';
import RootLayout from '@/components/RootLayout/Layout';
import { getPrateleira } from '@/services/querys/inativas';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Square } from 'lucide-react';
import { useState } from 'react';
import { Block, IInativas, Route } from '@/interfaces/prateleira';
import ModalInativas from '@/components/ModalInativa/ModalInativa';
import api from '@/services/api';
import { handleError, handleSuccess } from '@/utils/message';
import { addDays, format } from 'date-fns';
import { FaDownload } from 'react-icons/fa';
import {
  TableCard,
  TableCell,
  TableComponent,
  SectionList,
  Check,
  Column,
  ButtonConfirm,
  Resume,
  ExportRow,
} from './styles';
import { ButtonImport } from '../records/styles';

interface Option {
  value: string;
  label: string;
}

const IndexPage = () => {
  const query = useQueryClient();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [sectorSelected, setSectorSelected] = useState<IInativas[]>([]);
  const [routesSelected, setRoutesSelected] = useState<Route[]>([]);
  const [blocksSelected, setBlocksSelected] = useState<Block[]>([]);
  const [date, setDate] = useState('');
  const [user, setUser] = useState<Option>();

  const { data: inativas } = useQuery({
    queryKey: ['prateleiraData'],
    queryFn: async () => getPrateleira(),
  });

  const onSubmit = async () => {
    try {
      await api.post('/inativa/send', {
        routes: blocksSelected?.map(item => ({
          sector: item?.sector,
          route: item?.route,
          block: item?.block,
        })),
        date: format(addDays(date, 1), 'dd/MM/yyyy'),
        user_id: user?.value || '',
      });

      setShowModal(false);
      handleSuccess('Ordem de serviço enviada.');
      query.invalidateQueries({ queryKey: ['prateleiraData'] });

      setUser(undefined);
      setDate('');
      setSectorSelected([]);
      setRoutesSelected([]);
      setBlocksSelected([]);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <RootLayout>
      <main>
        <Header
          title="Prateleira"
          subtitle="Importação e criação de ordem de serviço"
        />

        <ExportRow>
          <ButtonImport>
            Importar inativas
            <FaDownload
              style={{ cursor: 'pointer' }}
              color="#8cd630"
              size={22}
            />
          </ButtonImport>
        </ExportRow>

        <SectionList>
          <Column>
            Setor
            <TableComponent>
              {inativas?.map((sector, index) => (
                <TableCard
                  key={+index}
                  onClick={() => {
                    if (sectorSelected.includes(sector)) {
                      setSectorSelected(
                        sectorSelected.filter(item => item !== sector),
                      );
                      setRoutesSelected([]);
                      setBlocksSelected([]);
                      return;
                    }

                    setSectorSelected(props => [...props, sector]);
                  }}
                >
                  <TableCell style={{ textAlign: 'left', width: '30px' }}>
                    <Square className="text-secondary self-center" />
                    {sectorSelected.includes(sector) && <Check />}
                  </TableCell>

                  <TableCell style={{ textAlign: 'left' }}>
                    <div className="text-black text-xs md:text-sm xxl:base font-semibold">
                      Setor: {sector.sector}
                    </div>
                  </TableCell>

                  <TableCell style={{ textAlign: 'left', paddingLeft: '1rem' }}>
                    <div className="text-black text-xs md:text-sm xxl:base font-semibold">
                      Quantidade: {sector.count}
                    </div>
                  </TableCell>
                </TableCard>
              ))}
            </TableComponent>
          </Column>

          <Column>
            {sectorSelected?.length > 0 && 'Rota'}
            <TableComponent>
              {sectorSelected?.map(sector => (
                <>
                  {sector.routes?.map((route, indexRoute) => (
                    <TableCard
                      key={+indexRoute}
                      onClick={() => {
                        if (routesSelected.includes(route)) {
                          setRoutesSelected(
                            routesSelected.filter(item => item !== route),
                          );
                          setBlocksSelected([]);
                          return;
                        }

                        setRoutesSelected(props => [...props, route]);
                      }}
                    >
                      <TableCell style={{ textAlign: 'left', width: '30px' }}>
                        <Square className="text-secondary self-center" />
                        {routesSelected.includes(route) && <Check />}
                      </TableCell>

                      <TableCell style={{ textAlign: 'left' }}>
                        <div className="text-black text-xs md:text-sm xxl:base font-semibold">
                          Rota: {route.route}
                        </div>
                      </TableCell>

                      <TableCell
                        style={{ textAlign: 'left', paddingLeft: '1rem' }}
                      >
                        <div className="text-black text-xs md:text-sm xxl:base font-semibold">
                          Quantidade: {route.count}
                        </div>
                      </TableCell>
                    </TableCard>
                  ))}
                </>
              ))}
            </TableComponent>
          </Column>

          <Column>
            {routesSelected?.length > 0 && 'Quadra'}
            <TableComponent>
              {routesSelected?.map(route => (
                <>
                  {route.blocks?.map((block, indexBlock) => (
                    <TableCard
                      key={+indexBlock}
                      onClick={() => {
                        if (blocksSelected.includes(block)) {
                          setBlocksSelected(
                            blocksSelected.filter(item => item !== block),
                          );
                          return;
                        }

                        setBlocksSelected(props => [...props, block]);
                      }}
                    >
                      <TableCell style={{ textAlign: 'left', width: '30px' }}>
                        <Square className="text-secondary self-center" />
                        {blocksSelected.includes(block) && <Check />}
                      </TableCell>

                      <TableCell style={{ textAlign: 'left' }}>
                        <div className="text-black text-xs md:text-sm xxl:base font-semibold">
                          Quadra: {block.block}
                        </div>
                      </TableCell>

                      <TableCell
                        style={{ textAlign: 'left', paddingLeft: '1rem' }}
                      >
                        <div className="text-black text-xs md:text-sm xxl:base font-semibold">
                          Quantidade: {block.count}
                        </div>
                      </TableCell>
                    </TableCard>
                  ))}
                </>
              ))}
            </TableComponent>
          </Column>

          {blocksSelected?.length > 0 && (
            <TableComponent
              style={{
                justifyContent: 'flex-end',
                alignItems: 'end',
                marginTop: '4rem',
                paddingLeft: '2rem',
              }}
            >
              <ButtonConfirm type="button" onClick={() => setShowModal(true)}>
                Criar roteiro
              </ButtonConfirm>
            </TableComponent>
          )}
        </SectionList>

        {showModal && (
          <ModalInativas
            onClose={() => setShowModal(false)}
            onFunction={onSubmit}
            setDate={setDate}
            date={date}
            setUser={setUser}
            user={user}
          >
            <Resume>
              <span>Setores: </span>
              {sectorSelected?.map(sector => sector.sector).join(', ')}
              <br />
              <span>Rotas: </span>
              {routesSelected?.map(route => route.route).join(', ')}
              <br />
              <span>Quadras: </span>
              {blocksSelected?.map(block => block.block).join(', ')}
              <br />
              <br />
              <span>Quantidades: </span>
              {blocksSelected?.reduce((total, obg) => total + obg.count, 0)}
            </Resume>
          </ModalInativas>
        )}
      </main>
    </RootLayout>
  );
};

export default IndexPage;
