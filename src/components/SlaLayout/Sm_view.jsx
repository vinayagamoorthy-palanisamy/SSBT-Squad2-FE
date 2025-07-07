import React, { useState } from "react";
import {
  Box,
  createTheme,
  ThemeProvider,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Select,
  Tabs,
  Tab,
  Menu,
  FormControl,
  MenuItem,
  TextField,
  InputAdornment,
  Button,
  InputLabel,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RefreshIcon from "@mui/icons-material/Refresh";
import GetAppIcon from '@mui/icons-material/GetApp';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import RunStateMonitor from "../../components/SlaLayout/RunStateMonitor";
import MyAutocomplete from "../MyAutocomplete";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f7f7f",
      paper: "#ffffff",
    },
    primary: {
      main: "#4b5bdc",
    },
    secondary: {
      main: "#6c757d",
    },
  },
});

function createData(clientName, SMPending, SMFAILED, SLAMET, SLAMissed, SLAatRisk, OverallFailed) {
  return { clientName, SMPending, SMFAILED, SLAMET, SLAMissed, SLAatRisk, OverallFailed };
}

const rows = [
  createData("Anima", 0, 0, 0, 0, 0, 0),
  createData("Invesco", 0, 0, 0, 0, 0, 0),
  createData("Legal and General", 0, 0, 0, 0, 0, 0),
  createData("Lord Abbet", 0, 0, 0, 0, 0, 0),
  createData("Model Office", 0, 0, 0, 0, 0, 0),
  createData("Ninety One", 0, 0, 0, 0, 0, 0),
];

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Sm_view = () => {
  const [selectedClient, setSelectedClient] = useState("All");
  const [selectedDataService, setSelectedDataService] = useState("All");
  const [startDate, setStartDate] = useState("2025-03-05");
  const [endDate, setEndDate] = useState("2025-07-05");
  const [tab, setTab] = useState(2);
  const [timezone, setTimezone] = useState('Boston');
  const [anchorEl, setAnchorEl] = useState(null);
  const [stateMonitorData, setStateMonitorData] = useState([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleNewMonitor = (data) => {
    const newRow = {
      monitor: data.stateMonitorName,
      effectiveDate: data.asOfDate,
      retryCount: data.attributes.length,
      status: 'Running',
      id: Date.now().toString(),
      startTime: new Date().toLocaleTimeString(),
      completed: 'No',
    };
    setStateMonitorData(prev => [...prev, newRow]);

    setSnackbarOpen(true);
  };

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);

  const clientOptions = ["None", "HSBC Holdings PLC"];
  const dataServiceOptions = ["None", "HSBC Holdings PLC"];

  const filteredRows = selectedClient === "All"
    ? rows
    : rows.filter((row) => row.clientName === selectedClient);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ background: "white", p: 1,color:'text.primary' }} display="flex" justifyContent="space-between" flexWrap="wrap">
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          State Street Core Data / SLA Tracker
        </Typography>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <MyAutocomplete label="Client Name" options={clientOptions} value={selectedClient} onChange={(v) => setSelectedClient(v || "All")} />
          <MyAutocomplete label="Data Service" options={dataServiceOptions} value={selectedDataService} onChange={(v) => setSelectedDataService(v || "All")} />
        </Box>
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" mb={2} p={1}>
        <Tabs value={tab} onChange={(_, newVal) => setTab(newVal)} sx={{ flexShrink: 0 }}>
          <Tab label="Workflow View" />
          <Tab label="Extract View" />
          <Tab label="SM View" />
        </Tabs>
        <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
          <FormControl size="small">
            <Select defaultValue="Start Date">
              <MenuItem value="Start Date">Start Date</MenuItem>
            </Select>
          </FormControl>
          <TextField type="date" size="small" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          <TextField type="date" size="small" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          <IconButton><RefreshIcon /></IconButton>
        </Box>
      </Box>

      <Box m={2}>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ flexDirection: "row-reverse", "& .MuiAccordionSummary-content": { marginLeft: "8px" }, margin: "2px" }}>
            <Typography variant="h6">SM View</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box m={2}>
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Client Name</TableCell>
                      <TableCell>SM Pending</TableCell>
                      <TableCell>SM FAILED</TableCell>
                      <TableCell>SLA Met</TableCell>
                      <TableCell>SLA Missed</TableCell>
                      <TableCell>SLA at Risk</TableCell>
                      <TableCell>Overall Failed</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredRows.map((row) => (
                      <TableRow key={row.clientName}>
                        <TableCell>{row.clientName}</TableCell>
                        <TableCell>{row.SMPending}</TableCell>
                        <TableCell>{row.SMFAILED}</TableCell>
                        <TableCell>{row.SLAMET}</TableCell>
                        <TableCell>{row.SLAMissed}</TableCell>
                        <TableCell>{row.SLAatRisk}</TableCell>
                        <TableCell>{row.OverallFailed}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="flex-end" gap={2} m={2} mb={2}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="body2" sx={{ mb: 0.5 }}>Deliverable by State Monitor</Typography>
          <TextField placeholder="Search deliverables..." size="small" InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }} />
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <RunStateMonitor onSubmitMonitor={handleNewMonitor}>
            {({ openDialog }) => (
              <Button variant="contained" size="small" onClick={openDialog}>
                Run State Monitor
              </Button>
            )}
          </RunStateMonitor>

          <FormControl sx={{ minWidth: 140 }} size="small">
            <InputLabel>Time Zone</InputLabel>
            <Select value={timezone} label="Time Zone" onChange={(e) => setTimezone(e.target.value)}>
              <MenuItem value="Boston">Boston</MenuItem>
              <MenuItem value="UTC">UTC</MenuItem>
            </Select>
          </FormControl>

          <IconButton><GetAppIcon /></IconButton>
          <IconButton><FilterListIcon /></IconButton>
          <IconButton onClick={handleMenuClick}><MoreVertIcon /></IconButton>

          <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}>Option 1</MenuItem>
            <MenuItem onClick={handleMenuClose}>Option 2</MenuItem>
          </Menu>
        </Box>
      </Box>

      <Box m={2}>
        <Paper elevation={1} sx={{ overflowX: "auto", mt: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>State Monitor</TableCell>
                <TableCell>Effective Date</TableCell>
                <TableCell>Retry Count</TableCell>
                <TableCell>State Monitor Status</TableCell>
                <TableCell>Status Monitor ID</TableCell>
                <TableCell>Start Time</TableCell>
                <TableCell>Completed</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stateMonitorData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ color: "#1976d2", cursor: "pointer" }}>{row.monitor}</TableCell>
                  <TableCell>{row.effectiveDate}</TableCell>
                  <TableCell>{row.retryCount}</TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Box sx={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "green" }} />
                      {row.status}
                    </Box>
                  </TableCell>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.startTime}</TableCell>
                  <TableCell>{row.completed}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
      <Snackbar
  open={snackbarOpen}
  autoHideDuration={3000}
  onClose={() => setSnackbarOpen(false)}
  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
>
  <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
    Run State Monitor data submitted successfully
  </Alert>
</Snackbar>
    </ThemeProvider>
  );
};

export default Sm_view;





