import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Button,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Tabs,
  Tab,
  CircularProgress,
  Alert,
} from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import { useExtractCenterTable } from "../hooks/useExtractCenterTable"; // ⬅️ custom hook
import useExtractCenterDataStore from "../store/useExtractCenterTable";
import DropDown from "./DropDown";
import SearchableDropdown from "./SearchableDropdown";

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

const clientOptions = ['Hdfc', 'Hsbc', 'Axis', 'Sbi', 'Canara', 'ICICI', 'Punjab Bank'];

const ExtractCenterTable = () => {
  const { extractCenterData, loading, error, fetchExtractCenterData } =
    useExtractCenterDataStore((state) => state);

  const [tab, setTab] = useState("extract");
  const [client, setClient] = useState("");

  const { table, selectedRows } = useExtractCenterTable(
    extractCenterData?.tableData ?? []
  );

  useEffect(() => {
    fetchExtractCenterData();
  }, [fetchExtractCenterData]);

  const handleTabChange = useCallback((_, newTab) => {
    setTab(newTab);
  }, []);

  const handleChangeClient = (event) => {
    setClient(event.target.value);
  };

  const hasSelected = Object.values(selectedRows).some(Boolean);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ background: "white", padding: "3px 6px" }}>
        <p>State Street / Core Data</p>
      </Box>

      <Box
        p={3}
        sx={{
          backgroundColor: theme.palette.background.default,
          minHeight: "100vh",
        }}
      >
        {/* Dropdown filters */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            paddingBottom: "20px",
            gap: "18px",
            flexWrap: "wrap",
          }}
        >
          <SearchableDropdown label="Client Name" options={clientOptions} />
          <SearchableDropdown label="Data Service" options={clientOptions} />
        </Box>

        {/* Main table section */}
        <Box sx={{ background: "white", padding: "1rem" }}>
          {/* Tabs */}
          <Tabs value={tab} onChange={handleTabChange}>
            <Tab value="extract" label="Extract Center" disableRipple  />
            <Tab value="workflow" label="Workflow" disableRipple  />
          </Tabs>

          {/* Action Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              my: 2,
              gap: 2,
            }}
          >
            {tab === "extract" ? (
              <Box display="flex" gap={2}>
                <Button variant="contained">Create Workflow</Button>
                <Button variant="contained" disabled>Clone Workflow</Button>
                <Button variant="contained" disabled={!hasSelected}>
                  Run Extract
                </Button>
              </Box>
            ) : (
              <Box display="flex" gap={2} flexWrap="wrap">
                <Button variant="contained">Create Workflow</Button>
                <Button variant="contained" disabled>Run Workflow</Button>
                <Button variant="contained" disabled>Run State Monitor</Button>
                <DropDown
                  value={client}
                  handleChange={handleChangeClient}
                  options={extractCenterData?.timeZone || []}
                  label="Time Zone"
                />
              </Box>
            )}
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* Table Loader / Content */}
          <Box display="flex" justifyContent="center" minHeight="300px">
            {loading ? <CircularProgress /> : <MaterialReactTable table={table} />}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ExtractCenterTable;
