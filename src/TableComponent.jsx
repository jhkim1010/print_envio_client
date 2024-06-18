// TableComponent.jsx
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography
} from '@mui/material';

const TableComponent = ({ companyName, companyAddress, companyPhone , clientInfo}) => {
  return (
    <TableContainer component={Paper} style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        {companyName}
      </Typography>
      <Typography variant="subtitle1">
        woman jeans
      </Typography>
      <Typography variant="body2">
        {companyAddress} - Tel.: {companyPhone}
      </Typography>
      <Table aria-label="shipping label table">
        <TableHead>
          <TableRow>
            <TableCell colSpan={2} align="right">
              <TextField
                label="Fecha"
                defaultValue="5 / 6 / 24"
                variant="standard"
                inputProps={{ style: { textAlign: 'right' } }}
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Señor/es:</TableCell>
            <TableCell>
              <TextField defaultValue="DEBORA ESPINDOLA" variant="standard" fullWidth />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Dirección:</TableCell>
            <TableCell>
              <TextField defaultValue="RETIRO EN SUCURSAL" variant="standard" fullWidth />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Localidad:</TableCell>
            <TableCell>
              <TextField defaultValue="ROSARIO" variant="standard" fullWidth />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Prov.:</TableCell>
            <TableCell>
              <TextField defaultValue="SANTA FE" variant="standard" fullWidth />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Transporte:</TableCell>
            <TableCell>
              <TextField defaultValue="INTEGRAL PACK" variant="standard" fullWidth />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bultos:</TableCell>
            <TableCell>
              <TextField defaultValue="1B" variant="standard" fullWidth />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Valor:</TableCell>
            <TableCell>
              <TextField variant="standard" fullWidth />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableComponent;
