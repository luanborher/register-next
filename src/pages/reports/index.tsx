import { TableCell, TableRow } from '@mui/material';
import { MoreHorizontal, BookOpenCheck } from 'lucide-react';

import Header from '@/components/Header/Header';
import RootLayout from '@/components/RootLayout/Layout';
import TableComponent from '@/components/Table/Table';
import { useRouter } from 'next/navigation';

function createData(name: string, link: string) {
  return { name, link };
}

const rows = [
  createData(
    'Relatório de produtividade por funcionário',
    '/reports/productivity',
  ),
  createData('Relatório de cadastros por contratos', '/reports/contracts'),
];

const IndexPage = () => {
  const { push } = useRouter();

  return (
    <RootLayout>
      <main className="flex flex-col gap-2 h-full">
        <Header
          title="Relatórios"
          subtitle="Listagem de relátorios, gráficos e exportação de docs"
        />

        <div className="flex flex-col w-full max-h-full overflow-y-auto">
          <TableComponent>
            {rows.map(row => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                className="hover:opacity-80 cursor-pointer border-b-2 border-shadow hover:bg-shadow scroll"
                onClick={() => push(row.link)}
              >
                <TableCell align="left" width={60} className="p-0">
                  <BookOpenCheck className="text-secondary self-center" />
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
      </main>
    </RootLayout>
  );
};

export default IndexPage;
