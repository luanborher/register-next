import { TableCell, TableRow } from '@mui/material';
import { MoreHorizontal, Map } from 'lucide-react';
import { useState } from 'react';

import Header from '@/components/Header/Header';
import RootLayout from '@/components/RootLayout/Layout';
import TableComponent from '@/components/Table/Table';
import Modal from '@/components/Modals/Modal/Modal';
import ModalAddress from '@/components/Modals/ModalAddress/ModalAddress';

function createData(
  name: string,
  type: 'contract' | 'community' | 'street' | '',
) {
  return { name, type };
}

const rows = [
  createData('Contratos', 'contract'),
  createData('Comunidades', 'community'),
  createData('Ruas', 'street'),
];

const IndexPage = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [type, setType] = useState<'contract' | 'community' | 'street' | ''>(
    '',
  );

  return (
    <RootLayout>
      <main className="flex flex-col gap-2 h-full">
        <Header
          title="Gerenciamento de contratos"
          subtitle="Gerencie contratos, comunidades e ruas"
        />

        <div className="flex flex-col w-full max-h-full overflow-y-auto">
          <TableComponent>
            {rows.map(row => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                className="hover:opacity-80 cursor-pointer border-b-2 border-shadow hover:bg-shadow scroll"
                onClick={() => {
                  setType(row.type);
                  setShowDetails(true);
                }}
              >
                <TableCell align="left" width={60} className="p-0">
                  <Map className="text-secondary self-center" />
                </TableCell>

                <TableCell align="left" className="pl-1 flex flex-col">
                  <div className="text-black text-xs md:text-sm xxl:base font-semibold">
                    {row.name}
                  </div>
                </TableCell>
                <TableCell align="right" width={40} className="p-0">
                  <MoreHorizontal
                    size={24}
                    className="text-secondary self-end"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableComponent>
        </div>

        {showDetails && (
          <Modal>
            <ModalAddress
              onClose={() => {
                setType('');
                setShowDetails(false);
              }}
              type={type}
            />
          </Modal>
        )}
      </main>
    </RootLayout>
  );
};

export default IndexPage;
