import React, { useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import {
  Box,
  Button,
  Typography,
  createTheme,
  ThemeProvider,
  CssBaseline,
} from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f4f5f7',
      paper: '#ffffff',
    },
    primary: {
      main: '#4b5bdc',
    },
    secondary: {
      main: '#6c757d',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 14,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: '#f0f0f0',
          fontWeight: 600,
        },
      },
    },
  },
});

const ExtractCenterTable = () => {
  const [data] = useState([
    {
      extractName: 'Extract1',
      version: 8,
      status: 'Submitted',
      type: 'Core',
      parameter: '-',
      identifier: '-',
      format: 'Formatted',
    },
    {
      extractName: 'Extract2',
      version: 1,
      status: 'Draft',
      type: 'Custom',
      parameter: 'Client Name',
      identifier: 'ANIL',
      format: 'Delimited',
    },
  ]);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'select',
        header: 'Select',
        Cell: () => <input type="checkbox" />,
        enableColumnFilter: false,
        size: 60,
      },
      {
        accessorKey: 'extractName',
        header: 'Extract Name',
        size: 160,
        enableColumnFilter: true,
      },
      {
        accessorKey: 'version',
        header: 'Version',
        size: 80,
        enableColumnFilter: true,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 120,
        enableColumnFilter: true,
      },
      {
        accessorKey: 'type',
        header: 'Extract Type',
        size: 120,
        enableColumnFilter: true,
      },
      {
        accessorKey: 'parameter',
        header: 'Extract Parameter',
        size: 180,
        enableColumnFilter: true,
      },
      {
        accessorKey: 'identifier',
        header: 'Extract Identifier',
        size: 160,
        enableColumnFilter: true,
      },
      {
        accessorKey: 'format',
        header: 'Extract Format',
        size: 140,
        enableColumnFilter: true,
      },
    ],
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box p={3} sx={{ backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h6">Extract Center</Typography>
          <Box display="flex" gap={2}>
            <Button variant="contained">Create Extract</Button>
            <Button variant="outlined">Clone Extract</Button>
            <Button variant="outlined" disabled>
              Run Extract
            </Button>
          </Box>
        </Box>
        <Box sx={{ backgroundColor: '#fff', borderRadius: 2, p: 2, boxShadow: 1 }}>
          <MaterialReactTable
            columns={columns}
            data={data}
            // enableColumnFilters={true}
            enableFilters
            enableSorting
            enableTopToolbar={false}
            enableFullScreenToggle={false}
            enablePagination={false}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ExtractCenterTable;
