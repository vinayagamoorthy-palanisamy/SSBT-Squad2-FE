import { useState, useMemo } from "react";
import { useMaterialReactTable } from "material-react-table";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import DownArrow from "../svg/DownArrow";
import UpArrow from "../svg/UpArrow";

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
  const [sorting,setSorting] = useState({
    id:"",
    sortType:""
  })


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
    let extractSearchData = data.filter((row) => {
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
  
    if (sorting.id) {
      extractSearchData.sort((a, b) => {
        if (typeof a[sorting.id] === 'string' && typeof b[sorting.id] === 'string') {
          return sorting.sortType === 'asc'
            ? a[sorting.id].localeCompare(b[sorting.id])
            : b[sorting.id].localeCompare(a[sorting.id]);
        } else {
          // For numbers or other types
          return sorting.sortType === 'asc'
            ? a[sorting.id] - b[sorting.id]
            : b[sorting.id] - a[sorting.id];
        }
      });
    }
  
    return extractSearchData;
  }, [data, filters, selectedClient, selectedDataService, sorting.sortType]);
  

  
function handleSortChange(column,sortType){
  setSorting({
    id : column.id,
    sortType
  })
}

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
        muiTableHeadCellProps: ({ column, table }) => {
          return {
            sx: {
              border: "1px solid #C4C8CC",
              padding: "0",
              "& .Mui-TableHeadCell-Content": {
                position: "absolute",
                bottom: "0",
                height: "100%",
                background: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            },
          };
        },
      },
      {
        accessorKey: "extractName",
        header: "Extract Name",
        enableColumnFilter: true,
        filterVariant: "text",
        Filter: ({ column }) => (
          renderTextFilter(column, filters, handleFilterChange)
        ),
        muiTableHeadCellProps: ({ column, table }) => {
          return {
            sx: {
              border: "1px solid #C4C8CC",
              justifyItems: "center",
              "& .Mui-TableHeadCell-Content": {
                display: "flex",
                justifyContent: "center",
                paddingBottom: "8px",
                flexDirection: "row",
              },
            },
            children: (
              <>
                {column.columnDef.header}
                {
                  <div style={{ display: "inline-block", marginLeft: "6px",position:"relative",bottom:"5px" }}   >
                    <div style={{ display: "flex", flexDirection: "column" }}  onClick={()=>{ handleSortChange(column,"asc")}}>
                    <UpArrow column={column} handleSortChange={handleSortChange}/>
                    <DownArrow column={column} handleSortChange={handleSortChange}/>
                    </div>
                  </div>
                }
              </>
            ),
          };
        },
      },
      {
        accessorKey: "version",
        header: "Version",
        enableColumnFilter: false,
        muiTableHeadCellProps: ({ column, table }) => {
          return {
            sx: {
              border: "1px solid #C4C8CC",
              alignContent: "center",
              paddingLeft:"60px"
            },
            children: (
              <>
                {column.columnDef.header}
                {
                  <div style={{ display: "inline-block", marginLeft: "6px",position:"relative",bottom:"5px" }}   >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                    <UpArrow column={column} handleSortChange={handleSortChange}/>
                    <DownArrow column={column} handleSortChange={handleSortChange}/>
                    </div>
                  </div>
                }
              </>
            ),
          };
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        enableColumnFilter: true,
        Filter: ({ column }) => (
          renderTextFilter(column, filters, handleFilterChange)
        ),
        muiTableHeadCellProps: ({ column, table }) => {
          return {
            sx: {
              border: "1px solid #C4C8CC",
              justifyItems: "center",
              "& .Mui-TableHeadCell-Content": {
                display: "flex",
                justifyContent: "center",
                paddingBottom: "8px",
                flexDirection: "row",
              },
            },
            children: (
              <>
                {column.columnDef.header}
                {
                  <div style={{ display: "inline-block", marginLeft: "6px",position:"relative",bottom:"5px" }}   >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                    <UpArrow column={column} handleSortChange={handleSortChange}/>
                    <DownArrow column={column} handleSortChange={handleSortChange}/>
                    </div>
                  </div>
                }
              </>
            ),
          };
        },
      },
      { 
        accessorKey: "type",
        header: "Extract Type",
        enableColumnFilter: true,
        Filter: ({ column }) => (
          renderTextFilter(column, filters, handleFilterChange)
        ),
        muiTableHeadCellProps: ({ column, table }) => {
          return {
            sx: {
              border: "1px solid #C4C8CC",
              justifyItems: "center",
              "& .Mui-TableHeadCell-Content": {
                display: "flex",
                justifyContent: "center",
                paddingBottom: "8px",
                flexDirection: "row",
              },
            },
            children: (
              <>
                {column.columnDef.header}
                {
                  <div style={{ display: "inline-block", marginLeft: "6px",position:"relative",bottom:"5px" }}   >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                    <UpArrow column={column} handleSortChange={handleSortChange}/>
                    <DownArrow column={column} handleSortChange={handleSortChange}/>
                    </div>
                  </div>
                }
              </>
            ),
          };
        },
      },
      {
        accessorKey: "parameter",
        header: "Extract Parameter",
        enableColumnFilter: true,
        Filter: ({ column }) => (
          renderTextFilter(column, filters, handleFilterChange)
        ),
        muiTableHeadCellProps: ({ column, table }) => {
          return {
            sx: {
              border: "1px solid #C4C8CC",
              justifyItems: "center",
              "& .Mui-TableHeadCell-Content": {
                display: "flex",
                justifyContent: "center",
                paddingBottom: "8px",
                flexDirection: "row",
              },
            },
            children: (
              <>
                {column.columnDef.header}
                {
                  <div style={{ display: "inline-block", marginLeft: "6px",position:"relative",bottom:"5px" }}   >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                    <UpArrow column={column} handleSortChange={handleSortChange}/>
                    <DownArrow column={column} handleSortChange={handleSortChange}/>
                    </div>
                  </div>
                }
              </>
            ),
          };
        },
      },
      {
        accessorKey: "identifier",
        header: "Extract Identifier",
        enableColumnFilter: true,
        Filter: ({ column }) => (
          renderTextFilter(column, filters, handleFilterChange)
        ),
        muiTableHeadCellProps: ({ column, table }) => {
          return {
            sx: {
              border: "1px solid #C4C8CC",
              justifyItems: "center",
              "& .Mui-TableHeadCell-Content": {
                display: "flex",
                justifyContent: "center",
                paddingBottom: "8px",
                flexDirection: "row",
              },
            },
            children: (
              <>
                {column.columnDef.header}
                {
                  <div style={{ display: "inline-block", marginLeft: "6px",position:"relative",bottom:"5px" }}   >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                    <UpArrow column={column} handleSortChange={handleSortChange}/>
                    <DownArrow column={column} handleSortChange={handleSortChange}/>
                    </div>
                  </div>
                }
              </>
            ),
          };
        },
      },
      {
        accessorKey: "format",
        header: "Extract Format",
        enableColumnFilter: true,
        Filter: ({ column }) => (
          renderTextFilter(column, filters, handleFilterChange)
        ),
        muiTableHeadCellProps: ({ column, table }) => {
          return {
            sx: {
              border: "1px solid #C4C8CC",
              justifyItems: "center",
              "& .Mui-TableHeadCell-Content": {
                display: "flex",
                justifyContent: "center",
                paddingBottom: "8px",
                flexDirection: "row",
              },
            },
            children: (
              <>
                {column.columnDef.header}
                {
                  <div style={{ display: "inline-block", marginLeft: "6px",position:"relative",bottom:"5px" }}   >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                    <UpArrow column={column} handleSortChange={handleSortChange}/>
                    <DownArrow column={column} handleSortChange={handleSortChange}/>
                    </div>
                  </div>
                }
              </>
            ),
          };
        },
      },
    ];
  }, [filters, selectedRows,sorting.sortType]);


  const table = useMaterialReactTable({
    columns,
    data:filteredData,
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
      columnPinning: {
        left: ["select", "extractName"],
      },
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
