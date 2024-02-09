/* eslint-disable operator-linebreak */
import React, { useState } from 'react';
import { TableCell, TableRow } from '@mui/material';
import { TrashIcon } from 'lucide-react';

import { Records } from '@/interfaces/Records';
import api from '@/services/api';
import { handleError, handleSuccess } from '@/utils/message';

import TableComponent from '../Table/Table';

import {
  ButtonCancel,
  ButtonConfirm,
  ModalContainer,
  ModalContent,
  ContainerButtons,
  ContainerTitle,
  ClientContainer,
  ActionsIcons,
} from './styles';
import ModalQuest from '../ModalQuest/Modal';

interface ModalProps {
  onClose: () => void;
  duplicates: Records[];
  onFunction: () => void;
}

const ModalDuplicates = ({ onClose, duplicates, onFunction }: ModalProps) => {
  const [showModal, setShowModal] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState<string | null>(null);

  const onDelete = async () => {
    try {
      await api.delete(`/client/${deleteInfo}`);

      handleSuccess('Cliente deletado com sucesso!');

      setShowModal(false);
      onClose();
    } catch (error: any) {
      handleError(error);
    }
  };

  return (
    <>
      <ModalContainer>
        <ModalContent>
          <ContainerTitle>Clientes com endereço semelhante</ContainerTitle>

          <ClientContainer>
            <TableComponent headers={['Nome', 'Endereço']}>
              {duplicates.map(row => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  className="hover:opacity-80 cursor-pointer border-b-2 border-shadow hover:bg-shadow scroll"
                >
                  <TableCell align="left" className="pl-1 flex flex-col">
                    <div>{row.name}</div>
                  </TableCell>

                  <TableCell align="left" className="p-0">
                    <div>
                      {row.property.street.name || ''},{' '}
                      {row.property.number || ''}
                      {row.property.complement &&
                        `, ${row.property.complement}`}
                    </div>
                  </TableCell>

                  <TableCell align="right" width={40} className="p-0">
                    <ActionsIcons>
                      <TrashIcon
                        size={24}
                        color="#DF4343"
                        className="self-end"
                        onClick={() => {
                          setDeleteInfo(row.id);
                          setShowModal(true);
                        }}
                      />
                    </ActionsIcons>
                  </TableCell>
                </TableRow>
              ))}
            </TableComponent>
          </ClientContainer>

          <ContainerButtons>
            <ButtonCancel onClick={onClose}>Fechar</ButtonCancel>
            <ButtonConfirm onClick={onFunction}>Continuar</ButtonConfirm>
          </ContainerButtons>
        </ModalContent>
      </ModalContainer>

      {showModal && deleteInfo && (
        <ModalQuest
          zIndex={100000}
          onClose={() => {
            setDeleteInfo(null);
            setShowModal(false);
          }}
          onConfirm={onDelete}
        >
          Deseja deletar esse cadastro?
        </ModalQuest>
      )}
    </>
  );
};

export default ModalDuplicates;
