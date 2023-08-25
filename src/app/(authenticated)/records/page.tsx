'use client';

import { useEffect, useState } from 'react';

import ClientsDetails from 'components/ClientsDetails/ClientsDetails';
import Header from 'components/Header/Header';
import Search from 'components/Search/Search';
import TableComponent from 'components/Table/Table';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Records } from 'interfaces/Records';
import { MoreHorizontal } from 'lucide-react';
import api from 'services/api';

export default function IndexPage() {
  const [clientsList, setClientsList] = useState<Records[]>([]);
  const [clientSelected, setClientSelected] = useState<Records | null>(null);

  const getClients = async () => {
    try {
      const { data } = await api.get<Records[]>('/client');

      setClientsList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClients();
  }, []);

  return clientSelected ? (
    <ClientsDetails
      client={clientSelected}
      onClose={() => setClientSelected(null)}
    />
  ) : (
    <main className="flex flex-col gap-2 h-full">
      <Header
        title="Cadastros"
        subtitle="Primeira ligação, validação de cadastro e correções de dados."
        action
      />

      <Search />

      <div className="flex flex-col w-full max-h-full overflow-y-auto">
        <TableComponent
          headers={[
            'Nome',
            'CPF',
            'Endereço',
            'Comunidade',
            'Contrato',
            'Agente',
            'Ações'
          ]}
        >
          {clientsList.map((row) => (
            <TableRow
              key={row.id}
              onClick={() => setClientSelected(row)}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              className="hover:opacity-80 cursor-pointer border-b-2 border-shadow hover:bg-shadow scroll"
            >
              <TableCell align="left" height={55} className="p-0">
                <div>{row.name || ''}</div>
              </TableCell>

              <TableCell align="left" height={55} className="p-0">
                <div>{row.cpf || ''}</div>
              </TableCell>

              <TableCell align="left" height={55} className="p-0">
                <div>
                  {row.property.street.name || ''}, {row.property.number || ''}
                </div>
              </TableCell>

              <TableCell align="left" className="p-0">
                <div>{row.property.street.community.name || ''}</div>
              </TableCell>

              <TableCell align="left" className="p-0">
                <div>{row.property.street.community.contract.name || ''}</div>
              </TableCell>

              <TableCell align="left" height={55} className="p-0">
                <div>{row.user.name || ''}</div>
              </TableCell>

              <TableCell align="right" width={40} className="p-0">
                <MoreHorizontal size={24} className="text-secondary self-end" />
              </TableCell>
            </TableRow>
          ))}
        </TableComponent>
      </div>
    </main>
  );
}
