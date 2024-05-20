/* eslint-disable react/jsx-no-useless-fragment */
import Header from '@/components/Header/Header';
import RootLayout from '@/components/RootLayout/Layout';
import { getPrateleira } from '@/services/querys/inativas';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Square, BookOpenCheck } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Block, IInativas, Route } from '@/interfaces/prateleira';
import ModalInativas from '@/components/Modals/ModalInativa/ModalInativa';
import api from '@/services/api';
import { handleError, handleSuccess } from '@/utils/message';
import { addDays, format } from 'date-fns';
import { FaDownload } from 'react-icons/fa';
import ModalImport from '@/components/Modals/ModalImport/ModalImport';
import { useReactToPrint } from 'react-to-print';
import FichaCampo from '@/components/Pdfs/FichaCampo/FichaCampo';
import { ResponseInativas } from '@/interfaces/inativas';
import Loading from '@/components/Modals/Loading/Loading';
import { ButtonImport } from '../records/styles';
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
  Hidden,
  ImportRow,
  ActionSection,
  SelectedAllCard,
  CheckBox,
  Quantity,
  Label,
} from './styles';

interface Option {
  value: string;
  label: string;
}

const IndexPage = () => {
  const query = useQueryClient();
  const componentRef = useRef<HTMLDivElement>(null);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [sectorSelected, setSectorSelected] = useState<IInativas[]>([]);
  const [routesSelected, setRoutesSelected] = useState<Route[]>([]);
  const [blocksSelected, setBlocksSelected] = useState<Block[]>([]);
  const [response, setInativas] = useState<ResponseInativas[]>([]);

  const [total, settotal] = useState(0);
  const [date, setDate] = useState('');
  const [user, setUser] = useState<Option>();
  const [file, setFile] = useState<File>();

  const { data: inativas } = useQuery({
    queryKey: ['prateleiraData'],
    queryFn: async () => getPrateleira(),
  });

  const handlePrint = useReactToPrint({
    content: () => componentRef.current as HTMLDivElement,
  });

  const clear = {
    all: () => {
      setShowModal(false);
      setSectorSelected([]);
      setRoutesSelected([]);
      setBlocksSelected([]);
    },
    sector: () => {
      setRoutesSelected([]);
      setBlocksSelected([]);
    },
    route: () => {
      setBlocksSelected([]);
    },
  } as any;

  const onSubmit = async () => {
    try {
      setInativas([]);
      setLoading(true);

      const { data } = await api.post('/inativa/send', {
        routes: blocksSelected?.map(item => ({
          sector: item?.sector,
          route: item?.route,
          block: item?.block,
        })),
        date: format(addDays(date, 1), 'dd/MM/yyyy'),
        user_id: user?.value || '',
      });

      const response = data?.flat() || [];

      settotal(blocksSelected?.reduce((t, o) => t + o.count, 0));
      setInativas(response);

      clear.all();
      query.invalidateQueries({ queryKey: ['prateleiraData'] });
      handleSuccess('Ordem de serviço enviada.');
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (response && response?.length > 0) {
      handlePrint();
    }
  }, [response]);

  const onSubmitImport = async () => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        await api.post('/inativa/import', formData);

        setFile(undefined);
        handleSuccess('Importação realizada sucesso.');
        query.invalidateQueries({ queryKey: ['prateleiraData'] });
      } catch (error) {
        setFile(undefined);
        handleError(error);
      }
    }
  };

  const onSelectedSectorAll = (sectors: IInativas[]) => {
    if (sectorSelected?.length === inativas?.length) return clear.all();
    setSectorSelected(sectors);
  };

  const onSelectedSector = (sector: IInativas) => {
    if (sectorSelected.includes(sector)) {
      setSectorSelected(sectorSelected.filter(item => item !== sector));
      return clear.sector();
    }
    setSectorSelected(props => [...props, sector]);
  };

  const onSelectedRouteAll = () => {
    const routes = sectorSelected?.flatMap(item => item.routes);
    if (routesSelected?.length === routes?.length) return clear.sector();
    setRoutesSelected(routes);
  };

  const onSelectedRoute = (route: Route) => {
    if (routesSelected.includes(route)) {
      setRoutesSelected(routesSelected.filter(item => item !== route));
      return clear.route();
    }
    setRoutesSelected(props => [...props, route]);
  };

  const onSelectedBlockAll = () => {
    const blocks = routesSelected?.flatMap(item => item.blocks);
    if (blocksSelected?.length === blocks?.length) return clear.route();
    setBlocksSelected(blocks);
  };

  const onSelectedBlock = (block: Block) => {
    if (blocksSelected.includes(block)) {
      return setBlocksSelected(blocksSelected.filter(item => item !== block));
    }
    setBlocksSelected(props => [...props, block]);
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
            <FaDownload className="icon" />
            <input
              type="file"
              accept=".xlsx, .xls, .csv, .xlsm"
              onChange={e => {
                setFile(e?.target?.files?.[0]);
                e.target.value = '';
              }}
            />
          </ButtonImport>
        </ExportRow>

        <SectionList>
          <Column>
            {inativas && inativas?.length > 0 && 'Setor'}

            {inativas && inativas?.length > 0 && (
              <SelectedAllCard onClick={() => onSelectedSectorAll(inativas)}>
                <CheckBox>
                  <Square />
                  {sectorSelected?.length === inativas?.length && <Check />}
                </CheckBox>
                Selecionar todos
              </SelectedAllCard>
            )}

            <TableComponent>
              {inativas?.map((sector, i) => (
                <TableCard key={+i} onClick={() => onSelectedSector(sector)}>
                  <CheckBox>
                    <Square />
                    {sectorSelected.includes(sector) && <Check />}
                  </CheckBox>
                  <TableCell>
                    <Label>
                      <strong>Setor: </strong> {sector.sector}
                    </Label>
                  </TableCell>
                  <Quantity>
                    <Label>
                      <strong>Quantidade: </strong> {sector.count}
                    </Label>
                  </Quantity>
                </TableCard>
              ))}
            </TableComponent>
          </Column>

          <Column>
            {sectorSelected?.length > 0 && 'Rota'}

            {sectorSelected?.length > 0 && (
              <SelectedAllCard onClick={onSelectedRouteAll}>
                <CheckBox>
                  <Square />
                  {routesSelected?.length ===
                    sectorSelected?.flatMap(item => item.routes)?.length && (
                    <Check />
                  )}
                </CheckBox>
                Selecionar todos
              </SelectedAllCard>
            )}

            <TableComponent>
              {sectorSelected?.map(sector => (
                <>
                  {sector.routes?.map((route, i) => (
                    <TableCard key={+i} onClick={() => onSelectedRoute(route)}>
                      <CheckBox>
                        <Square />
                        {routesSelected.includes(route) && <Check />}
                      </CheckBox>
                      <TableCell>
                        <Label>
                          <strong>Rota: </strong> {route.route}
                        </Label>
                      </TableCell>
                      <Quantity>
                        <Label>
                          <strong>Quantidade: </strong> {route.count}
                        </Label>
                      </Quantity>
                    </TableCard>
                  ))}
                </>
              ))}
            </TableComponent>
          </Column>

          <Column>
            {routesSelected?.length > 0 && 'Quadra'}

            {routesSelected?.length > 0 && (
              <SelectedAllCard onClick={onSelectedBlockAll}>
                <CheckBox>
                  <Square />
                  {blocksSelected?.length ===
                    routesSelected?.flatMap(item => item.blocks)?.length && (
                    <Check />
                  )}
                </CheckBox>
                Selecionar todos
              </SelectedAllCard>
            )}

            <TableComponent>
              {routesSelected?.map(route => (
                <>
                  {route.blocks?.map((block, i) => (
                    <TableCard key={+i} onClick={() => onSelectedBlock(block)}>
                      <CheckBox>
                        <Square />
                        {blocksSelected.includes(block) && <Check />}
                      </CheckBox>
                      <TableCell>
                        <Label>
                          <strong>Quadra: </strong> {block.block}
                        </Label>
                      </TableCell>
                      <Quantity>
                        <Label>
                          <strong>Quantidade: </strong> {block.count}
                        </Label>
                      </Quantity>
                    </TableCard>
                  ))}
                </>
              ))}
            </TableComponent>
          </Column>

          {blocksSelected?.length > 0 && (
            <ActionSection>
              <ButtonConfirm onClick={() => setShowModal(true)}>
                Criar roteiro
              </ButtonConfirm>
            </ActionSection>
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

      {file && (
        <ModalImport>
          <BookOpenCheck size={90} color="white" />
          <div>{file?.name || 'Arquivo selecionado'}</div>
          <ImportRow>
            <ButtonConfirm cancel onClick={() => setFile(undefined)}>
              Cancelar
            </ButtonConfirm>
            <ButtonConfirm onClick={onSubmitImport}>Importar</ButtonConfirm>
          </ImportRow>
        </ModalImport>
      )}

      <Hidden>
        <FichaCampo
          ref={componentRef}
          inativas={response}
          contract="PIRITUBA - EXTREMO NORTE"
          total={total || 0}
          date={date ? format(addDays(date, 1), 'dd/MM/yyyy') : '__/__/____'}
          user={user?.label}
        />
      </Hidden>

      {loading && <Loading />}
    </RootLayout>
  );
};

export default IndexPage;
