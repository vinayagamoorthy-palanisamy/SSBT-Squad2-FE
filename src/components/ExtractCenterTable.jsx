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
import { useExtractCenterTable } from "../hooks/useExtractCenterTable";
import useExtractCenterDataStore from "../store/useExtractCenterTable";
import MyAutocomplete from "./MyAutocomplete";
import VersionHistoryModal from './VersionHistoryModal';
import mockVersionData from '../assets/mockData/versionHistory';

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
  const { extractCenterData, loading, error, fetchExtractCenterData } =
    useExtractCenterDataStore((state) => state);

  const [tab, setTab] = useState("extract");
  const [versionModalOpen, setVersionModalOpen] = useState(false);
  const [selectedExtractName, setSelectedExtractName] = useState('');
  const [selectedVersions, setSelectedVersions] = useState([]);
  const [clientOptions, setClientOptions] = useState([]);
  const [dataServiceOptions, setDataServiceOptions] = useState([]);
  const [selectedClient, setSelectedClient] = useState("All");
  const [selectedDataService, setSelectedDataService] = useState("All");

  useEffect(() => {
    if (extractCenterData?.tableData?.length) {
      const clients = new Set();
      const dataServices = new Set();
  
      extractCenterData.tableData.forEach(item => {
        if (item.client) clients.add(item.client);
        if (item.dataService) dataServices.add(item.dataService);
      });
  
      setClientOptions(["All", ...Array.from(clients)]);
      setDataServiceOptions(["All", ...Array.from(dataServices)]);
    }
  }, [extractCenterData?.tableData]);

  useEffect(() => {
    fetchExtractCenterData();
  }, [fetchExtractCenterData]);

  const { table, selectedRows } = useExtractCenterTable(
    extractCenterData?.tableData ?? [],
    selectedClient,
    selectedDataService
  );

  const handleTabChange = useCallback((_, newTab) => {
    setTab(newTab);
  }, []);

  const handleChangeClient = (value) => {
    setSelectedClient(value);
  };

  const handleChangeDataService = (value) => {
    setSelectedDataService(value);
  };

  const hasSelected = Object.values(selectedRows).some(Boolean);

  const handleVersionClick = (extractName) => {
    setSelectedExtractName(extractName);
    setSelectedVersions(mockVersionData);
    setVersionModalOpen(true);
  };

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
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            paddingBottom: "20px",
            gap: "18px",
            flexWrap: "wrap",
          }}
        >
          <MyAutocomplete label="Client Name" options={clientOptions} value={selectedClient} onChange={handleChangeClient} />
          <MyAutocomplete label="Data Service" options={dataServiceOptions} value={selectedDataService} onChange={handleChangeDataService} />
        </Box>

        <Box sx={{ background: "white", padding: "1rem" }}>
          <Box display="flex" justifyContent="space-between" marginBottom="10px">
            <Tabs value={tab} onChange={handleTabChange}>
              <Tab value="extract" label="Extract Center" disableRipple />
              <Tab value="workflow" label="Workflow" disableRipple />
            </Tabs>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              {tab === "extract" ? (
                <Box display="flex" gap={2} height="34px">
                  <Button variant="contained" sx={{ height: "34px" }}>Create Workflow</Button>
                  <Button variant="contained" sx={{ height: "34px" }} disabled>Clone Workflow</Button>
                  <Button variant="contained" sx={{ height: "34px" }} disabled={!hasSelected}>
                    Run Extract
                  </Button>
                </Box>
              ) : (
                <Box display="flex" gap={2} flexWrap="wrap" height="34px">
                  <Button variant="contained" sx={{ height: "34px" }}>Create Workflow</Button>
                  <Button variant="contained" sx={{ height: "34px" }} disabled>Run Workflow</Button>
                  <Button variant="contained" sx={{ height: "34px" }} disabled>Run State Monitor</Button>
                  <MyAutocomplete
                    onChange={handleChangeClient}
                    options={extractCenterData?.timeZone || []}
                    label="Time Zone"
                  />
                </Box>
              )}
            </Box>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <VersionHistoryModal
            open={versionModalOpen}
            onClose={() => setVersionModalOpen(false)}
            extractName={selectedExtractName}
            versions={selectedVersions}
          />
          <Box display="flex" justifyContent="center" minHeight="300px">
            {loading ? <CircularProgress /> : <MaterialReactTable table={table} />}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ExtractCenterTable;
