import { useState, useMemo } from "react";
import { useMaterialReactTable } from "material-react-table";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const renderTextFilter = (column, filters, handleFilterChange) => (
  <TextField
    variant="outlined"
    size="small"
    placeholder="Search"
    value={filters[column.id] || ""}
    onChange={(e) => handleFilterChange(column.id, e.target.value)}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <SearchIcon />
        </InputAdornment>
      ),
    }}
  />
);

export const useExtractCenterTable = (data = [], selectedClient = "All", selectedDataService = "All") => {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState({});
  const [filters, setFilters] = useState({});

   const onClickExtractHandler = (key) => {
        switch(key){
            case 'createExtract':
                navigate('/create-extract');
                break;
            case 'cloneExtract':
                alert('handle clone Extract');
                break;
            case 'runExtract':
                alert('run extract');
                break;
            case 'createWorkflow':
                alert('create Workflow');
                break;
            case 'cloneWorkflow':
                alert('clone workflow');
                break;
            default:
                alert('run extract workflow');
        }
   }

   const extractButtons = [
    {
        seq: 50,
        label: 'Create Extract',
        color: 'dark',
        onClick: () => onClickExtractHandler('createExtract')
    },
    {
        seq: 51,
        label: 'Clone Extract',
        color: 'dark',
        disabled: true,
        onClick: () => onClickExtractHandler('cloneExtract')
    },
    {
        seq: 52,
        label: 'Run Extract',
        color: 'dark',
        disabled: true,
        onClick: () => onClickExtractHandler('runExtract')
    },
   ];

   const workflowButtons = [
    {
        seq: 53,
        label: 'Create Overflow',
        color: 'dark',
        onClick: () => onClickExtractHandler('createWorkflow')
    },
    {
        seq: 54,
        label: 'Clone Overflow',
        color: 'dark',
        onClick: () => onClickExtractHandler('cloneWorkflow')
    },
    {
        seq: 55,
        label: 'Run State Monitor',
        color: 'dark',
        onClick: () => onClickExtractHandler('runStateWorkflow')
    },
   ];

  const toggleRowSelection = (rowId) => {
    setSelectedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

  const isRowSelected = (rowId) => !!selectedRows[rowId];

  const handleFilterChange = (columnId, value) => {
    setFilters((prev) => ({
      ...prev,
      [columnId]: value,
    }));
  };

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      return (
        (selectedClient === "All" || row.client === selectedClient) &&
        (selectedDataService === "All" || row.dataService === selectedDataService) &&
        Object.keys(filters).every((columnId) => {
          const filterValue = filters[columnId];
          if (!filterValue) return true;
          return row[columnId]
            ?.toString()
            .toLowerCase()
            .includes(filterValue.toLowerCase());
        })
      );
    });
  }, [data, filters, selectedClient, selectedDataService]);
  

  const columns = useMemo(() => {
    return [
      {
        accessorKey: "select",
        header: "Select",
        Cell: ({ row }) => (
          <input
            style={{ height: "16px", width: "16px" }}
            type="checkbox"
            checked={isRowSelected(row.id)}
            onChange={() => toggleRowSelection(row.id)}
          />
        ),
        enableColumnFilter: false,
        size: 60,
        enableSorting: false,
      },
      {
        accessorKey: "extractName",
        header: "Extract Name",
        enableColumnFilter: true,
        Filter: ({ column }) =>
          renderTextFilter(column, filters, handleFilterChange),
      },
      {
        accessorKey: "version",
        header: "Version",
        enableColumnFilter: false,
      },
      {
        accessorKey: "status",
        header: "Status",
        enableColumnFilter: true,
        Filter: ({ column }) =>
          renderTextFilter(column, filters, handleFilterChange),
      },
      {
        accessorKey: "type",
        header: "Extract Type",
        enableColumnFilter: true,
        Filter: ({ column }) =>
          renderTextFilter(column, filters, handleFilterChange),
      },
      {
        accessorKey: "parameter",
        header: "Extract Parameter",
        enableColumnFilter: true,
        Filter: ({ column }) =>
          renderTextFilter(column, filters, handleFilterChange),
      },
      {
        accessorKey: "identifier",
        header: "Extract Identifier",
        enableColumnFilter: true,
        Filter: ({ column }) =>
          renderTextFilter(column, filters, handleFilterChange),
      },
      {
        accessorKey: "format",
        header: "Extract Format",
        enableColumnFilter: true,
        Filter: ({ column }) =>
          renderTextFilter(column, filters, handleFilterChange),
      },
    ];
  }, [filters, selectedRows]);

  const table = useMaterialReactTable({
    columns,
    data: filteredData,
    getRowId: row => row?.id,
    enableGlobalFilter: false,
    enableTopToolbar: false,
    enablePagination: true,
    paginationDisplayMode: "pages",
    enableColumnActions: false,
    enableStickyHeader: true,
    muiTableHeadCellProps: () => ({
      sx: {
        border: "1px solid #C4C8CC",
      },
    }),
    muiTableBodyCellProps: () => ({
      sx: {
        textAlign: "center",
      },
    }),
    initialState: {
      showColumnFilters: true,
      pagination: {
        pageSize: 100,
        pageIndex: 0,
      },
    },
    muiPaginationProps: {
      rowsPerPageOptions: [100, 200, 500, 1000],
    },
  });

  return {
    table,
    selectedRows,
    setSelectedRows,
    toggleRowSelection,
    extractButtons, 
    workflowButtons
  };
};
