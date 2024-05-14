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
import FichaCampo from '@/components/Pdfs/FichaCampo/FichaCampo';
import OrdensServico from '@/components/Pdfs/OrdensServico/OrdensServico';
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
  const orderRef = useRef<HTMLDivElement>(null);

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
      await api.post('/inativa/send', {
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
    if (sectorSelected?.length === inativas?.length) return clear.all();
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
                    <Label>Setor: {sector.sector}</Label>
                  </TableCell>
                  <Quantity>
                    <Label>Quantidade: {sector.count}</Label>
                  </Quantity>
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
                      <CheckBox>
                        <Square />
                        {routesSelected.includes(route) && <Check />}
                      </CheckBox>
                      <TableCell>
                        <Label>Rota: {route.route}</Label>
                      </TableCell>
                      <Quantity>
                        <Label>Quantidade: {route.count}</Label>
                      </Quantity>
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
                      <CheckBox>
                        <Square />
                        {blocksSelected.includes(block) && <Check />}
                      </CheckBox>
                      <TableCell>
                        <Label>Quadra: {block.block}</Label>
                      </TableCell>
                      <Quantity>
                        <Label>Quantidade: {block.count}</Label>
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
        <FichaCampo ref={componentRef} blocks={blocksSelected} />
      </Hidden>

      <Hidden>
        <OrdensServico ref={orderRef} />
      </Hidden>
    </RootLayout>
  );
};

export default IndexPage;
