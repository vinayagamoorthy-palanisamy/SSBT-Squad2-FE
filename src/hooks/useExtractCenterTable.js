import { useState, useMemo } from "react";
import { useMaterialReactTable } from "material-react-table";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const useExtractCenterTable = (data = []) => {
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
      return Object.keys(filters).every((columnId) => {
        const filterValue = filters[columnId];
        if (!filterValue) return true;
        return row[columnId]
          .toString()
          .toLowerCase()
          .includes(filterValue.toLowerCase());
      });
    });
  }, [data, filters]);

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
        muiTableHeadCellProps: ({ column, table }) => {
          return {
            sx: {
              border: "1px solid #C4C8CC",
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
                {column.getIsSorted() === "asc" ? (
                <svg
                width="8"
                height="7"
                viewBox="0 0 8 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  id="mask 2"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.0945 0.764962C4.0425 0.713762 3.9581 0.713762 3.9057 0.764962L0.0393 4.58216C-0.0131 4.63336 -0.0131 4.71696 0.0393 4.76816L0.2277 4.95456C0.2797 5.00576 0.3645 5.00576 0.4165 4.95456L4.0001 1.41656L7.5841 4.95456C7.6361 5.00576 7.7205 5.00576 7.7725 4.95456L7.9613 4.76816C8.0133 4.71696 8.0133 4.63336 7.9613 4.58216L4.0945 0.764962Z"
                  fill="#101114"
                />
              </svg>
                ) : column.getIsSorted() === "desc" ? (
                  <svg
                        width="8"
                        height="7"
                        viewBox="0 0 8 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          id="mask 2"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M4.44848 5.16446C4.50144 5.21466 4.58583 5.21305 4.63724 5.16087L8.43037 1.27084C8.48178 1.21866 8.4802 1.13507 8.42683 1.08488L8.23492 0.902094C8.18196 0.851892 8.09717 0.853504 8.04616 0.905684L4.53047 4.51118L0.87985 1.04196C0.826886 0.991762 0.742502 0.993367 0.691485 1.04555L0.506263 1.2355C0.455245 1.28768 0.456835 1.37127 0.5098 1.42147L4.44848 5.16446Z"
                          fill="#101114"
                        />
                      </svg>
                ) : (
                  <div style={{ display: "inline-block", marginLeft: "6px",position:"relative",bottom:"5px", }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <svg
                        width="8"
                        height="7"
                        viewBox="0 0 8 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          id="mask 2"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M4.0945 0.764962C4.0425 0.713762 3.9581 0.713762 3.9057 0.764962L0.0393 4.58216C-0.0131 4.63336 -0.0131 4.71696 0.0393 4.76816L0.2277 4.95456C0.2797 5.00576 0.3645 5.00576 0.4165 4.95456L4.0001 1.41656L7.5841 4.95456C7.6361 5.00576 7.7205 5.00576 7.7725 4.95456L7.9613 4.76816C8.0133 4.71696 8.0133 4.63336 7.9613 4.58216L4.0945 0.764962Z"
                          fill="#101114"
                        />
                      </svg>

                      <svg
                        width="8"
                        height="7"
                        viewBox="0 0 8 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          id="mask 2"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M4.44848 5.16446C4.50144 5.21466 4.58583 5.21305 4.63724 5.16087L8.43037 1.27084C8.48178 1.21866 8.4802 1.13507 8.42683 1.08488L8.23492 0.902094C8.18196 0.851892 8.09717 0.853504 8.04616 0.905684L4.53047 4.51118L0.87985 1.04196C0.826886 0.991762 0.742502 0.993367 0.691485 1.04555L0.506263 1.2355C0.455245 1.28768 0.456835 1.37127 0.5098 1.42147L4.44848 5.16446Z"
                          fill="#101114"
                        />
                      </svg>
                    </div>
                  </div>
                )}
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
            children: (
              <>
                {column.columnDef.header}
                {column.getIsSorted() === "asc" ? (
                <svg
                width="8"
                height="7"
                viewBox="0 0 8 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  id="mask 2"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.0945 0.764962C4.0425 0.713762 3.9581 0.713762 3.9057 0.764962L0.0393 4.58216C-0.0131 4.63336 -0.0131 4.71696 0.0393 4.76816L0.2277 4.95456C0.2797 5.00576 0.3645 5.00576 0.4165 4.95456L4.0001 1.41656L7.5841 4.95456C7.6361 5.00576 7.7205 5.00576 7.7725 4.95456L7.9613 4.76816C8.0133 4.71696 8.0133 4.63336 7.9613 4.58216L4.0945 0.764962Z"
                  fill="#101114"
                />
              </svg>
                ) : column.getIsSorted() === "desc" ? (
                  <svg
                        width="8"
                        height="7"
                        viewBox="0 0 8 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          id="mask 2"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M4.44848 5.16446C4.50144 5.21466 4.58583 5.21305 4.63724 5.16087L8.43037 1.27084C8.48178 1.21866 8.4802 1.13507 8.42683 1.08488L8.23492 0.902094C8.18196 0.851892 8.09717 0.853504 8.04616 0.905684L4.53047 4.51118L0.87985 1.04196C0.826886 0.991762 0.742502 0.993367 0.691485 1.04555L0.506263 1.2355C0.455245 1.28768 0.456835 1.37127 0.5098 1.42147L4.44848 5.16446Z"
                          fill="#101114"
                        />
                      </svg>
                ) : (
                  <div style={{ display: "inline-block", marginLeft: "6px",position:"relative",bottom:"5px", }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <svg
                        width="8"
                        height="7"
                        viewBox="0 0 8 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          id="mask 2"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M4.0945 0.764962C4.0425 0.713762 3.9581 0.713762 3.9057 0.764962L0.0393 4.58216C-0.0131 4.63336 -0.0131 4.71696 0.0393 4.76816L0.2277 4.95456C0.2797 5.00576 0.3645 5.00576 0.4165 4.95456L4.0001 1.41656L7.5841 4.95456C7.6361 5.00576 7.7205 5.00576 7.7725 4.95456L7.9613 4.76816C8.0133 4.71696 8.0133 4.63336 7.9613 4.58216L4.0945 0.764962Z"
                          fill="#101114"
                        />
                      </svg>

                      <svg
                        width="8"
                        height="7"
                        viewBox="0 0 8 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          id="mask 2"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M4.44848 5.16446C4.50144 5.21466 4.58583 5.21305 4.63724 5.16087L8.43037 1.27084C8.48178 1.21866 8.4802 1.13507 8.42683 1.08488L8.23492 0.902094C8.18196 0.851892 8.09717 0.853504 8.04616 0.905684L4.53047 4.51118L0.87985 1.04196C0.826886 0.991762 0.742502 0.993367 0.691485 1.04555L0.506263 1.2355C0.455245 1.28768 0.456835 1.37127 0.5098 1.42147L4.44848 5.16446Z"
                          fill="#101114"
                        />
                      </svg>
                    </div>
                  </div>
                )}
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
        muiTableHeadCellProps: ({ column, table }) => {
          return {
            sx: {
              border: "1px solid #C4C8CC",
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
                {column.getIsSorted() === "asc" ? (
                <svg
                width="8"
                height="7"
                viewBox="0 0 8 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  id="mask 2"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.0945 0.764962C4.0425 0.713762 3.9581 0.713762 3.9057 0.764962L0.0393 4.58216C-0.0131 4.63336 -0.0131 4.71696 0.0393 4.76816L0.2277 4.95456C0.2797 5.00576 0.3645 5.00576 0.4165 4.95456L4.0001 1.41656L7.5841 4.95456C7.6361 5.00576 7.7205 5.00576 7.7725 4.95456L7.9613 4.76816C8.0133 4.71696 8.0133 4.63336 7.9613 4.58216L4.0945 0.764962Z"
                  fill="#101114"
                />
              </svg>
                ) : column.getIsSorted() === "desc" ? (
                  <svg
                        width="8"
                        height="7"
                        viewBox="0 0 8 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          id="mask 2"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M4.44848 5.16446C4.50144 5.21466 4.58583 5.21305 4.63724 5.16087L8.43037 1.27084C8.48178 1.21866 8.4802 1.13507 8.42683 1.08488L8.23492 0.902094C8.18196 0.851892 8.09717 0.853504 8.04616 0.905684L4.53047 4.51118L0.87985 1.04196C0.826886 0.991762 0.742502 0.993367 0.691485 1.04555L0.506263 1.2355C0.455245 1.28768 0.456835 1.37127 0.5098 1.42147L4.44848 5.16446Z"
                          fill="#101114"
                        />
                      </svg>
                ) : (
                  <div style={{ display: "inline-block", marginLeft: "6px",position:"relative",bottom:"5px", }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <svg
                        width="8"
                        height="7"
                        viewBox="0 0 8 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          id="mask 2"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M4.0945 0.764962C4.0425 0.713762 3.9581 0.713762 3.9057 0.764962L0.0393 4.58216C-0.0131 4.63336 -0.0131 4.71696 0.0393 4.76816L0.2277 4.95456C0.2797 5.00576 0.3645 5.00576 0.4165 4.95456L4.0001 1.41656L7.5841 4.95456C7.6361 5.00576 7.7205 5.00576 7.7725 4.95456L7.9613 4.76816C8.0133 4.71696 8.0133 4.63336 7.9613 4.58216L4.0945 0.764962Z"
                          fill="#101114"
                        />
                      </svg>

                      <svg
                        width="8"
                        height="7"
                        viewBox="0 0 8 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          id="mask 2"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M4.44848 5.16446C4.50144 5.21466 4.58583 5.21305 4.63724 5.16087L8.43037 1.27084C8.48178 1.21866 8.4802 1.13507 8.42683 1.08488L8.23492 0.902094C8.18196 0.851892 8.09717 0.853504 8.04616 0.905684L4.53047 4.51118L0.87985 1.04196C0.826886 0.991762 0.742502 0.993367 0.691485 1.04555L0.506263 1.2355C0.455245 1.28768 0.456835 1.37127 0.5098 1.42147L4.44848 5.16446Z"
                          fill="#101114"
                        />
                      </svg>
                    </div>
                  </div>
                )}
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
        muiTableHeadCellProps: ({ column, table }) => {
          return {
            sx: {
              border: "1px solid #C4C8CC",
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
                {column.getIsSorted() === "asc" ? (
                <svg
                width="8"
                height="7"
                viewBox="0 0 8 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  id="mask 2"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.0945 0.764962C4.0425 0.713762 3.9581 0.713762 3.9057 0.764962L0.0393 4.58216C-0.0131 4.63336 -0.0131 4.71696 0.0393 4.76816L0.2277 4.95456C0.2797 5.00576 0.3645 5.00576 0.4165 4.95456L4.0001 1.41656L7.5841 4.95456C7.6361 5.00576 7.7205 5.00576 7.7725 4.95456L7.9613 4.76816C8.0133 4.71696 8.0133 4.63336 7.9613 4.58216L4.0945 0.764962Z"
                  fill="#101114"
                />
              </svg>
                ) : column.getIsSorted() === "desc" ? (
                  <svg
                        width="8"
                        height="7"
                        viewBox="0 0 8 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          id="mask 2"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M4.44848 5.16446C4.50144 5.21466 4.58583 5.21305 4.63724 5.16087L8.43037 1.27084C8.48178 1.21866 8.4802 1.13507 8.42683 1.08488L8.23492 0.902094C8.18196 0.851892 8.09717 0.853504 8.04616 0.905684L4.53047 4.51118L0.87985 1.04196C0.826886 0.991762 0.742502 0.993367 0.691485 1.04555L0.506263 1.2355C0.455245 1.28768 0.456835 1.37127 0.5098 1.42147L4.44848 5.16446Z"
                          fill="#101114"
                        />
                      </svg>
                ) : (
                  <div style={{ display: "inline-block", marginLeft: "6px",position:"relative",bottom:"5px", }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <svg
                        width="8"
                        height="7"
                        viewBox="0 0 8 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          id="mask 2"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M4.0945 0.764962C4.0425 0.713762 3.9581 0.713762 3.9057 0.764962L0.0393 4.58216C-0.0131 4.63336 -0.0131 4.71696 0.0393 4.76816L0.2277 4.95456C0.2797 5.00576 0.3645 5.00576 0.4165 4.95456L4.0001 1.41656L7.5841 4.95456C7.6361 5.00576 7.7205 5.00576 7.7725 4.95456L7.9613 4.76816C8.0133 4.71696 8.0133 4.63336 7.9613 4.58216L4.0945 0.764962Z"
                          fill="#101114"
                        />
                      </svg>

                      <svg
                        width="8"
                        height="7"
                        viewBox="0 0 8 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          id="mask 2"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M4.44848 5.16446C4.50144 5.21466 4.58583 5.21305 4.63724 5.16087L8.43037 1.27084C8.48178 1.21866 8.4802 1.13507 8.42683 1.08488L8.23492 0.902094C8.18196 0.851892 8.09717 0.853504 8.04616 0.905684L4.53047 4.51118L0.87985 1.04196C0.826886 0.991762 0.742502 0.993367 0.691485 1.04555L0.506263 1.2355C0.455245 1.28768 0.456835 1.37127 0.5098 1.42147L4.44848 5.16446Z"
                          fill="#101114"
                        />
                      </svg>
                    </div>
                  </div>
                )}
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
        muiTableHeadCellProps: ({ column, table }) => {
          return {
            sx: {
              border: "1px solid #C4C8CC",
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
                {column.getIsSorted() === "asc" ? (
                <svg
                width="8"
                height="7"
                viewBox="0 0 8 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  id="mask 2"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.0945 0.764962C4.0425 0.713762 3.9581 0.713762 3.9057 0.764962L0.0393 4.58216C-0.0131 4.63336 -0.0131 4.71696 0.0393 4.76816L0.2277 4.95456C0.2797 5.00576 0.3645 5.00576 0.4165 4.95456L4.0001 1.41656L7.5841 4.95456C7.6361 5.00576 7.7205 5.00576 7.7725 4.95456L7.9613 4.76816C8.0133 4.71696 8.0133 4.63336 7.9613 4.58216L4.0945 0.764962Z"
                  fill="#101114"
                />
              </svg>
                ) : column.getIsSorted() === "desc" ? (
                  <svg
                        width="8"
                        height="7"
                        viewBox="0 0 8 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          id="mask 2"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M4.44848 5.16446C4.50144 5.21466 4.58583 5.21305 4.63724 5.16087L8.43037 1.27084C8.48178 1.21866 8.4802 1.13507 8.42683 1.08488L8.23492 0.902094C8.18196 0.851892 8.09717 0.853504 8.04616 0.905684L4.53047 4.51118L0.87985 1.04196C0.826886 0.991762 0.742502 0.993367 0.691485 1.04555L0.506263 1.2355C0.455245 1.28768 0.456835 1.37127 0.5098 1.42147L4.44848 5.16446Z"
                          fill="#101114"
                        />
                      </svg>
                ) : (
                  <div style={{ display: "inline-block", marginLeft: "6px",position:"relative",bottom:"5px", }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <svg
                        width="8"
                        height="7"
                        viewBox="0 0 8 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          id="mask 2"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M4.0945 0.764962C4.0425 0.713762 3.9581 0.713762 3.9057 0.764962L0.0393 4.58216C-0.0131 4.63336 -0.0131 4.71696 0.0393 4.76816L0.2277 4.95456C0.2797 5.00576 0.3645 5.00576 0.4165 4.95456L4.0001 1.41656L7.5841 4.95456C7.6361 5.00576 7.7205 5.00576 7.7725 4.95456L7.9613 4.76816C8.0133 4.71696 8.0133 4.63336 7.9613 4.58216L4.0945 0.764962Z"
                          fill="#101114"
                        />
                      </svg>

                      <svg
                        width="8"
                        height="7"
                        viewBox="0 0 8 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          id="mask 2"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M4.44848 5.16446C4.50144 5.21466 4.58583 5.21305 4.63724 5.16087L8.43037 1.27084C8.48178 1.21866 8.4802 1.13507 8.42683 1.08488L8.23492 0.902094C8.18196 0.851892 8.09717 0.853504 8.04616 0.905684L4.53047 4.51118L0.87985 1.04196C0.826886 0.991762 0.742502 0.993367 0.691485 1.04555L0.506263 1.2355C0.455245 1.28768 0.456835 1.37127 0.5098 1.42147L4.44848 5.16446Z"
                          fill="#101114"
                        />
                      </svg>
                    </div>
                  </div>
                )}
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
        muiTableHeadCellProps: ({ column, table }) => {
          return {
            sx: {
              border: "1px solid #C4C8CC",
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
                {column.getIsSorted() === "asc" ? (
                <svg
                width="8"
                height="7"
                viewBox="0 0 8 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  id="mask 2"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.0945 0.764962C4.0425 0.713762 3.9581 0.713762 3.9057 0.764962L0.0393 4.58216C-0.0131 4.63336 -0.0131 4.71696 0.0393 4.76816L0.2277 4.95456C0.2797 5.00576 0.3645 5.00576 0.4165 4.95456L4.0001 1.41656L7.5841 4.95456C7.6361 5.00576 7.7205 5.00576 7.7725 4.95456L7.9613 4.76816C8.0133 4.71696 8.0133 4.63336 7.9613 4.58216L4.0945 0.764962Z"
                  fill="#101114"
                />
              </svg>
                ) : column.getIsSorted() === "desc" ? (
                  <svg
                        width="8"
                        height="7"
                        viewBox="0 0 8 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          id="mask 2"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M4.44848 5.16446C4.50144 5.21466 4.58583 5.21305 4.63724 5.16087L8.43037 1.27084C8.48178 1.21866 8.4802 1.13507 8.42683 1.08488L8.23492 0.902094C8.18196 0.851892 8.09717 0.853504 8.04616 0.905684L4.53047 4.51118L0.87985 1.04196C0.826886 0.991762 0.742502 0.993367 0.691485 1.04555L0.506263 1.2355C0.455245 1.28768 0.456835 1.37127 0.5098 1.42147L4.44848 5.16446Z"
                          fill="#101114"
                        />
                      </svg>
                ) : (
                  <div style={{ display: "inline-block", marginLeft: "6px",position:"relative",bottom:"5px", }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <svg
                        width="8"
                        height="7"
                        viewBox="0 0 8 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          id="mask 2"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M4.0945 0.764962C4.0425 0.713762 3.9581 0.713762 3.9057 0.764962L0.0393 4.58216C-0.0131 4.63336 -0.0131 4.71696 0.0393 4.76816L0.2277 4.95456C0.2797 5.00576 0.3645 5.00576 0.4165 4.95456L4.0001 1.41656L7.5841 4.95456C7.6361 5.00576 7.7205 5.00576 7.7725 4.95456L7.9613 4.76816C8.0133 4.71696 8.0133 4.63336 7.9613 4.58216L4.0945 0.764962Z"
                          fill="#101114"
                        />
                      </svg>

                      <svg
                        width="8"
                        height="7"
                        viewBox="0 0 8 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          id="mask 2"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M4.44848 5.16446C4.50144 5.21466 4.58583 5.21305 4.63724 5.16087L8.43037 1.27084C8.48178 1.21866 8.4802 1.13507 8.42683 1.08488L8.23492 0.902094C8.18196 0.851892 8.09717 0.853504 8.04616 0.905684L4.53047 4.51118L0.87985 1.04196C0.826886 0.991762 0.742502 0.993367 0.691485 1.04555L0.506263 1.2355C0.455245 1.28768 0.456835 1.37127 0.5098 1.42147L4.44848 5.16446Z"
                          fill="#101114"
                        />
                      </svg>
                    </div>
                  </div>
                )}
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
        muiTableHeadCellProps: ({ column, table }) => {
          return {
            sx: {
              border: "1px solid #C4C8CC",
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
                {column.getIsSorted() === "asc" ? (
                <svg
                width="8"
                height="7"
                viewBox="0 0 8 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  id="mask 2"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.0945 0.764962C4.0425 0.713762 3.9581 0.713762 3.9057 0.764962L0.0393 4.58216C-0.0131 4.63336 -0.0131 4.71696 0.0393 4.76816L0.2277 4.95456C0.2797 5.00576 0.3645 5.00576 0.4165 4.95456L4.0001 1.41656L7.5841 4.95456C7.6361 5.00576 7.7205 5.00576 7.7725 4.95456L7.9613 4.76816C8.0133 4.71696 8.0133 4.63336 7.9613 4.58216L4.0945 0.764962Z"
                  fill="#101114"
                />
              </svg>
                ) : column.getIsSorted() === "desc" ? (
                  <svg
                        width="8"
                        height="7"
                        viewBox="0 0 8 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          id="mask 2"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M4.44848 5.16446C4.50144 5.21466 4.58583 5.21305 4.63724 5.16087L8.43037 1.27084C8.48178 1.21866 8.4802 1.13507 8.42683 1.08488L8.23492 0.902094C8.18196 0.851892 8.09717 0.853504 8.04616 0.905684L4.53047 4.51118L0.87985 1.04196C0.826886 0.991762 0.742502 0.993367 0.691485 1.04555L0.506263 1.2355C0.455245 1.28768 0.456835 1.37127 0.5098 1.42147L4.44848 5.16446Z"
                          fill="#101114"
                        />
                      </svg>
                ) : (
                  <div style={{ display: "inline-block", marginLeft: "6px",position:"relative",bottom:"5px", }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <svg
                        width="8"
                        height="7"
                        viewBox="0 0 8 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          id="mask 2"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M4.0945 0.764962C4.0425 0.713762 3.9581 0.713762 3.9057 0.764962L0.0393 4.58216C-0.0131 4.63336 -0.0131 4.71696 0.0393 4.76816L0.2277 4.95456C0.2797 5.00576 0.3645 5.00576 0.4165 4.95456L4.0001 1.41656L7.5841 4.95456C7.6361 5.00576 7.7205 5.00576 7.7725 4.95456L7.9613 4.76816C8.0133 4.71696 8.0133 4.63336 7.9613 4.58216L4.0945 0.764962Z"
                          fill="#101114"
                        />
                      </svg>

                      <svg
                        width="8"
                        height="7"
                        viewBox="0 0 8 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          id="mask 2"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M4.44848 5.16446C4.50144 5.21466 4.58583 5.21305 4.63724 5.16087L8.43037 1.27084C8.48178 1.21866 8.4802 1.13507 8.42683 1.08488L8.23492 0.902094C8.18196 0.851892 8.09717 0.853504 8.04616 0.905684L4.53047 4.51118L0.87985 1.04196C0.826886 0.991762 0.742502 0.993367 0.691485 1.04555L0.506263 1.2355C0.455245 1.28768 0.456835 1.37127 0.5098 1.42147L4.44848 5.16446Z"
                          fill="#101114"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </>
            ),
          };
        },
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
      columnPinning: {
        left: ["select", "extractName"],
      },
      showColumnFilters: true,
      pagination: {
        pageSize: 100,
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
