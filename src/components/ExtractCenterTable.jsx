import React, { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Button,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Checkbox,
} from "@mui/material";
import DropDown from "./DropDown";
import SearchableDropdown from "./SearchableDropdown";
import useExtractCenterDataStore from "../store/useExtractCenterTable";
import { ScaleLoader } from "react-spinners";

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f4f5f7",
      paper: "#ffffff",
    },
    primary: {
      main: "#4b5bdc",
    },
    secondary: {
      main: "#6c757d",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    fontSize: 14,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: "#f0f0f0",
          fontWeight: 600,
        },
      },
    },
  },
});

const ExtractCenterTable = () => {
  const { extractCenterData, error, loading, fetchExtractCenterData } = useExtractCenterDataStore((state) => state);
  const [tab,setTab] = useState("extract")
  const [client, setClient] = React.useState("");

  useEffect(() => {
    fetchExtractCenterData();
  }, []);

  const options = [
    'Hdfc',
    'Hsbc',
    'Axis',
    'Sbi',
    'Canara',
    'ICICI',
    'Punjab Bank',
  ];


  const handleChangeClient = (event) => {
    setClient(event.target.value);
  };

  function handleTabs(tab){
    setTab(()=>tab)
  }

  const columns = useMemo(
    () => [
      {
        accessorKey: "select",
        header: "Select",
        Cell: ({ row }) => (
          <Checkbox
            // checked={selectedRows}
            // onChange={() => handleCheckboxChange(row)}
          />
        ),
        enableColumnFilter: false,
        size: 60,
      },
      {
        accessorKey: "extractName",
        header: "Extract Name",
        size: 160,
        enableColumnFilter: true,
      },
      {
        accessorKey: "version",
        header: "Version",
        size: 80,
        enableColumnFilter: true,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 120,
        enableColumnFilter: true,
      },
      {
        accessorKey: "type",
        header: "Extract Type",
        size: 120,
        enableColumnFilter: true,
      },
      {
        accessorKey: "parameter",
        header: "Extract Parameter",
        size: 180,
        enableColumnFilter: true,
      },
      {
        accessorKey: "identifier",
        header: "Extract Identifier",
        size: 160,
        enableColumnFilter: true,
      },
      {
        accessorKey: "format",
        header: "Extract Format",
        size: 140,
        enableColumnFilter: true,
      },
    ],
    []
  );
  const table = useMaterialReactTable({
    columns,
    data:extractCenterData?.tableData ?? [],
    enableGlobalFilter: false,
    enableTopToolbar: false,
    enableFullScreenToggle: false,
    enablePagination:true,
    paginationDisplayMode:"pages",
    initialState: {
      showColumnFilters: true,
      pagination:{
        pageSize:5,
        pageIndex:0,
      }
    },
  });

  return  (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        background:"white",
        padding:"3px 6px"
      }} >
        <p>State street / core data</p>
      </Box>
      <Box
        p={3}
        sx={{
          backgroundColor: theme.palette.background.default,
          minHeight: "100vh",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "end",paddingBottom:"20px", gap:"18px" }}>
          <SearchableDropdown label="Client name" options={options}/>
          <SearchableDropdown label="Data ervice" options={options}/>

        </Box>

        <Box
          sx={{
            background: "white",
            padding:"1rem"
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              cursor:"pointer"
            }}
          >
            <Box
             display="flex"
             gap={2}
            >
              <p onClick={()=>handleTabs("extract")}  
              style={{
                borderBottom:tab === "extract" ?"1px solid blue" : ""
              }}
              >Extract Ceneter</p>
              <p onClick={()=>handleTabs("workflow")} style={{
                borderBottom:tab === "workflow" ?"1px solid blue" : ""
                }}>Workflow</p>
            </Box>
            {
              tab == "extract" ?
            <Box display="flex" alignItems="center" gap={2}>
              <Button variant="contained">Create Workflow</Button>
              <Button variant="contained" disabled>Clone Workflow</Button>
              <Button variant="contained" disabled>Run Extract</Button>
            </Box>:
            <Box display="flex" alignItems="center" gap={2}>
              <Button variant="contained">Create Workflow</Button>
              <Button variant="contained" disabled>Run Workflow</Button>
              <Button variant="contained" disabled>Run State Monitor</Button>
              <DropDown
                value={client}
                handleChange={handleChangeClient}
                options={extractCenterData?.timeZone}
                label={"Time Zone"}
              />
            </Box>

            }
          </Box>
          <Box display="flex" alignItems="center"  justifyContent="center">
            {loading ? <ScaleLoader /> :
            <MaterialReactTable table={table} />}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ExtractCenterTable;
