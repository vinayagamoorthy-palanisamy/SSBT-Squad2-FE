import { useState, useMemo, useEffect } from "react";
import { useMaterialReactTable } from "material-react-table";
import { TextField, InputAdornment, Typography, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import DownArrow from "../svg/DownArrow";
import UpArrow from "../svg/UpArrow";
import useExtractCenterDataStore from "../store/useExtractCenterTable";

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

const renderSortableHeader = (column, handleSortChange) => (
  <>
    {column.columnDef.header}
    <div
      style={{
        display: "inline-block",
        marginLeft: "6px",
        position: "relative",
        bottom: "5px",
        cursor: "pointer",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <UpArrow column={column} handleSortChange={handleSortChange} />
        <DownArrow column={column} handleSortChange={handleSortChange} />
      </div>
    </div>
  </>
);

const commonHeaderCellProps = {
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
};
const STATUS = {
  status1: 'Completed',
  status2: 'Failed',
  status3: 'In Progress',
  status4: 'Pending',
  status5: 'Retry',

}
const CustomStatus = ({ status }) => {
  const bg = status === STATUS.status1 ? '#0F8048' :
    status === STATUS.status2 ? '#BF1D1D' :
      status === STATUS.status3 ? '#FFD440' :
        status === STATUS.status4 ? '#0F8048' :
          status === STATUS.status5 ? '#FFD440' : 'black'
  return (
    <Box display="flex" alignItems="center" gap={0.5}>
      <Box width={7} height={7} borderRadius={'50%'} sx={{ background: bg }}></Box>
      <Typography>{status}</Typography>
    </Box>
  )
}
export const useExtractViewTable = (
  data = [],
  selectedClient = "All",
  selectedDataService = "All"
) => {
  console.log(data, 'cvjv')
  const navigate = useNavigate();
  const { handleSelectedRowsData } = useExtractCenterDataStore(
    (state) => state
  );
  const [selectedRows, setSelectedRows] = useState({});
  const [filters, setFilters] = useState({});
  const [sorting, setSorting] = useState({ id: "", sortType: "" });

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
          return row[columnId]?.toString().toLowerCase().includes(filterValue.toLowerCase());
        })
      );
    });

    if (sorting.id) {
      extractSearchData.sort((a, b) => {
        if (typeof a[sorting.id] === "string" && typeof b[sorting.id] === "string") {
          return sorting.sortType === "asc"
            ? a[sorting.id].localeCompare(b[sorting.id])
            : b[sorting.id].localeCompare(a[sorting.id]);
        } else {
          return sorting.sortType === "asc"
            ? a[sorting.id] - b[sorting.id]
            : b[sorting.id] - a[sorting.id];
        }
      });
    }

    return extractSearchData;
  }, [data, filters, selectedClient, selectedDataService, sorting]);

  function handleSortChange(column, sortType) {
    setSorting({ id: column.id, sortType });
  }

  useEffect(() => {
    const tableData = filteredData.length > 0 ? filteredData : data;

    console.log('selectedRows: ', selectedRows);
    const allFalse = Object.values(selectedRows).length > 0 && Object.values(selectedRows).every(value => value === false);

    if (allFalse) {
      handleSelectedRowsData([]);
      return;
    }
    const selectedData = Object.entries(selectedRows).reduce(
      (acc, [key, value]) => {
        if (value) {
          const rowData = tableData.find(
            (row) => row?.id?.toString() === key?.toString()
          );
          if (rowData) {
            acc.push(rowData);
          }
        }
        return acc;
      },
      []
    );
    selectedData.length > 0 && handleSelectedRowsData(selectedData);
  }, [selectedRows, data, filteredData, handleSelectedRowsData]);

  const columns = useMemo(() => {
    const columnDefs = [
      {
        key: "Extract Name", header: "Extract Name", filter: false,
        Cell: ({ cell }) => (
          <Box display="flex" alignItems="center" gap={0.5}>
            <input
              style={{ height: "16px", width: "16px" }}
              type="checkbox"
            />
            <Typography color="#0014BF" >{cell.getValue()}</Typography>
          </Box>
        )
      },
      {
        key: "Effective Date", header: "Effective Date", filter: false,


      },
      {
        key: "Generation Status",
        header: "Generation Status",
        filter: false,
        Cell: ({ cell }) => <CustomStatus status={cell.getValue()} />,
      },
      { key: "Delivery Status", header: "Delivery Status", filter: false, Cell: ({ cell }) => <CustomStatus status={cell.getValue()} />, },
      { key: "Client", header: "Client", filter: false },
      { key: "Region", header: "Region", filter: false },
      { key: "Event Id", header: "Event Id", filter: false,   
         Cell: ({ cell }) => (
          <Box display="flex" alignItems="center" gap={0.5}>
            <input
              style={{ height: "16px", width: "16px" }}
              type="checkbox"
            />
            <Typography>{cell.getValue()}</Typography>
          </Box>
        ) },
    ];

    const dynamicColumns = columnDefs.map(({ key, header, filter = true, ...props }) => ({
      accessorKey: key,
      header,
      enableColumnFilter: filter,
      Filter: filter ? ({ column }) => renderTextFilter(column, filters, handleFilterChange) : undefined,
      muiTableHeadCellProps: ({ column }) => ({
        ...commonHeaderCellProps,
        children: renderSortableHeader(column, handleSortChange),
        sx: key === "version" ? { ...commonHeaderCellProps.sx, paddingLeft: "60px" } : commonHeaderCellProps.sx,
      }),
      ...props
    }));

    return [...dynamicColumns];
  }, [filters, selectedRows, sorting]);

  const table = useMaterialReactTable({
    columns,
    data: filteredData,
    getRowId: (row) => row?.id,
    enableGlobalFilter: false,
    enableTopToolbar: false,
    enablePagination: true,
    paginationDisplayMode: "pages",
    enableColumnActions: false,
    enableStickyHeader: true,
    enableExpanding: true,
    getSubRows: (row) => row.subRows ?? [],
    muiTableHeadCellProps: () => ({
      sx: { border: "1px solid #C4C8CC" },
    }),
    muiTableBodyCellProps: () => ({
      sx: { textAlign: "left" },
    }),
    initialState: {
      columnPinning: {
        left: ["select", "Extract Name"],
      },
      showColumnFilters: true,
      pagination: {
        pageSize: 100,
        pageIndex: 0,
      },
    },
    muiPaginationProps: {
      rowsPerPageOptions: [10, 25, 50, 100, 200, 500, 1000],
    },
  });

  return {
    table,
    selectedRows,
    setSelectedRows,
    toggleRowSelection,
  };
};
