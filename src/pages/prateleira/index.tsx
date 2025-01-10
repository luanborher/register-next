import { useEffect, useRef, useState } from 'react';
import { Square, BookOpenCheck } from 'lucide-react';
import { addDays, format } from 'date-fns';
import { useReactToPrint } from 'react-to-print';
import {
  FaFileImport,
  FaFileCirclePlus,
  FaArrowRightArrowLeft,
} from 'react-icons/fa6';
import { useQueryClient } from '@tanstack/react-query';
import Header from '@/components/Header/Header';
import RootLayout from '@/components/RootLayout/Layout';
import { usePrateleira } from '@/services/querys/inativas';
import ModalInativas from '@/components/Modals/ModalInativa/ModalInativa';
import Loading from '@/components/Modals/Loading/Loading';
import FichaCampo from '@/components/Pdfs/FichaCampo/FichaCampo';
import { Block, IInativas, Route } from '@/interfaces/prateleira';
import ModalImport from '@/components/Modals/ModalImport/ModalImport';
import { handleError, handleSuccess } from '@/utils/message';
import { ResponseInativas } from '@/interfaces/inativas';
import api from '@/services/api';
import ModalSendPDE from '@/components/Modals/ModalSendPDE/ModalSendPDE';
import Select from '@/components/Select/Select';
import { useForm } from 'react-hook-form';
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
  SendButton,
  ButtonImport,
  ButtonWrapper,
  TableHeader,
  FileCountBadge,
} from './styles';

interface Option {
  value: string;
  label: string;
}

const IndexPage = () => {
  const query = useQueryClient();
  const componentRef = useRef<HTMLDivElement>(null);

  const [showModal, setShowModal] = useState(false);
  const [showModalPDE, setShowModalPDE] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sectorSelected, setSectorSelected] = useState<IInativas[]>([]);
  const [routesSelected, setRoutesSelected] = useState<Route[]>([]);
  const [blocksSelected, setBlocksSelected] = useState<Block[]>([]);
  const [response, setInativas] = useState<ResponseInativas[]>([]);
  const [total, settotal] = useState(0);
  const [date, setDate] = useState('');
  const [user, setUser] = useState<Option>();
  const [file, setFile] = useState<File>();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowWidth(window.innerWidth);
    });
  }, []);

  const { setValue, watch } = useForm();

  const prateleiraParams = {
    type: watch('type')?.value,
  };

  const { data: inativas } = usePrateleira(prateleiraParams);

  const sortedInativas = inativas?.sort((a, b) =>
    a.sector.localeCompare(b.sector, 'pt', {
      numeric: true,
      sensitivity: 'base',
    }),
  );

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
        type: watch('type')?.value,
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

  const calculateTotalCount = () => {
    if (blocksSelected.length > 0) {
      return blocksSelected.reduce((total, block) => total + block.count, 0);
    }
    if (routesSelected.length > 0) {
      return routesSelected.reduce((total, route) => total + route.count, 0);
    }
    if (sectorSelected.length > 0) {
      return sectorSelected.reduce((total, sector) => total + sector.count, 0);
    }
    return 0;
  };

  useEffect(() => {
    settotal(calculateTotalCount());
  }, [sectorSelected, routesSelected, blocksSelected]);

  return (
    <RootLayout>
      <main>
        <Header title="Prateleira" />

        <ExportRow>
          <Select
            id="type"
            placeholder="Selecione..."
            onChange={e => e && setValue('type', e)}
            defaultValue={{
              value: 'AMBOS',
              label: 'Todos (Inativas/ C. Zero)',
            }}
            isClearable={false}
            width={windowWidth <= 920 ? '200px' : '350px'}
            height="30px"
            options={[
              { value: 'AMBOS', label: 'Todos (Inativas/ C. Zero)' },
              { value: 'INATIVA', label: 'Inativas' },
              { value: 'CONSUMO ZERO', label: 'Consumo Zero' },
            ]}
          />

          <ButtonWrapper>
            <ButtonImport>
              <FaFileImport className="icon" />
              Importar inativas
              <input
                type="file"
                accept=".xlsx, .xls, .csv, .xlsm"
                onChange={e => {
                  setFile(e?.target?.files?.[0]);
                  e.target.value = '';
                }}
              />
            </ButtonImport>

            <SendButton onClick={() => setShowModalPDE(true)}>
              <FaFileCirclePlus />
              Enviar PDE
            </SendButton>
          </ButtonWrapper>
        </ExportRow>

        <FileCountBadge>
          {calculateTotalCount()} Ordens selecionada
        </FileCountBadge>

        <SectionList>
          <Column>
            <TableHeader>
              Setor
              <SelectedAllCard
                onClick={() => onSelectedSectorAll(inativas || [])}
              >
                Selecionar todos
                <CheckBox>
                  <Square />
                  {sectorSelected?.length === inativas?.length && <Check />}
                </CheckBox>
              </SelectedAllCard>
            </TableHeader>

            <TableComponent>
              {sortedInativas?.map((sector, i) => (
                <TableCard
                  key={+i}
                  active={sectorSelected.includes(sector)}
                  onClick={() => onSelectedSector(sector)}
                >
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

          <FaArrowRightArrowLeft size={22} color="#8BD630" />

          <Column>
            <TableHeader>
              Rota
              <SelectedAllCard onClick={onSelectedRouteAll}>
                Selecionar todos
                <CheckBox>
                  <Square />
                  {routesSelected?.length ===
                    sectorSelected?.flatMap(item => item.routes)?.length && (
                    <Check />
                  )}
                </CheckBox>
              </SelectedAllCard>
            </TableHeader>

            <TableComponent>
              {sectorSelected?.map(sector =>
                sector.routes
                  ?.sort((a, b) =>
                    a.route.localeCompare(b.route, 'pt', {
                      numeric: true,
                      sensitivity: 'base',
                    }),
                  )
                  .map((route, i) => (
                    <TableCard
                      key={+i}
                      active={routesSelected.includes(route)}
                      onClick={() => onSelectedRoute(route)}
                    >
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
                  )),
              )}
            </TableComponent>
          </Column>

          <FaArrowRightArrowLeft size={22} color="#8BD630" />

          <Column>
            <TableHeader>
              Quadra
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
            </TableHeader>

            <TableComponent>
              {routesSelected?.map(route =>
                route.blocks
                  ?.sort((a, b) =>
                    a.block.localeCompare(b.block, 'pt', {
                      numeric: true,
                      sensitivity: 'base',
                    }),
                  )
                  .map((block, i) => (
                    <TableCard
                      key={+i}
                      active={blocksSelected.includes(block)}
                      onClick={() => onSelectedBlock(block)}
                    >
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
                  )),
              )}
            </TableComponent>
          </Column>
        </SectionList>

        <ActionSection>
          <ButtonConfirm
            disabled={blocksSelected?.length <= 0}
            onClick={() => setShowModal(true)}
          >
            Criar roteiro
          </ButtonConfirm>
        </ActionSection>

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

        {showModalPDE && (
          <ModalSendPDE onClose={() => setShowModalPDE(false)} />
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
