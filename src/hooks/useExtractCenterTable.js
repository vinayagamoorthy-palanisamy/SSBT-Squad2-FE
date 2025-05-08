import { useState, useMemo } from "react";
import { useMaterialReactTable } from "material-react-table";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const useExtractCenterTable = (data = [], selectedClient = "All", selectedDataService = "All") => {
  const [selectedRows, setSelectedRows] = useState({});
  const [filters, setFilters] = useState({});

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
      return (selectedClient === "All" || row.client === selectedClient) &&
             (selectedDataService === "All" || row.dataService === selectedDataService) &&
             Object.keys(filters).every((columnId) => {
               const filterValue = filters[columnId];
               if (!filterValue) return true;
               return row[columnId]
                 .toString()
                 .toLowerCase()
                 .includes(filterValue.toLowerCase());
             });
    });
  }, [data, filters, selectedClient, selectedDataService]);

  const columns = useMemo(
    () => [
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
        filterVariant: "text",
        Filter: ({ column }) => (
          <TextField
            variant="outlined"
            size="small"
            placeholder={`Search `}
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
        ),
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
        Filter: ({ column }) => (
          <TextField
            variant="outlined"
            size="small"
            placeholder={`Search `}
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
        ),
      },
      {
        accessorKey: "type",
        header: "Extract Type",
        enableColumnFilter: true,
        Filter: ({ column }) => (
          <TextField
            variant="outlined"
            size="small"
            placeholder={`Search `}
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
        ),
      },
      {
        accessorKey: "parameter",
        header: "Extract Parameter",
        enableColumnFilter: true,
        Filter: ({ column }) => (
          <TextField
            variant="outlined"
            size="small"
            placeholder={`Search `}
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
        ),
      },
      {
        accessorKey: "identifier",
        header: "Extract Identifier",
        enableColumnFilter: true,
        Filter: ({ column }) => (
          <TextField
            variant="outlined"
            size="small"
            placeholder={`Search `}
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
        ),
      },
      {
        accessorKey: "format",
        header: "Extract Format",
        enableColumnFilter: true,
        Filter: ({ column }) => (
          <TextField
            variant="outlined"
            size="small"
            placeholder={`Search `}
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
        ),
      },
    ],
    [selectedRows, filters]
  );

  const table = useMaterialReactTable({
    columns,
    data: filteredData,
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
        pageSize: 5,
        pageIndex: 0,
      },
    },
  });

  return {
    table,
    selectedRows,
    setSelectedRows,
    toggleRowSelection,
  };
};
