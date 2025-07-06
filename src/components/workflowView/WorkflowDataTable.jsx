import { MaterialReactTable } from "material-react-table";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { workflowTable } from "../../data/workflowData";
import HeaderControls from "./HeaderControls";

const WorkflowDataTable = () => {
  const [searchText, setSearchText] = useState("");

  const statusDot = (status) => {
    const colors = {
      Completed: "#4caf50",
      Inprogress: "#ff9800",
      Failed: "#f44336",
      Retry: "#fbc02d",
      NA: "#9e9e9e",
    };

    return (
      <Box display="flex" alignItems="center" gap={1}>
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: colors[status] || "#9e9e9e",
          }}
        />
        <span>{status}</span>
      </Box>
    );
  };

  const columns = [
    {
      accessorKey: "client",
      header: "Client",
      enableSorting: false,
      enableColumnActions: false,
    },
    {
      accessorKey: "workflowName",
      header: "Workflow Name",
      enableSorting: false,
      enableColumnActions: false,
      Cell: ({ cell }) => (
        <Box
          sx={{
            color: "#1976d2",
            fontWeight: 500,
            maxWidth: "300px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {cell.getValue()}
        </Box>
      ),
    },
    {
      accessorKey: "region",
      header: "Region",
      enableSorting: false,
      enableColumnActions: false,
    },
    {
      accessorKey: "effectiveDate",
      header: "Effective Date",
      enableSorting: false,
      enableColumnActions: false,
    },

    {
      accessorKey: "stateMonitorStatus",
      header: "State Monitor Status",
      enableSorting: false,
      enableColumnActions: false,
      Cell: ({ cell }) => statusDot(cell.getValue()),
    },
    {
      accessorKey: "overallStatus",
      header: "Overall Status",
      enableSorting: false,
      enableColumnActions: false,
      Cell: ({ cell }) => statusDot(cell.getValue()),
    },
    {
      accessorKey: "infoCheckStatus",
      header: "Informative Check Status",
      enableSorting: false,
      enableColumnActions: false,
    },
  ];

  // Optional: Apply client-side filtering
  const filteredData = workflowTable.filter((row) =>
    Object.values(row).some((val) =>
      val.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const mockTimeZones = ["India", "Boston", "Sri Lanka"];

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
          sx={{ width: 323, borderRadius: 0 }}
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
            onRun={() => console.log("Run clicked")}
            onUpdateMapping={() => console.log("Update clicked")}
            onVersionHistory={() => console.log("History clicked")}
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
      <MaterialReactTable
        columns={columns}
        data={filteredData}
        enableTopToolbar={false}
        enablePagination={false}
        enableSorting={false}
        enableColumnActions={false}
        muiTableContainerProps={{
          sx: {
            maxHeight: "465px",
            overflowY: "auto",
          },
        }}
      />
    </Box>
  );
};

export default WorkflowDataTable;
