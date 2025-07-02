import { MaterialReactTable } from 'material-react-table';
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { workflowTable } from '../../data/workflowData';
import HeaderControls from './HeaderControls';

const WorkflowDataTable = () => {
  const [searchText, setSearchText] = useState('');

  const columns = [
    { accessorKey: 'client', header: 'Client' },
    { accessorKey: 'workflowName', header: 'Workflow Name' },
    { accessorKey: 'region', header: 'Region' },
    { accessorKey: 'effectiveDate', header: 'Effective Date' },
    { accessorKey: 'stateMonitorStatus', header: 'State Monitor Status' },
    { accessorKey: 'overallStatus', header: 'Overall Status' },
    { accessorKey: 'infoCheckStatus', header: 'Informative Check Status' },
  ];

  // Optional: Apply client-side filtering
  const filteredData = workflowTable.filter((row) =>
    Object.values(row).some((val) =>
      val.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const mockTimeZones = ['UTC', 'EST', 'IST'];

  return (
    <Box>
      {/* Toolbar above table */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        gap={2}
        flexWrap="wrap"
      >
        {/* Search input */}
        <TextField
          size="small"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* Right-side icons */}
        <Box display="flex" alignItems="center" gap={1}>
            <HeaderControls
        timeZones={mockTimeZones}
        onRun={() => console.log('Run clicked')}
        onUpdateMapping={() => console.log('Update clicked')}
        onVersionHistory={() => console.log('History clicked')}
      />
          <Tooltip title="Export">
            <IconButton>
              <FileDownloadIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Copy">
            <IconButton>
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Refresh">
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Table */}
      <MaterialReactTable columns={columns} data={filteredData} enableTopToolbar={false} enableSorting={false} enableColumnActions={false} />
    </Box>
  );
};

export default WorkflowDataTable;
