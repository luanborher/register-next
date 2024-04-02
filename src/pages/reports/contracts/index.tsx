/* eslint-disable prettier/prettier */
import { TableCell, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';

import Header from '@/components/Header/Header';
import RootLayout from '@/components/RootLayout/Layout';
import TableComponent from '@/components/Table/Table';

import api from '@/services/api';
import { Contract } from '@/interfaces/Records';
import { handleError } from '@/utils/message';
import { ChevronLeft, Map } from 'lucide-react';
import Modal from '@/components/Modal/Modal';
import ModalComunity from '@/components/ModalComunity/ModalComunity';
import { useRouter } from 'next/navigation';
import { BackButton, BackText } from '../styles';

const IndexPage = () => {
  const { push } = useRouter();

  const [contracts, setContracts] = useState<Contract[]>([]);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [selected, setSelected] = useState<Contract>({} as Contract);

  const getContract = async () => {
    try {
      const { data } = await api.get<Contract[]>('/general/contract');

      setContracts(data);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    getContract();
  }, []);

  return (
    <RootLayout>
      <main className="flex flex-col gap-2 h-full">
        <Header
          title="Relatórios de cadastros por contrato"
          subtitle="Contagem de cadastros realizados"
          action
        >
          <BackButton onClick={() => push('/reports')}>
            <ChevronLeft color="#a5a5a5" size={22} />
            <BackText>Fechar</BackText>
          </BackButton>
        </Header>

        <div className="flex flex-col w-full max-h-full overflow-y-auto">
          <TableComponent>
            {contracts?.map(contract => (
              <TableRow
                key={contract.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                className="hover:opacity-80 cursor-pointer border-b-2 border-shadow hover:bg-shadow scroll"
                onClick={() => {
                  setSelected(contract);
                  setShowDetails(true);
                }}
              >
                <TableCell align="left" width={60} className="p-0">
                  <Map className="text-secondary self-center" />
                </TableCell>
                <TableCell align="left" className="p-0">
                  <div className="text-secondary font-medium text-xs md:text-sm xxl:base">
                    {contract.name}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableComponent>
        </div>
      </main>

      {showDetails && selected.id && selected.name && (
        <Modal>
          <ModalComunity
            key={selected.id}
            onClose={() => setShowDetails(false)}
            contract_id={selected.id}
            name={selected.name}
          />
        </Modal>
      )}
    </RootLayout>
  );
};

export default IndexPage;
