import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Tabs,
  Tab,
  CircularProgress,
  Alert,
} from "@mui/material";
import ExtractView from "./extract_view/extract_view";
import MyAutocomplete from "../MyAutocomplete";
import VersionHistoryModal from "../VersionHistoryModal";
import mockVersionData from "../../assets/mockData/versionHistory";
import ExtractOverflowButtons from "../ExtractOverflowButtons";
import FilterDrawer from "./extract_view/filter";

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
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: '12px', // For all table cells
          padding: '6px 8px', // Optional tighter spacing
        },
        head: {
          fontWeight: 600,
          fontSize: '11px', // Header cell font size
          textTransform: 'none', // Optional
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variant: 'subtitle2', // Set your default variant here
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '12px',
          padding: '4px 10px',
          textTransform: 'none',
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontSize: '12px',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          fontSize: '12px',
        },
      },
    },
  },
});

const theme1 = createTheme({
  typography: {
    fontSize: '12 !important', // Global base font size (optional)
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: '12px', // For all table cells
          padding: '6px 8px', // Optional tighter spacing
        },
        head: {
          fontWeight: 600,
          fontSize: '11px', // Header cell font size
          textTransform: 'uppercase', // Optional
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '12px',
          padding: '4px 10px',
          textTransform: 'none',
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontSize: '12px',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          fontSize: '12px',
        },
      },
    },
  },
});

const TAB_DATA = {
  tab1: 'work-flow',
  tab2: 'extract',
  tab3: 'SM'
}
const SLAView = () => {
  const [tab, setTab] = useState(TAB_DATA.tab1);
  const [versionModalOpen, setVersionModalOpen] = useState(false);
  const [selectedExtractName, setSelectedExtractName] = useState('');
  const [selectedVersions, setSelectedVersions] = useState([]);
  const [clientOptions, setClientOptions] = useState([]);
  const [dataServiceOptions, setDataServiceOptions] = useState([]);
  const [selectedClient, setSelectedClient] = useState("All");
  const [selectedDataService, setSelectedDataService] = useState("All");





  const handleTabChange = useCallback((_, newTab) => {
    setTab(newTab);
  }, []);

  const handleChangeClient = (value) => {
    setSelectedClient(value ? value : "All");
  };

  const handleChangeDataService = (value) => {
    setSelectedDataService(value ? value : "All");
  };

  // const hasSelected = Object.values(selectedRows).some(Boolean);

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
        {/* <Box
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
        </Box> */}

        <Box display="flex" justifyContent="space-between" marginBottom="10px">
          <Tabs value={tab} onChange={handleTabChange}>
            <Tab value={TAB_DATA.tab1} label="Workflow View" disableRipple />
            <Tab value={TAB_DATA.tab2} label="Extract View" disableRipple />
            <Tab value={TAB_DATA.tab3} label="SM View" disableRipple />
          </Tabs>
        </Box>
        <Box sx={{ background: "white", padding: "1rem" }}>

          {/* {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )} */}
          <VersionHistoryModal
            open={versionModalOpen}
            onClose={() => setVersionModalOpen(false)}
            extractName={selectedExtractName}
            versions={selectedVersions}
          />
          {/* <Box display="flex" justifyContent="center" minHeight="300px">
            {loading ? <CircularProgress /> : <MaterialReactTable table={table} />}
          </Box> */}
          <ExtractView
            selectedClient={selectedClient}
            setSelectedClient={setSelectedClient}
            selectedDataService={selectedDataService}
            setSelectedDataService={setSelectedDataService}
            setClientOptions={setClientOptions}
            setDataServiceOptions={setDataServiceOptions}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default SLAView;
