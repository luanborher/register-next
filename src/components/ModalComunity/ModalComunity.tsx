import { ChevronLeft, Map } from 'lucide-react';
import { TableCell, TableRow } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getContractsReports } from '@/services/querys/reportsUserData';

import Header from '../Header/Header';
import TableComponent from '../Table/Table';

import { BackButton, BackText, Wrapper } from './styles';

interface ClientsDetailsProps {
  contract_id: string;
  name: string;
  onClose: () => void;
}

const ModalComunity = ({ contract_id, name, onClose }: ClientsDetailsProps) => {
  const contractsReportsParams = {
    contract_id,
  };

  const { data: contractsReports } = useQuery({
    queryKey: ['contractsReports', contractsReportsParams],
    queryFn: () => getContractsReports(contractsReportsParams),
  });

  return (
    <Wrapper>
      <Header title={name} subtitle="Contagem de cadastros realizados" action>
        <BackButton onClick={onClose}>
          <ChevronLeft color="#a5a5a5" size={22} />
          <BackText>Fechar</BackText>
        </BackButton>
      </Header>

      <div className="flex flex-col w-full max-h-full overflow-y-auto">
        <TableComponent
          headers={[
            '',
            'Comunidade',
            'Cadastros',
            'Ausentes',
            'Vagos',
            'Total',
          ]}
        >
          {contractsReports?.map(report => (
            <TableRow
              key={report.community_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              className="hover:opacity-80 cursor-pointer border-b-2 border-shadow hover:bg-shadow scroll"
            >
              <TableCell align="left" width={60} className="p-0">
                <Map className="text-secondary self-center" />
              </TableCell>
              <TableCell align="left" className="p-0">
                <div className="text-secondary font-medium text-xs md:text-sm xxl:base">
                  {report.community_name}
                </div>
              </TableCell>
              <TableCell align="left" className="pl-1 flex flex-col">
                <div className="text-secondary font-medium text-xs md:text-sm xxl:base">
                  {report.registers}
                </div>
              </TableCell>
              <TableCell align="left" className="pl-1 flex flex-col">
                <div className="text-secondary font-medium text-xs md:text-sm xxl:base">
                  {report.ausentes}
                </div>
              </TableCell>
              <TableCell align="left" className="pl-1 flex flex-col">
                <div className="text-secondary font-medium text-xs md:text-sm xxl:base">
                  {report.vagos}
                </div>
              </TableCell>
              <TableCell align="left" className="pl-1 flex flex-col">
                <div className="text-secondary font-medium text-xs md:text-sm xxl:base">
                  {report.total}
                </div>
              </TableCell>
            </TableRow>
          ))}
          <TableRow
            key="_totalcontracts"
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            className="hover:opacity-80 cursor-pointer border-b-2 border-shadow hover:bg-shadow scroll"
          >
            <TableCell align="left" width={60} className="p-0">
              <Map className="text-primary self-center" />
            </TableCell>
            <TableCell align="left" className="p-0">
              <div className="text-primary font-medium text-xs md:text-sm xxl:base">
                TOTAL
              </div>
            </TableCell>
            <TableCell align="left" className="pl-1 flex flex-col">
              <div className="text-primary font-medium text-xs md:text-sm xxl:base">
                {contractsReports?.reduce(
                  (total, obg) => total + (obg.registers || 0),
                  0,
                )}
              </div>
            </TableCell>
            <TableCell align="left" className="pl-1 flex flex-col">
              <div className="text-primary font-medium text-xs md:text-sm xxl:base">
                {contractsReports?.reduce(
                  (total, obg) => total + (obg.ausentes || 0),
                  0,
                )}
              </div>
            </TableCell>
            <TableCell align="left" className="pl-1 flex flex-col">
              <div className="text-primary font-medium text-xs md:text-sm xxl:base">
                {contractsReports?.reduce(
                  (total, obg) => total + (obg.vagos || 0),
                  0,
                )}
              </div>
            </TableCell>
            <TableCell align="left" className="pl-1 flex flex-col">
              <div className="text-primary font-medium text-xs md:text-sm xxl:base">
                {contractsReports?.reduce(
                  (total, obg) => total + (obg.total || 0),
                  0,
                )}
              </div>
            </TableCell>
          </TableRow>
        </TableComponent>
      </div>
    </Wrapper>
  );
};

export default ModalComunity;
