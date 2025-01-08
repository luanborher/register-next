import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';

interface TableProps {
  headers?: string[];
  children: React.ReactNode;
  windowWidth?: number;
}

const TableComponent = ({ headers, children, windowWidth }: TableProps) => (
  <TableContainer component={Paper}>
    <Table aria-label="custom pagination table">
      {headers && (
        <TableHead>
          <TableRow>
            {headers.map((header: string) => (
              <TableCell
                key={header}
                align="left"
                style={
                  windowWidth
                    ? { fontSize: windowWidth <= 815 ? '0.75rem' : '0.88rem' }
                    : {}
                }
              >
                <strong>{header}</strong>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
      )}

      <TableBody>{children}</TableBody>
    </Table>
  </TableContainer>
);

export default TableComponent;
