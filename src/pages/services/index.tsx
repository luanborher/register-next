/* eslint-disable react/jsx-no-useless-fragment */
import Header from '@/components/Header/Header';
import RootLayout from '@/components/RootLayout/Layout';
import { getPrateleira } from '@/services/querys/inativas';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Square, BookOpenCheck } from 'lucide-react';
import { useRef, useState } from 'react';
import { Block, IInativas, Route } from '@/interfaces/prateleira';
import ModalInativas from '@/components/Modals/ModalInativa/ModalInativa';
import api from '@/services/api';
import { handleError, handleSuccess } from '@/utils/message';
import { addDays, format } from 'date-fns';
import { FaDownload } from 'react-icons/fa';
import ModalImport from '@/components/Modals/ModalImport/ModalImport';
import { useReactToPrint } from 'react-to-print';
import ComponentToPrint from '@/components/FileComponent/FileComponent';
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
} from './styles';

interface Option {
  value: string;
  label: string;
}

const IndexPage = () => {
  const query = useQueryClient();
  const componentRef = useRef<HTMLDivElement>(null);

  const [showModal, setShowModal] = useState(false);

  const [sectorSelected, setSectorSelected] = useState<IInativas[]>([]);
  const [routesSelected, setRoutesSelected] = useState<Route[]>([]);
  const [blocksSelected, setBlocksSelected] = useState<Block[]>([]);

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
      setUser(undefined);
      setShowModal(false);
      setDate('');
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
      const { data } = await api.post('/inativa/send', {
        routes: blocksSelected?.map(item => ({
          sector: item?.sector,
          route: item?.route,
          block: item?.block,
        })),
        date: format(addDays(date, 1), 'dd/MM/yyyy'),
        user_id: user?.value || '',
      });

      clear.all();
      query.invalidateQueries({ queryKey: ['prateleiraData'] });
      handleSuccess('Ordem de serviço enviada.');
      handlePrint();
    } catch (error) {
      handleError(error);
    }
  };

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

  const onSelectedSector = (sector: IInativas) => {
    if (sectorSelected.includes(sector)) {
      setSectorSelected(sectorSelected.filter(item => item !== sector));
      return clear.sector();
    }
    setSectorSelected(props => [...props, sector]);
  };

  const onSelectedSectorAll = (sectors: IInativas[]) => {
    if (sectorSelected?.length === inativas?.length) {
      return clear.sector();
    }
    setSectorSelected(sectors);
  };

  const onSelectedRoute = (route: Route) => {
    if (routesSelected.includes(route)) {
      setRoutesSelected(routesSelected.filter(item => item !== route));
      return clear.route();
    }
    setRoutesSelected(props => [...props, route]);
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
            <FaDownload
              style={{ cursor: 'pointer' }}
              color="#8cd630"
              size={22}
            />
            <input
              type="file"
              accept=".xlsx, .xls, .csv, .xlsm"
              hidden
              onChange={e => {
                if (e.target?.files?.[0]) {
                  setFile(e.target.files[0]);
                  e.target.value = '';
                }
              }}
            />
          </ButtonImport>
        </ExportRow>

        <SectionList>
          <Column>
            {inativas && inativas?.length > 0 && 'Setor'}
            {inativas && inativas?.length > 0 && (
              <div style={{ display: 'flex' }}>
                <TableCell
                  style={{ textAlign: 'left', width: '30px' }}
                  onClick={() => onSelectedSectorAll(inativas)}
                >
                  <Square className="text-secondary self-center" />
                  {sectorSelected?.length === inativas?.length && <Check />}
                </TableCell>
                Selecionar todos
              </div>
            )}
            <TableComponent>
              {inativas?.map((sector, i) => (
                <TableCard key={+i} onClick={() => onSelectedSector(sector)}>
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
                  {sector.routes?.map((route, i) => (
                    <TableCard key={+i} onClick={() => onSelectedRoute(route)}>
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
                  {route.blocks?.map((block, i) => (
                    <TableCard key={+i} onClick={() => onSelectedBlock(block)}>
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
        <ComponentToPrint ref={componentRef} blocks={blocksSelected} />
      </Hidden>
    </RootLayout>
  );
};

export default IndexPage;
