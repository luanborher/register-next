import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

interface TableProps {
  headers?: string[];
  children: React.ReactNode;
}

const TableComponent = ({ headers, children }: TableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="custom pagination table">
        {headers && (
          <TableHead>
            <TableRow>
              {headers.map((header: string) => (
                <TableCell
                  key={header}
                  align="left"
                  className="pl-0 text-black text-xs md:text-sm xxl:base font-semibold"
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        )}

        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
