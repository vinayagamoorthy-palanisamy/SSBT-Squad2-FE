// import React, { useState } from 'react';
// import {
//   Box,
//   Grid,
//   Typography,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Button,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   TextField,
//   Paper,
// } from '@mui/material';

// const clientData = [
//   'Anima',
//   'Invesco',
//   'Legal and General',
//   'Lord Abbet',
//   'Model Office',
//   'Ninety One',
// ];

// const stateMonitorData = [
//   {
//     id: 'ui_manual_sm_adhoc_2aff05597c9d716...',
//     monitor: 'ARR_PARENT_EVENT',
//     effectiveDate: '2025-04-25',
//     retryCount: 0,
//     status: 'Success',
//     startTime: '2025-05-29 01:40:05',
//     completed: '2025-05-29 01:40:05',
//   },
// ];

// export default function SMView() {
//   const [startDate, setStartDate] = useState('2025-03-05');
//   const [endDate, setEndDate] = useState('2025-07-05');
//   const [timezone, setTimezone] = useState('Boston');

//   return (
//     <Box p={3}>
//       <Typography variant="h6" gutterBottom>
//         SM View
//       </Typography>

//       {/* Filters */}
//       <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
//         <Grid item xs={12} sm={4}>
//           <FormControl fullWidth>
//             <InputLabel>Client</InputLabel>
//             <Select defaultValue="All" label="Client">
//               <MenuItem value="All">All</MenuItem>
//               {clientData.map((name) => (
//                 <MenuItem key={name} value={name}>
//                   {name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Grid>

//         <Grid item xs={12} sm={4}>
//           <FormControl fullWidth>
//             <InputLabel>Data Service</InputLabel>
//             <Select defaultValue="Fund Accounting Data Service" label="Data Service">
//               <MenuItem value="Fund Accounting Data Service">Fund Accounting Data Service</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>

//         <Grid item xs={6} sm={2}>
//           <TextField
//             fullWidth
//             label="Start Date"
//             type="date"
//             InputLabelProps={{ shrink: true }}
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//           />
//         </Grid>

//         <Grid item xs={6} sm={2}>
//           <TextField
//             fullWidth
//             label="End Date"
//             type="date"
//             InputLabelProps={{ shrink: true }}
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//           />
//         </Grid>
//       </Grid>

//       {/* SLA Table */}
//       <Paper elevation={2} sx={{ overflowX: 'auto', mb: 4 }}>
//         <Table size="small">
//           <TableHead>
//             <TableRow>
//               <TableCell>Client Name</TableCell>
//               <TableCell>SM Pending</TableCell>
//               <TableCell>SM Failed</TableCell>
//               <TableCell>SLA Met</TableCell>
//               <TableCell>SLA Missed</TableCell>
//               <TableCell>SLA At Risk</TableCell>
//               <TableCell>Overall Failed</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {clientData.map((name) => (
//               <TableRow key={name}>
//                 <TableCell>{name}</TableCell>
//                 {[...Array(6)].map((_, i) => (
//                   <TableCell key={i}>0</TableCell>
//                 ))}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Paper>

//       {/* Monitor Header */}
//       <Grid container spacing={2} alignItems="center" mb={2}>
//         <Grid item xs={12} sm={6}>
//           <TextField fullWidth label="Deliverables by State Monitor" />
//         </Grid>
//         <Grid item xs={6} sm={3}>
//           <FormControl fullWidth>
//             <InputLabel>Time Zone</InputLabel>
//             <Select value={timezone} onChange={(e) => setTimezone(e.target.value)}>
//               <MenuItem value="Boston">Boston</MenuItem>
//               <MenuItem value="UTC">UTC</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={6} sm={3} textAlign="right">
//           <Button variant="contained">Run State Monitor</Button>
//         </Grid>
//       </Grid>

//       {/* Monitor Table */}
//       <Paper elevation={2} sx={{ overflowX: 'auto' }}>
//         <Table size="small">
//           <TableHead>
//             <TableRow>
//               <TableCell>State Monitor</TableCell>
//               <TableCell>Effective Date</TableCell>
//               <TableCell>Retry Count</TableCell>
//               <TableCell>State Monitor Status</TableCell>
//               <TableCell>Status Monitor ID</TableCell>
//               <TableCell>Start Time</TableCell>
//               <TableCell>Completed</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {stateMonitorData.map((row, i) => (
//               <TableRow key={i}>
//                 <TableCell sx={{ color: '#1976d2', cursor: 'pointer' }}>{row.monitor}</TableCell>
//                 <TableCell>{row.effectiveDate}</TableCell>
//                 <TableCell>{row.retryCount}</TableCell>
//                 <TableCell>
//                   <Box display="flex" alignItems="center" gap={1}>
//                     <Box
//                       sx={{
//                         width: 10,
//                         height: 10,
//                         borderRadius: '50%',
//                         backgroundColor: 'green',
//                       }}
//                     />
//                     {row.status}
//                   </Box>
//                 </TableCell>
//                 <TableCell>{row.id}</TableCell>
//                 <TableCell>{row.startTime}</TableCell>
//                 <TableCell>{row.completed}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Paper>
//     </Box>
//   );
// }

// new code 
import React, { useState } from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  InputAdornment,
  IconButton,
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RefreshIcon from '@mui/icons-material/Refresh';

const clientData = [
  'Anima',
  'Invesco',
  'Legal and General',
  'Lord Abbet',
  'Model Office',
  'Ninety One',
];

const stateMonitorData = [
  {
    id: 'ui_manual_sm_adhoc_2aff05597c9d716...',
    monitor: 'ARR_PARENT_EVENT',
    effectiveDate: '2025-04-25',
    retryCount: 0,
    status: 'Success',
    startTime: '2025-05-29 01:40:05',
    completed: '2025-05-29 01:40:05',
  },
  {
    id: 'ui_manual_sm_adhoc_2aff05597c9d716...',
    monitor: 'ARR_PARENT_EVENT',
    effectiveDate: '2025-04-25',
    retryCount: 0,
    status: 'Success',
    startTime: '2025-05-29 01:40:05',
    completed: '2025-05-29 01:40:05',
  },
  {
    id: 'ui_manual_sm_adhoc_2aff05597c9d716...',
    monitor: 'ARR_PARENT_EVENT',
    effectiveDate: '2025-04-25',
    retryCount: 0,
    status: 'Success',
    startTime: '2025-05-29 01:40:05',
    completed: '2025-05-29 01:40:05',
  },
  {
    id: 'ui_manual_sm_adhoc_2aff05597c9d716...',
    monitor: 'ARR_PARENT_EVENT',
    effectiveDate: '2025-04-25',
    retryCount: 0,
    status: 'Success',
    startTime: '2025-05-29 01:40:05',
    completed: '2025-05-29 01:40:05',
  },
];

export default function SMView() {
  const [startDate, setStartDate] = useState('2025-03-05');
  const [endDate, setEndDate] = useState('2025-07-05');
  const [timezone, setTimezone] = useState('Boston');
  const [tab, setTab] = useState(2);

  return (
    <Box p={2}>
      {/* Header Row */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
 
        <Typography variant="subtitle2" color="dark" sx={{ fontWeight: 600 }}>
          State Street Core Data / SLA Tracker
        </Typography>
        <Box display="flex" gap={2}>
          <FormControl sx={{ minWidth: 180 }}>
            {/* <InputLabel>Client</InputLabel> */}
            <Select defaultValue="All">
              <MenuItem value="All">All</MenuItem>
              {clientData.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 220 }}>
            <Select defaultValue="Fund Accounting Data Service">
              <MenuItem value="Fund Accounting Data Service">Fund Accounting Data Service</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Tabs + Date Filter */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Tabs value={tab} onChange={(_, newVal) => setTab(newVal)}>
          <Tab label="Workflow View" />
          <Tab label="Extract View" />
          <Tab label="SM View" />
        </Tabs>
        {/* <Box display="flex" alignItems="center" gap={1}>
          <TextField
            type="date"
            size="small"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <TextField
            type="date"
            size="small"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <IconButton>
            <RefreshIcon />
          </IconButton>
        </Box> */}
        <Box display="flex" alignItems="center" gap={1}>
  <FormControl size="small">
    <InputLabel>Start Date</InputLabel>
    <Select defaultValue="Start Date" size="small">
      <MenuItem value="Start Date">Start Date</MenuItem>
    </Select>
  </FormControl>
  <TextField
    type="date"
    size="small"
    value={startDate}
    onChange={(e) => setStartDate(e.target.value)}
  />
  <TextField
    type="date"
    size="small"
    value={endDate}
    onChange={(e) => setEndDate(e.target.value)}
  />
  <IconButton>
    <RefreshIcon />
  </IconButton>
</Box>

      </Box>

      {/* Accordion */}
      <Accordion defaultExpanded sx={{ mb: 3 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ flexDirection: 'row-reverse', '& .MuiAccordionSummary-content': { marginLeft: '8px' } }}
        >
          <Typography variant="h6">SM View</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Paper elevation={1} sx={{ overflowX: 'auto' }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Client Name</TableCell>
                  <TableCell>SM Pending</TableCell>
                  <TableCell>SM Failed</TableCell>
                  <TableCell>SLA Met</TableCell>
                  <TableCell>SLA Missed</TableCell>
                  <TableCell>SLA At Risk</TableCell>
                  <TableCell>Overall Failed</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clientData.map((name) => (
                  <TableRow key={name}>
                    <TableCell>{name}</TableCell>
                    {[...Array(6)].map((_, i) => (
                      <TableCell key={i}>0</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </AccordionDetails>
      </Accordion>

      {/* Search and Monitor Controls */}
      <Box display="flex" justifyContent="space-between" alignItems="flex-end" gap={2} mb={2}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            Deliverable by State Monitor
          </Typography>
          <TextField
            placeholder="Search deliverables..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box display="flex" gap={2} alignItems="center">
          <Button variant="contained">Run State Monitor</Button>
          <FormControl sx={{ minWidth: 160 }}>
            <InputLabel>Time Zone</InputLabel>
            <Select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              label="Time Zone"
            >
              <MenuItem value="Boston">Boston</MenuItem>
              <MenuItem value="UTC">UTC</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* State Monitor Table */}
      <Paper elevation={1} sx={{ overflowX: 'auto' }}>
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
              <TableCell align="center">&#8942;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stateMonitorData.map((row, i) => (
              <TableRow key={i}>
                <TableCell sx={{ color: '#1976d2', cursor: 'pointer' }}>{row.monitor}</TableCell>
                <TableCell>{row.effectiveDate}</TableCell>
                <TableCell>{row.retryCount}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: 'green' }} />
                    {row.status}
                  </Box>
                </TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.startTime}</TableCell>
                <TableCell>{row.completed}</TableCell>
                <TableCell align="center">
                  <IconButton size="small">
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
// import React, { useState } from 'react';
// import {
//   Box,
//   Typography,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Tabs,
//   Tab,
//   TextField,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   Paper,
//   InputAdornment,
//   IconButton,
//   Button,
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import SearchIcon from '@mui/icons-material/Search';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import RefreshIcon from '@mui/icons-material/Refresh';

// const clientData = [
//   'Anima',
//   'Invesco',
//   'Legal and General',
//   'Lord Abbet',
//   'Model Office',
//   'Ninety One',
// ];

// const stateMonitorData = [
//   {
//     id: 'ui_manual_sm_adhoc_2aff05597c9d716...',
//     monitor: 'ARR_PARENT_EVENT',
//     effectiveDate: '2025-04-25',
//     retryCount: 0,
//     status: 'Success',
//     startTime: '2025-05-29 01:40:05',
//     completed: '2025-05-29 01:40:05',
//   },
// ];

// export default function SMView() {
//   const [startDate, setStartDate] = useState('2025-03-05');
//   const [endDate, setEndDate] = useState('2025-07-05');
//   const [timezone, setTimezone] = useState('Boston');
//   const [tab, setTab] = useState(2);

//   return (
//     <Box p={2}>
//       {/* Title + Filters */}
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//         <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 600 }}>
//           State Street Core Data / SLA Tracker
//         </Typography>
//         <Box display="flex" gap={2}>
//           <FormControl sx={{ minWidth: 180 }}>
//             <InputLabel>Client</InputLabel>
//             <Select defaultValue="All" label="Client">
//               <MenuItem value="All">All</MenuItem>
//               {clientData.map((name) => (
//                 <MenuItem key={name} value={name}>
//                   {name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <FormControl sx={{ minWidth: 220 }}>
//             <InputLabel>Data Service</InputLabel>
//             <Select defaultValue="Fund Accounting Data Service" label="Data Service">
//               <MenuItem value="Fund Accounting Data Service">Fund Accounting Data Service</MenuItem>
//             </Select>
//           </FormControl>
//         </Box>
//       </Box>

//       {/* Tabs + Date Range Picker Style */}
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//         <Tabs value={tab} onChange={(_, newVal) => setTab(newVal)}>
//           <Tab label="Workflow View" />
//           <Tab label="Extract View" />
//           <Tab label="SM View" />
//         </Tabs>
//         <Box display="flex" alignItems="center" gap={1}>
//           <TextField
//             type="date"
//             size="small"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//           />
//           <TextField
//             type="date"
//             size="small"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//           />
//           <IconButton>
//             <RefreshIcon />
//           </IconButton>
//         </Box>
//       </Box>

//       {/* Accordion */}
//       <Accordion defaultExpanded sx={{ mb: 3 }}>
//         <AccordionSummary
//           expandIcon={<ExpandMoreIcon />}
//           sx={{ flexDirection: 'row-reverse', '& .MuiAccordionSummary-content': { marginLeft: '8px' } }}
//         >
//           <Typography variant="h6">SM View</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Paper elevation={1} sx={{ overflowX: 'auto' }}>
//             <Table size="small">
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Client Name</TableCell>
//                   <TableCell>SM Pending</TableCell>
//                   <TableCell>SM Failed</TableCell>
//                   <TableCell>SLA Met</TableCell>
//                   <TableCell>SLA Missed</TableCell>
//                   <TableCell>SLA At Risk</TableCell>
//                   <TableCell>Overall Failed</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {clientData.map((name) => (
//                   <TableRow key={name}>
//                     <TableCell>{name}</TableCell>
//                     {[...Array(6)].map((_, i) => (
//                       <TableCell key={i}>0</TableCell>
//                     ))}
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </Paper>
//         </AccordionDetails>
//       </Accordion>
//     </Box>
   
//   );
// }

// import React, { useState } from 'react';
// import {
//   Box,
//   Typography,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Tabs,
//   Tab,
//   TextField,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   Paper,
//   InputAdornment,
//   IconButton,
//   Button,
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import SearchIcon from '@mui/icons-material/Search';
// import MoreVertIcon from '@mui/icons-material/MoreVert';

// const clientData = [
//   'Anima',
//   'Invesco',
//   'Legal and General',
//   'Lord Abbet',
//   'Model Office',
//   'Ninety One',
// ];

// const stateMonitorData = [
//   {
//     id: 'ui_manual_sm_adhoc_2aff05597c9d716...',
//     monitor: 'ARR_PARENT_EVENT',
//     effectiveDate: '2025-04-25',
//     retryCount: 0,
//     status: 'Success',
//     startTime: '2025-05-29 01:40:05',
//     completed: '2025-05-29 01:40:05',
//   },
// ];

// export default function SMView() {
//   const [startDate, setStartDate] = useState('2025-03-05');
//   const [endDate, setEndDate] = useState('2025-07-05');
//   const [timezone, setTimezone] = useState('Boston');
//   const [tab, setTab] = useState(2);

//   return (
//     <Box p={1}>
//       {/* Header row: Title left, filters right */}
//       <Box
//   display="flex"
//   justifyContent="space-between"
//   alignItems="center"  // 👈 aligns all items on same horizontal line
//   mb={2}
//   gap={2}
// >
//   {/* Left - Title */}
//   <Typography
//     variant="subtitle2"
//     color="primary"
//     sx={{ fontWeight: 600 }}
//   >
//     State Street Core Data / SLA Tracker
//   </Typography>

//   {/* Right - Filters */}
//   <Box display="flex" gap={2}>
//     <FormControl sx={{ minWidth: 180 }}>
//       <InputLabel>Client</InputLabel>
//       <Select defaultValue="All" label="Client">
//         <MenuItem value="All">All</MenuItem>
//         {clientData.map((name) => (
//           <MenuItem key={name} value={name}>
//             {name}
//           </MenuItem>
//         ))}
//       </Select>
//     </FormControl>
//     <InputLabel sx={{mb:2}}>Data Services:</InputLabel>
//     <FormControl sx={{ minWidth: 220 }}>
//       <Select defaultValue="Fund Accounting Data Service">
//         <MenuItem value="Fund Accounting Data Service">
//           Fund Accounting Data Service
//         </MenuItem>
//       </Select>
//     </FormControl>
//   </Box>
// </Box>
 

//       {/* Tabs */}
//       <Tabs value={tab} onChange={(_, newVal) => setTab(newVal)} sx={{ mb: 2 }}>
//         <Tab label="Workflow View" />
//         <Tab label="Extract View" />
//         <Tab label="SM View" />
//       </Tabs>

//       {/* Accordion with arrow on left of SM View */}
//       <Accordion defaultExpanded sx={{ mb: 3 }}>
//         <AccordionSummary
//           expandIcon={<ExpandMoreIcon />}
//           sx={{
//             flexDirection: 'row-reverse',
//             '& .MuiAccordionSummary-content': {
//               marginLeft: '8px',
//             },
//           }}
//         >
//           <Typography variant="h6">SM View</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Paper elevation={1} sx={{ overflowX: 'auto' }}>
//             <Table size="small">
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Client Name</TableCell>
//                   <TableCell>SM Pending</TableCell>
//                   <TableCell>SM Failed</TableCell>
//                   <TableCell>SLA Met</TableCell>
//                   <TableCell>SLA Missed</TableCell>
//                   <TableCell>SLA At Risk</TableCell>
//                   <TableCell>Overall Failed</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {clientData.map((name) => (
//                   <TableRow key={name}>
//                     <TableCell>{name}</TableCell>
//                     {[...Array(6)].map((_, i) => (
//                       <TableCell key={i}>0</TableCell>
//                     ))}
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </Paper>
//         </AccordionDetails>
//       </Accordion>

//       {/* Search and Run Monitor Row */}
//       <Box
//         display="flex"
//         flexWrap="wrap"
//         justifyContent="space-between"
//         alignItems="flex-end"
//         gap={2}
//         mb={2}
//       >
//         {/* Search Section */}
//         <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//           <Typography variant="body2" sx={{ mb: 0.5 }}>
//             Deliverable by State Monitor
//           </Typography>
//           <TextField
//             placeholder="Search deliverables..."
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Box>

//         {/* Run + Timezone Controls */}
//         <Box display="flex" gap={2} alignItems="center">
//           <Button variant="contained">Run State Monitor</Button>
//           <FormControl sx={{ minWidth: 160 }}>
//             <InputLabel>Time Zone</InputLabel>
//             <Select
//               value={timezone}
//               onChange={(e) => setTimezone(e.target.value)}
//               label="Time Zone"
//             >
//               <MenuItem value="Boston">Boston</MenuItem>
//               <MenuItem value="UTC">UTC</MenuItem>
//             </Select>
//           </FormControl>
//         </Box>
//       </Box>

//       {/* State Monitor Table */}
//       <Paper elevation={1} sx={{ overflowX: 'auto' }}>
//         <Table size="small">
//           <TableHead>
//             <TableRow>
//               <TableCell>State Monitor</TableCell>
//               <TableCell>Effective Date</TableCell>
//               <TableCell>Retry Count</TableCell>
//               <TableCell>State Monitor Status</TableCell>
//               <TableCell>Status Monitor ID</TableCell>
//               <TableCell>Start Time</TableCell>
//               <TableCell>Completed</TableCell>
//               <TableCell align="center">⋮</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {stateMonitorData.map((row, i) => (
//               <TableRow key={i}>
//                 <TableCell sx={{ color: '#1976d2', cursor: 'pointer' }}>
//                   {row.monitor}
//                 </TableCell>
//                 <TableCell>{row.effectiveDate}</TableCell>
//                 <TableCell>{row.retryCount}</TableCell>
//                 <TableCell>
//                   <Box display="flex" alignItems="center" gap={1}>
//                     <Box
//                       sx={{
//                         width: 10,
//                         height: 10,
//                         borderRadius: '50%',
//                         backgroundColor: 'green',
//                       }}
//                     />
//                     {row.status}
//                   </Box>
//                 </TableCell>
//                 <TableCell>{row.id}</TableCell>
//                 <TableCell>{row.startTime}</TableCell>
//                 <TableCell>{row.completed}</TableCell>
//                 <TableCell align="center">
//                   <IconButton size="small">
//                     <MoreVertIcon fontSize="small" />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Paper>
//     </Box>
//   );
// }



// import React, { useState } from 'react';
// import {
//   Box,
//   Typography,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Tabs,
//   Tab,
//   TextField,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   Paper,
//   InputAdornment,
//   IconButton,
//   Button,
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import SearchIcon from '@mui/icons-material/Search';
// import MoreVertIcon from '@mui/icons-material/MoreVert';

// const clientData = [
//   'Anima',
//   'Invesco',
//   'Legal and General',
//   'Lord Abbet',
//   'Model Office',
//   'Ninety One',
// ];

// const stateMonitorData = [
//   {
//     id: 'ui_manual_sm_adhoc_2aff05597c9d716...',
//     monitor: 'ARR_PARENT_EVENT',
//     effectiveDate: '2025-04-25',
//     retryCount: 0,
//     status: 'Success',
//     startTime: '2025-05-29 01:40:05',
//     completed: '2025-05-29 01:40:05',
//   },
// ];

// export default function SMView() {
//   const [startDate, setStartDate] = useState('2025-03-05');
//   const [endDate, setEndDate] = useState('2025-07-05');
//   const [timezone, setTimezone] = useState('Boston');
//   const [tab, setTab] = useState(2);

//   return (
//     <Box p={3}>
//       {/* Top Row: Title on left, dropdowns on right */}
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="flex-end"
//         mb={3}
//         flexWrap="nowrap"
//         gap={2}
//       >
//         <Typography variant="subtitle2" color="primary">
//           State Street Core Data / SLA Tracker
//         </Typography>

//         <Box display="flex" gap={2} flexWrap="wrap">
//           <FormControl sx={{ minWidth: 200 }}>
//             <InputLabel>Client</InputLabel>
//             <Select defaultValue="All" label="Client">
//               <MenuItem value="All">All</MenuItem>
//               {clientData.map((name) => (
//                 <MenuItem key={name} value={name}>
//                   {name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <FormControl sx={{ minWidth: 250 }}>
//             <InputLabel>Data Service</InputLabel>
//             <Select defaultValue="Fund Accounting Data Service" label="Data Service">
//               <MenuItem value="Fund Accounting Data Service">Fund Accounting Data Service</MenuItem>
//             </Select>
//           </FormControl>
//         </Box>
//       </Box>

//       {/* Tabs */}
//       <Tabs value={tab} onChange={(_, newVal) => setTab(newVal)} sx={{ mb: 2 }}>
//         <Tab label="Workflow View" />
//         <Tab label="Extract View" />
//         <Tab label="SM View" />
//       </Tabs>

//       {/* Accordion for SLA View */}
//       <Accordion defaultExpanded sx={{ mb: 3 }}>
//         <AccordionSummary
//           expandIcon={<ExpandMoreIcon />}
//           sx={{
//             flexDirection: 'row-reverse',
//             '& .MuiAccordionSummary-content': {
//               marginLeft: '8px',
//             },
//           }}
//         >
//           <Typography variant="h6">SM View</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Paper elevation={1} sx={{ overflowX: 'auto' }}>
//             <Table size="small">
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Client Name</TableCell>
//                   <TableCell>SM Pending</TableCell>
//                   <TableCell>SM Failed</TableCell>
//                   <TableCell>SLA Met</TableCell>
//                   <TableCell>SLA Missed</TableCell>
//                   <TableCell>SLA At Risk</TableCell>
//                   <TableCell>Overall Failed</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {clientData.map((name) => (
//                   <TableRow key={name}>
//                     <TableCell>{name}</TableCell>
//                     {[...Array(6)].map((_, i) => (
//                       <TableCell key={i}>0</TableCell>
//                     ))}
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </Paper>
//         </AccordionDetails>
//       </Accordion>

//       {/* Deliverables Search + Controls */}
//       <Box
//         display="flex"
//         flexWrap="wrap"
//         alignItems="flex-end"
//         justifyContent="space-between"
//         gap={2}
//         mb={2}
//       >
//         {/* Search Field with Label */}
//         <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//           <Typography variant="body2" sx={{ mb: 0.5 }}>
//             Deliverable by State Monitor
//           </Typography>
//           <TextField
//             placeholder="Search deliverables..."
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Box>

//         {/* Run Button + Time Zone */}
//         <Box display="flex" gap={2} alignItems="center">
//           <Button variant="contained">Run State Monitor</Button>

//           <FormControl sx={{ minWidth: 160 }}>
//             <InputLabel>Time Zone</InputLabel>
//             <Select
//               value={timezone}
//               onChange={(e) => setTimezone(e.target.value)}
//               label="Time Zone"
//             >
//               <MenuItem value="Boston">Boston</MenuItem>
//               <MenuItem value="UTC">UTC</MenuItem>
//             </Select>
//           </FormControl>
//         </Box>
//       </Box>

//       {/* State Monitor Data Table */}
//       <Paper elevation={1} sx={{ overflowX: 'auto' }}>
//         <Table size="small">
//           <TableHead>
//             <TableRow>
//               <TableCell>State Monitor</TableCell>
//               <TableCell>Effective Date</TableCell>
//               <TableCell>Retry Count</TableCell>
//               <TableCell>State Monitor Status</TableCell>
//               <TableCell>Status Monitor ID</TableCell>
//               <TableCell>Start Time</TableCell>
//               <TableCell>Completed</TableCell>
//               <TableCell align="center">⋮</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {stateMonitorData.map((row, i) => (
//               <TableRow key={i}>
//                 <TableCell sx={{ color: '#1976d2', cursor: 'pointer' }}>{row.monitor}</TableCell>
//                 <TableCell>{row.effectiveDate}</TableCell>
//                 <TableCell>{row.retryCount}</TableCell>
//                 <TableCell>
//                   <Box display="flex" alignItems="center" gap={1}>
//                     <Box
//                       sx={{
//                         width: 10,
//                         height: 10,
//                         borderRadius: '50%',
//                         backgroundColor: 'green',
//                       }}
//                     />
//                     {row.status}
//                   </Box>
//                 </TableCell>
//                 <TableCell>{row.id}</TableCell>
//                 <TableCell>{row.startTime}</TableCell>
//                 <TableCell>{row.completed}</TableCell>
//                 <TableCell align="center">
//                   <IconButton size="small">
//                     <MoreVertIcon fontSize="small" />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Paper>
//     </Box>
//   );
// }


// import React, { useState } from 'react';
// import {
//   Box,
//   Typography,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Tabs,
//   Tab,
//   TextField,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   Paper,
//   InputAdornment,
//   IconButton,
//   Button,
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import SearchIcon from '@mui/icons-material/Search';
// import MoreVertIcon from '@mui/icons-material/MoreVert';

// const clientData = [
//   'Anima',
//   'Invesco',
//   'Legal and General',
//   'Lord Abbet',
//   'Model Office',
//   'Ninety One',
// ];

// const stateMonitorData = [
//   {
//     id: 'ui_manual_sm_adhoc_2aff05597c9d716...',
//     monitor: 'ARR_PARENT_EVENT',
//     effectiveDate: '2025-04-25',
//     retryCount: 0,
//     status: 'Success',
//     startTime: '2025-05-29 01:40:05',
//     completed: '2025-05-29 01:40:05',
//   },
//   {
//     id: 'ui_manual_sm_adhoc_2aff05597c9d716...',
//     monitor: 'ARR_PARENT_EVENT',
//     effectiveDate: '2025-04-25',
//     retryCount: 0,
//     status: 'Success',
//     startTime: '2025-05-29 01:40:05',
//     completed: '2025-05-29 01:40:05',
//   },
//   {
//     id: 'ui_manual_sm_adhoc_2aff05597c9d716...',
//     monitor: 'ARR_PARENT_EVENT',
//     effectiveDate: '2025-04-25',
//     retryCount: 0,
//     status: 'Success',
//     startTime: '2025-05-29 01:40:05',
//     completed: '2025-05-29 01:40:05',
//   },
//   {
//     id: 'ui_manual_sm_adhoc_2aff05597c9d716...',
//     monitor: 'ARR_PARENT_EVENT',
//     effectiveDate: '2025-04-25',
//     retryCount: 0,
//     status: 'Success',
//     startTime: '2025-05-29 01:40:05',
//     completed: '2025-05-29 01:40:05',
//   },
// ];

// export default function SMView() {
//   const [startDate, setStartDate] = useState('2025-03-05');
//   const [endDate, setEndDate] = useState('2025-07-05');
//   const [timezone, setTimezone] = useState('Boston');
//   const [tab, setTab] = useState(2);

//   return (
//     <Box p={3}>
//       <Typography variant="subtitle2" color="primary" gutterBottom>
//         State Street Core Data / SLA Tracker
//       </Typography>

//       {/* Tabs + Filters Row */}
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'flex-end',
//           flexWrap: 'wrap',
//           gap: 2,
//           mb: 3,
//         }}
//       >
//         <Tabs value={tab} onChange={(_, newVal) => setTab(newVal)}>
//           <Tab label="Workflow View" />
//           <Tab label="Extract View" />
//           <Tab label="SM View" />
//         </Tabs>

//         <Box display="flex" gap={2} flexWrap="wrap">
//           <FormControl sx={{ minWidth: 200 }}>
//             <InputLabel>Client</InputLabel>
//             <Select defaultValue="All" label="Client">
//               <MenuItem value="All">All</MenuItem>
//               {clientData.map((name) => (
//                 <MenuItem key={name} value={name}>
//                   {name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <FormControl sx={{ minWidth: 250 }}>
//             <InputLabel>Data Service</InputLabel>
//             <Select defaultValue="Fund Accounting Data Service" label="Data Service">
//               <MenuItem value="Fund Accounting Data Service">Fund Accounting Data Service</MenuItem>
//             </Select>
//           </FormControl>
//         </Box>
//       </Box>

//       {/* Accordion for SLA View */}
//       {/* <Accordion defaultExpanded sx={{ mb: 3 }}>
//         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//           <Typography variant="h6">SM View</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Paper elevation={1} sx={{ overflowX: 'auto' }}>
//             <Table size="small">
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Client Name</TableCell>
//                   <TableCell>SM Pending</TableCell>
//                   <TableCell>SM Failed</TableCell>
//                   <TableCell>SLA Met</TableCell>
//                   <TableCell>SLA Missed</TableCell>
//                   <TableCell>SLA At Risk</TableCell>
//                   <TableCell>Overall Failed</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {clientData.map((name) => (
//                   <TableRow key={name}>
//                     <TableCell>{name}</TableCell>
//                     {[...Array(6)].map((_, i) => (
//                       <TableCell key={i}>0</TableCell>
//                     ))}
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </Paper>
//         </AccordionDetails>
//       </Accordion> */}
//       <Accordion defaultExpanded sx={{ mb: 3 }}>
//   <AccordionSummary
//     expandIcon={<ExpandMoreIcon />}
//     sx={{
//       flexDirection: 'row-reverse',
//       '& .MuiAccordionSummary-content': {
//         marginLeft: '8px',
//       },
//     }}
//   >
//     <Typography variant="h6">SM View</Typography>
//   </AccordionSummary>
//   <AccordionDetails>
//     <Paper elevation={1} sx={{ overflowX: 'auto' }}>
//       <Table size="small">
//         <TableHead>
//           <TableRow>
//             <TableCell>Client Name</TableCell>
//             <TableCell>SM Pending</TableCell>
//             <TableCell>SM Failed</TableCell>
//             <TableCell>SLA Met</TableCell>
//             <TableCell>SLA Missed</TableCell>
//             <TableCell>SLA At Risk</TableCell>
//             <TableCell>Overall Failed</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {clientData.map((name) => (
//             <TableRow key={name}>
//               <TableCell>{name}</TableCell>
//               {[...Array(6)].map((_, i) => (
//                 <TableCell key={i}>0</TableCell>
//               ))}
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </Paper>
//   </AccordionDetails>
// </Accordion>


//       {/* Deliverables Search and Controls */}
//       <Box
//         display="flex"
//         flexWrap="wrap"
//         alignItems="flex-end"
//         justifyContent="space-between"
//         gap={2}
//         mb={2}
//       >
//         {/* Label + Search */}
//         <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//           <Typography variant="body2" sx={{ mb: 0.5 }}>
//             Deliverable by State Monitor
//           </Typography>
//           <TextField
//             placeholder="Search deliverables..."
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Box>

//         {/* Run Button + Timezone */}
//         <Box display="flex" gap={2} alignItems="center">
//           <Button variant="contained">Run State Monitor</Button>

//           <FormControl sx={{ minWidth: 160 }}>
//             <InputLabel>Time Zone</InputLabel>
//             <Select value={timezone} onChange={(e) => setTimezone(e.target.value)} label="Time Zone">
//               <MenuItem value="Boston">Boston</MenuItem>
//               <MenuItem value="UTC">UTC</MenuItem>
//             </Select>
//           </FormControl>
//         </Box>
//       </Box>

//       {/* Monitor Table */}
//       <Paper elevation={1} sx={{ overflowX: 'auto' }}>
//         <Table size="small">
//           <TableHead>
//             <TableRow>
//               <TableCell>State Monitor</TableCell>
//               <TableCell>Effective Date</TableCell>
//               <TableCell>Retry Count</TableCell>
//               <TableCell>State Monitor Status</TableCell>
//               <TableCell>Status Monitor ID</TableCell>
//               <TableCell>Start Time</TableCell>
//               <TableCell>Completed</TableCell>
//               <TableCell align="center">⋮</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {stateMonitorData.map((row, i) => (
//               <TableRow key={i}>
//                 <TableCell sx={{ color: '#1976d2', cursor: 'pointer' }}>{row.monitor}</TableCell>
//                 <TableCell>{row.effectiveDate}</TableCell>
//                 <TableCell>{row.retryCount}</TableCell>
//                 <TableCell>
//                   <Box display="flex" alignItems="center" gap={1}>
//                     <Box
//                       sx={{
//                         width: 10,
//                         height: 10,
//                         borderRadius: '50%',
//                         backgroundColor: 'green',
//                       }}
//                     />
//                     {row.status}
//                   </Box>
//                 </TableCell>
//                 <TableCell>{row.id}</TableCell>
//                 <TableCell>{row.startTime}</TableCell>
//                 <TableCell>{row.completed}</TableCell>
//                 <TableCell align="center">
//                   <IconButton size="small">
//                     <MoreVertIcon fontSize="small" />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Paper>
//     </Box>
//   );
// }

// import React, { useState } from 'react';
// import {
//   Box,
//   Typography,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Tabs,
//   Tab,
//   TextField,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   Paper,
//   InputAdornment,
//   IconButton,
//   Button,
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import SearchIcon from '@mui/icons-material/Search';
// import MoreVertIcon from '@mui/icons-material/MoreVert';

// const clientData = [
//   'Anima',
//   'Invesco',
//   'Legal and General',
//   'Lord Abbet',
//   'Model Office',
//   'Ninety One',
// ];

// const stateMonitorData = [
//   {
//     id: 'ui_manual_sm_adhoc_2aff05597c9d716...',
//     monitor: 'ARR_PARENT_EVENT',
//     effectiveDate: '2025-04-25',
//     retryCount: 0,
//     status: 'Success',
//     startTime: '2025-05-29 01:40:05',
//     completed: '2025-05-29 01:40:05',
//   },
//   {
//     id: 'ui_manual_sm_adhoc_2aff05597c9d716...',
//     monitor: 'ARR_PARENT_EVENT',
//     effectiveDate: '2025-04-25',
//     retryCount: 0,
//     status: 'Success',
//     startTime: '2025-05-29 01:40:05',
//     completed: '2025-05-29 01:40:05',
//   },
//   {
//     id: 'ui_manual_sm_adhoc_2aff05597c9d716...',
//     monitor: 'ARR_PARENT_EVENT',
//     effectiveDate: '2025-04-25',
//     retryCount: 0,
//     status: 'Success',
//     startTime: '2025-05-29 01:40:05',
//     completed: '2025-05-29 01:40:05',
//   },
// ];

// export default function SMView() {
//   const [startDate, setStartDate] = useState('2025-03-05');
//   const [endDate, setEndDate] = useState('2025-07-05');
//   const [timezone, setTimezone] = useState('Boston');
//   const [tab, setTab] = useState(2);

//   return (
//     <Box p={3}>
//       <Typography variant="subtitle2" color="primary" gutterBottom>
//         State Street Core Data / SLA Tracker
//       </Typography>

//       {/* Tabs + Filters Row */}
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'flex-end',
//           flexWrap: 'wrap',
//           gap: 2,
//           mb: 3,
//         }}
//       >
//         <Tabs value={tab} onChange={(_, newVal) => setTab(newVal)}>
//           <Tab label="Workflow View" />
//           <Tab label="Extract View" />
//           <Tab label="SM View" />
//         </Tabs>

//         <Box display="flex" gap={2} flexWrap="wrap">
//           <FormControl sx={{ minWidth: 200 }}>
//             <InputLabel>Client</InputLabel>
//             <Select defaultValue="All" label="Client">
//               <MenuItem value="All">All</MenuItem>
//               {clientData.map((name) => (
//                 <MenuItem key={name} value={name}>
//                   {name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <FormControl sx={{ minWidth: 250 }}>
//             <InputLabel>Data Service</InputLabel>
//             <Select defaultValue="Fund Accounting Data Service" label="Data Service">
//               <MenuItem value="Fund Accounting Data Service">Fund Accounting Data Service</MenuItem>
//             </Select>
//           </FormControl>
//         </Box>
//       </Box>

//       {/* Accordion for SLA View */}
//       <Accordion defaultExpanded sx={{ mb: 3 }}>
//         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//           <Typography variant="h6">SM View</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Paper elevation={1} sx={{ overflowX: 'auto' }}>
//             <Table size="small">
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Client Name</TableCell>
//                   <TableCell>SM Pending</TableCell>
//                   <TableCell>SM Failed</TableCell>
//                   <TableCell>SLA Met</TableCell>
//                   <TableCell>SLA Missed</TableCell>
//                   <TableCell>SLA At Risk</TableCell>
//                   <TableCell>Overall Failed</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {clientData.map((name) => (
//                   <TableRow key={name}>
//                     <TableCell>{name}</TableCell>
//                     {[...Array(6)].map((_, i) => (
//                       <TableCell key={i}>0</TableCell>
//                     ))}
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </Paper>
//         </AccordionDetails>
//       </Accordion>

//       {/* Deliverables Search and Controls */}
//       <Box
//         display="flex"
//         flexWrap="wrap"
//         alignItems="flex-end"
//         justifyContent="space-between"
//         gap={2}
//         mb={2}
//       >
//         {/* Label + Search */}
//         <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//           <Typography variant="body2" sx={{ mb: 0.5 }}>
//             Deliverable by State Monitor
//           </Typography>
//           <TextField
//             placeholder="Search deliverables..."
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Box>

//         {/* Timezone + Run Button */}
//         <Box display="flex" gap={2} alignItems="center">
//           <FormControl sx={{ minWidth: 160 }}>
//             <InputLabel>Time Zone</InputLabel>
//             <Select value={timezone} onChange={(e) => setTimezone(e.target.value)} label="Time Zone">
//               <MenuItem value="Boston">Boston</MenuItem>
//               <MenuItem value="UTC">UTC</MenuItem>
//             </Select>
//           </FormControl>

//           <Button variant="contained">Run State Monitor</Button>
//         </Box>
//       </Box>

//       {/* Monitor Table */}
//       <Paper elevation={1} sx={{ overflowX: 'auto' }}>
//         <Table size="small">
//           <TableHead>
//             <TableRow>
//               <TableCell>State Monitor</TableCell>
//               <TableCell>Effective Date</TableCell>
//               <TableCell>Retry Count</TableCell>
//               <TableCell>State Monitor Status</TableCell>
//               <TableCell>Status Monitor ID</TableCell>
//               <TableCell>Start Time</TableCell>
//               <TableCell>Completed</TableCell>
//               <TableCell align="center">⋮</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {stateMonitorData.map((row, i) => (
//               <TableRow key={i}>
//                 <TableCell sx={{ color: '#1976d2', cursor: 'pointer' }}>{row.monitor}</TableCell>
//                 <TableCell>{row.effectiveDate}</TableCell>
//                 <TableCell>{row.retryCount}</TableCell>
//                 <TableCell>
//                   <Box display="flex" alignItems="center" gap={1}>
//                     <Box
//                       sx={{
//                         width: 10,
//                         height: 10,
//                         borderRadius: '50%',
//                         backgroundColor: 'green',
//                       }}
//                     />
//                     {row.status}
//                   </Box>
//                 </TableCell>
//                 <TableCell>{row.id}</TableCell>
//                 <TableCell>{row.startTime}</TableCell>
//                 <TableCell>{row.completed}</TableCell>
//                 <TableCell align="center">
//                   <IconButton size="small">
//                     <MoreVertIcon fontSize="small" />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Paper>
//     </Box>
//   );
// }


// import React, { useState } from 'react';
// import {
//   Box,
//   Typography,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Tabs,
//   Tab,
//   TextField,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   Paper,
//   InputAdornment,
//   IconButton,
//   Button,
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import SearchIcon from '@mui/icons-material/Search';
// import MoreVertIcon from '@mui/icons-material/MoreVert';

// const clientData = [
//   'Anima',
//   'Invesco',
//   'Legal and General',
//   'Lord Abbet',
//   'Model Office',
//   'Ninety One',
// ];

// const stateMonitorData = [
//   {
//     id: 'ui_manual_sm_adhoc_2aff05597c9d716...',
//     monitor: 'ARR_PARENT_EVENT',
//     effectiveDate: '2025-04-25',
//     retryCount: 0,
//     status: 'Success',
//     startTime: '2025-05-29 01:40:05',
//     completed: '2025-05-29 01:40:05',
//   },
// ];

// export default function SMView() {
//   const [startDate, setStartDate] = useState('2025-03-05');
//   const [endDate, setEndDate] = useState('2025-07-05');
//   const [timezone, setTimezone] = useState('Boston');
//   const [tab, setTab] = useState(2);

//   return (
//     <Box p={3}>
//       <Typography variant="subtitle2" color="primary" gutterBottom>
//         State Street Core Data / SLA Tracker
//       </Typography>

//       {/* Filters Row */}
//       <Box
//         sx={{
//           display: 'flex',
//           flexWrap: 'nowrap',
//           gap: 2,
//           mb: 3,
//           overflowX: 'auto',
//           alignItems: 'flex-end',
//         }}
//       >
//         <Tabs value={tab} onChange={(_, newVal) => setTab(newVal)} sx={{ mb: 2 }}>
//           <Tab label="Workflow View" />
//           <Tab label="Extract View" />
//           <Tab label="SM View" />
//         </Tabs>

//         <FormControl sx={{ minWidth: 200 }}>
//           <InputLabel>Client</InputLabel>
//           <Select defaultValue="All" label="Client">
//             <MenuItem value="All">All</MenuItem>
//             {clientData.map((name) => (
//               <MenuItem key={name} value={name}>
//                 {name}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <FormControl sx={{ minWidth: 250 }}>
//           <InputLabel>Data Service</InputLabel>
//           <Select defaultValue="Fund Accounting Data Service" label="Data Service">
//             <MenuItem value="Fund Accounting Data Service">Fund Accounting Data Service</MenuItem>
//           </Select>
//         </FormControl>

//         <Box>
//           <Typography variant="body2" sx={{ mb: 0.5 }}>
//             Start Date
//           </Typography>
//           <TextField
//             type="date"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//             sx={{ minWidth: 180 }}
//           />
//         </Box>

//         <Box>
//           <Typography variant="body2" sx={{ mb: 0.5 }}>
//             End Date
//           </Typography>
//           <TextField
//             type="date"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//             sx={{ minWidth: 180 }}
//           />
//         </Box>
//       </Box>

//       {/* Accordion for SLA View */}
//       <Accordion defaultExpanded sx={{ mb: 3 }}>
//         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//           <Typography variant="h6">SM View</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Paper elevation={1} sx={{ overflowX: 'auto' }}>
//             <Table size="small">
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Client Name</TableCell>
//                   <TableCell>SM Pending</TableCell>
//                   <TableCell>SM Failed</TableCell>
//                   <TableCell>SLA Met</TableCell>
//                   <TableCell>SLA Missed</TableCell>
//                   <TableCell>SLA At Risk</TableCell>
//                   <TableCell>Overall Failed</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {clientData.map((name) => (
//                   <TableRow key={name}>
//                     <TableCell>{name}</TableCell>
//                     {[...Array(6)].map((_, i) => (
//                       <TableCell key={i}>0</TableCell>
//                     ))}
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </Paper>
//         </AccordionDetails>
//       </Accordion>

//       {/* Deliverables Search and Controls */}
//       <Box
//         display="flex"
//         flexWrap="wrap"
//         alignItems="flex-end"
//         justifyContent="space-between"
//         gap={2}
//         mb={2}
//       >
//         {/* Label + Search */}
//         <Box sx={{ display:"flex"}}>
//          <label>Deliverable by State Monitor</label>
//           <TextField
//             placeholder="Search deliverables..."
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Box>

//         {/* Timezone + Run Button */}
//         <Box display="flex" gap={2} alignItems="center">
//           <FormControl sx={{ minWidth: 160 }}>
//             <InputLabel>Time Zone</InputLabel>
//             <Select value={timezone} onChange={(e) => setTimezone(e.target.value)} label="Time Zone">
//               <MenuItem value="Boston">Boston</MenuItem>
//               <MenuItem value="UTC">UTC</MenuItem>
//             </Select>
//           </FormControl>

//           <Button variant="contained">Run State Monitor</Button>
//         </Box>
//       </Box>

//       {/* Monitor Table */}
//       <Paper elevation={1} sx={{ overflowX: 'auto' }}>
//         <Table size="small">
//           <TableHead>
//             <TableRow>
//               <TableCell>State Monitor</TableCell>
//               <TableCell>Effective Date</TableCell>
//               <TableCell>Retry Count</TableCell>
//               <TableCell>State Monitor Status</TableCell>
//               <TableCell>Status Monitor ID</TableCell>
//               <TableCell>Start Time</TableCell>
//               <TableCell>Completed</TableCell>
//               <TableCell align="center">⋮</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {stateMonitorData.map((row, i) => (
//               <TableRow key={i}>
//                 <TableCell sx={{ color: '#1976d2', cursor: 'pointer' }}>{row.monitor}</TableCell>
//                 <TableCell>{row.effectiveDate}</TableCell>
//                 <TableCell>{row.retryCount}</TableCell>
//                 <TableCell>
//                   <Box display="flex" alignItems="center" gap={1}>
//                     <Box
//                       sx={{
//                         width: 10,
//                         height: 10,
//                         borderRadius: '50%',
//                         backgroundColor: 'green',
//                       }}
//                     />
//                     {row.status}
//                   </Box>
//                 </TableCell>
//                 <TableCell>{row.id}</TableCell>
//                 <TableCell>{row.startTime}</TableCell>
//                 <TableCell>{row.completed}</TableCell>
//                 <TableCell align="center">
//                   <IconButton size="small">
//                     <MoreVertIcon fontSize="small" />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Paper>
//     </Box>
//   );
// }

// import React, { useState } from 'react';
// import {
//   Box,
//   Grid,
//   Typography,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Button,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   TextField,
//   Paper,
//   Tabs,
//   Tab,
//   Divider,
//   InputAdornment,
//   IconButton,
// } from '@mui/material';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import SearchIcon from '@mui/icons-material/Search';
// import {
//     Accordion,
//     AccordionSummary,
//     AccordionDetails
//   } from '@mui/material';
//   import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// const clientData = [
//   'Anima',
//   'Invesco',
//   'Legal and General',
//   'Lord Abbet',
//   'Model Office',
//   'Ninety One',
// ];

// const stateMonitorData = [
//   {
//     id: 'ui_manual_sm_adhoc_2aff05597c9d716...',
//     monitor: 'ARR_PARENT_EVENT',
//     effectiveDate: '2025-04-25',
//     retryCount: 0,
//     status: 'Success',
//     startTime: '2025-05-29 01:40:05',
//     completed: '2025-05-29 01:40:05',
//   },
//   {
//     id: 'ui_manual_sm_adhoc_2aff05597c9d716...',
//     monitor: 'ARR_PARENT_EVENT',
//     effectiveDate: '2025-04-25',
//     retryCount: 0,
//     status: 'Success',
//     startTime: '2025-05-29 01:40:05',
//     completed: '2025-05-29 01:40:05',
//   },
//   {
//     id: 'ui_manual_sm_adhoc_2aff05597c9d716...',
//     monitor: 'ARR_PARENT_EVENT',
//     effectiveDate: '2025-04-25',
//     retryCount: 0,
//     status: 'Success',
//     startTime: '2025-05-29 01:40:05',
//     completed: '2025-05-29 01:40:05',
//   },
// ];

// export default function SMView() {
//   const [startDate, setStartDate] = useState('2025-03-05');
//   const [endDate, setEndDate] = useState('2025-07-05');
//   const [timezone, setTimezone] = useState('Boston');
//   const [tab, setTab] = useState(2);

//   return (
//     <Box p={3}>
//       {/* Header */}
//       <Typography variant="subtitle2" color="primary" gutterBottom>
//         State Street Core Data / SLA Tracker
//       </Typography>

//       {/* Tabs */}
     

//       {/* Filters */}
//       {/* <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
//         <Grid item xs={12} sm={3}>
//           <FormControl fullWidth>
//             <InputLabel>Client</InputLabel>
//             <Select defaultValue="All" label="Client">
//               <MenuItem value="All">All</MenuItem>
//               {clientData.map((name) => (
//                 <MenuItem key={name} value={name}>
//                   {name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Grid>

//         <Grid item xs={12} sm={3}>
//           <FormControl fullWidth>
//             <InputLabel>Data Service</InputLabel>
//             <Select defaultValue="Fund Accounting Data Service" label="Data Service">
//               <MenuItem value="Fund Accounting Data Service">Fund Accounting Data Service</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>

//         <Grid item xs={12} sm={3}>
//           <Typography variant="body2" sx={{ mb: 0.5 }}>
//             Start Date
//           </Typography>
//           <TextField
//             fullWidth
//             type="date"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//           />
//         </Grid>

//         <Grid item xs={12} sm={3}>
//           <Typography variant="body2" sx={{ mb: 0.5 }}>
//             End Date
//           </Typography>
//           <TextField
//             fullWidth
//             type="date"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//           />
//         </Grid>
//       </Grid> */} 
//       <Box
//   sx={{
//     display: 'flex',
//     flexWrap: 'nowrap',
//     gap: 2,
//     mb: 3,
//     overflowX: 'auto',
//     alignItems: 'flex-end',
//   }}
// >  <Tabs value={tab} onChange={(_, newVal) => setTab(newVal)} sx={{ mb: 2 }}>
//         <Tab label="Workflow View" />
//         <Tab label="Extract View" />
//         <Tab label="SM View" />
//       </Tabs>
//   {/* Client Select */}
//   <FormControl sx={{ minWidth: 200 }}>
//     <InputLabel>Client</InputLabel>
//     <Select defaultValue="All" label="Client">
//       <MenuItem value="All">All</MenuItem>
//       {clientData.map((name) => (
//         <MenuItem key={name} value={name}>
//           {name}
//         </MenuItem>
//       ))}
//     </Select>
//   </FormControl>

//   {/* Data Service Select */}
//   <FormControl sx={{ minWidth: 250 }}>
//     <InputLabel>Data Service</InputLabel>
//     <Select defaultValue="Fund Accounting Data Service" label="Data Service">
//       <MenuItem value="Fund Accounting Data Service">Fund Accounting Data Service</MenuItem>
//     </Select>
//   </FormControl>

//   {/* Start Date */}
//   <Box>
//     <Typography variant="body2" sx={{ mb: 0.5 }}>
//       Start Date
//     </Typography>
//     <TextField
//       type="date"
//       value={startDate}
//       onChange={(e) => setStartDate(e.target.value)}
//       sx={{ minWidth: 180 }}
//     />
//   </Box>

//   {/* End Date */}
//   <Box>
//     <Typography variant="body2" sx={{ mb: 0.5 }}>
//       End Date
//     </Typography>
//     <TextField
//       type="date"
//       value={endDate}
//       onChange={(e) => setEndDate(e.target.value)}
//       sx={{ minWidth: 180 }}
//     />
//   </Box>
// </Box>


//       {/* SLA Table */}
//       <Accordion defaultExpanded sx={{ mb: 3 }}>
//   <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//     <Typography variant="h6">SM View</Typography>
//   </AccordionSummary>
//   <AccordionDetails>
//     <Paper elevation={1} sx={{ overflowX: 'auto' }}>
//       <Table size="small">
//         <TableHead>
//           <TableRow>
//             <TableCell>Client Name</TableCell>
//             <TableCell>SM Pending</TableCell>
//             <TableCell>SM Failed</TableCell>
//             <TableCell>SLA Met</TableCell>
//             <TableCell>SLA Missed</TableCell>
//             <TableCell>SLA At Risk</TableCell>
//             <TableCell>Overall Failed</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {clientData.map((name) => (
//             <TableRow key={name}>
//               <TableCell>{name}</TableCell>
//               {[...Array(6)].map((_, i) => (
//                 <TableCell key={i}>0</TableCell>
//               ))}
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </Paper>
//   </AccordionDetails>
// </Accordion>
//       {/* <Paper elevation={1} sx={{ overflowX: 'auto', mb: 4 }}>
//         <Table size="small">
//           <TableHead>
//             <TableRow>
//               <TableCell>Client Name</TableCell>
//               <TableCell>SM Pending</TableCell>
//               <TableCell>SM Failed</TableCell>
//               <TableCell>SLA Met</TableCell>
//               <TableCell>SLA Missed</TableCell>
//               <TableCell>SLA At Risk</TableCell>
//               <TableCell>Overall Failed</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {clientData.map((name) => (
//               <TableRow key={name}>
//                 <TableCell>{name}</TableCell>
//                 {[...Array(6)].map((_, i) => (
//                   <TableCell key={i}>0</TableCell>
//                 ))}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Paper> */}

//       {/* Search + Run Button */}
//       <Grid container spacing={2} alignItems="center" mb={2}>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             fullWidth
//             placeholder="Deliverables by State Monitor"
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Grid>
//         <Grid item xs={6} sm={3}>
//           <FormControl fullWidth>
//             <InputLabel>Time Zone</InputLabel>
//             <Select value={timezone} onChange={(e) => setTimezone(e.target.value)}>
//               <MenuItem value="Boston">Boston</MenuItem>
//               <MenuItem value="UTC">UTC</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={6} sm={3} textAlign="right">
//           <Button variant="contained">Run State Monitor</Button>
//         </Grid>
//       </Grid>

//       {/* Monitor Table */}
//       <Paper elevation={1} sx={{ overflowX: 'auto' }}>
//         <Table size="small">
//           <TableHead>
//             <TableRow>
//               <TableCell>State Monitor</TableCell>
//               <TableCell>Effective Date</TableCell>
//               <TableCell>Retry Count</TableCell>
//               <TableCell>State Monitor Status</TableCell>
//               <TableCell>Status Monitor ID</TableCell>
//               <TableCell>Start Time</TableCell>
//               <TableCell>Completed</TableCell>
//               <TableCell align="center">⋮</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {stateMonitorData.map((row, i) => (
//               <TableRow key={i}>
//                 <TableCell sx={{ color: '#1976d2', cursor: 'pointer' }}>{row.monitor}</TableCell>
//                 <TableCell>{row.effectiveDate}</TableCell>
//                 <TableCell>{row.retryCount}</TableCell>
//                 <TableCell>
//                   <Box display="flex" alignItems="center" gap={1}>
//                     <Box
//                       sx={{
//                         width: 10,
//                         height: 10,
//                         borderRadius: '50%',
//                         backgroundColor: 'green',
//                       }}
//                     />
//                     {row.status}
//                   </Box>
//                 </TableCell>
//                 <TableCell>{row.id}</TableCell>
//                 <TableCell>{row.startTime}</TableCell>
//                 <TableCell>{row.completed}</TableCell>
//                 <TableCell align="center">
//                   <IconButton size="small">
//                     <MoreVertIcon fontSize="small" />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Paper>
//     </Box>
//   );
// }


// import React, { useState } from 'react';
// import {
//   Box,
//   Typography,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   TextField,
//   Tabs,
//   Tab,
//   Paper,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Grid,
//   Button,
//   InputAdornment,
//   IconButton,
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import SearchIcon from '@mui/icons-material/Search';
// import MoreVertIcon from '@mui/icons-material/MoreVert';

// const clientData = [
//   'Anima',
//   'Invesco',
//   'Legal and General',
//   'Lord Abbet',
//   'Model Office',
//   'Ninety One',
// ];

// const stateMonitorData = [
//   {
//     id: 'ui_manual_sm_adhoc_2aff05597c9d716...',
//     monitor: 'ARR_PARENT_EVENT',
//     effectiveDate: '2025-04-25',
//     retryCount: 0,
//     status: 'Success',
//     startTime: '2025-05-29 01:40:05',
//     completed: '2025-05-29 01:40:05',
//   },
//   // Add more objects as needed
// ];

// export default function SMView() {
//   const [startDate, setStartDate] = useState('2025-03-05');
//   const [endDate, setEndDate] = useState('2025-07-05');
//   const [timezone, setTimezone] = useState('Boston');
//   const [tab, setTab] = useState(2);

//   return (
//     <Box p={3}>
//       <Typography variant="subtitle2" color="primary" gutterBottom>
//         State Street Core Data / SLA Tracker
//       </Typography>

//       {/* Filters Header Row */}
//       <Box
//         sx={{
//           display: 'flex',
//           flexWrap: 'nowrap',
//           gap: 2,
//           mb: 3,
//           overflowX: 'auto',
//           alignItems: 'flex-end',
//         }}
//       >
//         <Tabs value={tab} onChange={(_, newVal) => setTab(newVal)}>
//           <Tab label="Workflow View" />
//           <Tab label="Extract View" />
//           <Tab label="SM View" />
//         </Tabs>

//         <FormControl sx={{ minWidth: 200 }}>
//           <InputLabel>Client</InputLabel>
//           <Select defaultValue="All" label="Client">
//             <MenuItem value="All">All</MenuItem>
//             {clientData.map((name) => (
//               <MenuItem key={name} value={name}>
//                 {name}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <FormControl sx={{ minWidth: 250 }}>
//           <InputLabel>Data Service</InputLabel>
//           <Select defaultValue="Fund Accounting Data Service" label="Data Service">
//             <MenuItem value="Fund Accounting Data Service">Fund Accounting Data Service</MenuItem>
//           </Select>
//         </FormControl>

//         <Box>
//           <Typography variant="body2" sx={{ mb: 0.5 }}>
//             Start Date
//           </Typography>
//           <TextField
//             type="date"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//             sx={{ minWidth: 180 }}
//           />
//         </Box>

//         <Box>
//           <Typography variant="body2" sx={{ mb: 0.5 }}>
//             End Date
//           </Typography>
//           <TextField
//             type="date"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//             sx={{ minWidth: 180 }}
//           />
//         </Box>
//       </Box>

//       {/* SLA Accordion Table */}
//       <Accordion defaultExpanded sx={{ mb: 3 }}>
//         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//           <Typography variant="h6">SM View</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Paper elevation={1} sx={{ overflowX: 'auto' }}>
//             <Table size="small">
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Client Name</TableCell>
//                   <TableCell>SM Pending</TableCell>
//                   <TableCell>SM Failed</TableCell>
//                   <TableCell>SLA Met</TableCell>
//                   <TableCell>SLA Missed</TableCell>
//                   <TableCell>SLA At Risk</TableCell>
//                   <TableCell>Overall Failed</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {clientData.map((name) => (
//                   <TableRow key={name}>
//                     <TableCell>{name}</TableCell>
//                     {[...Array(6)].map((_, i) => (
//                       <TableCell key={i}>0</TableCell>
//                     ))}
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </Paper>
//         </AccordionDetails>
//       </Accordion>

//       {/* Search + Run Button */}
//       <Grid container spacing={2} alignItems="center" mb={2}>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             fullWidth
//             placeholder="Deliverables by State Monitor"
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Grid>
//         <Grid item xs={6} sm={3}>
//           <FormControl fullWidth>
//             <InputLabel>Time Zone</InputLabel>
//             <Select value={timezone} onChange={(e) => setTimezone(e.target.value)}>
//               <MenuItem value="Boston">Boston</MenuItem>
//               <MenuItem value="UTC">UTC</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={6} sm={3} textAlign="right">
//           <Button variant="contained">Run State Monitor</Button>
//         </Grid>
//       </Grid>

//       {/* Monitor Table */}
//       <Paper elevation={1} sx={{ overflowX: 'auto' }}>
//         <Table size="small">
//           <TableHead>
//             <TableRow>
//               <TableCell>State Monitor</TableCell>
//               <TableCell>Effective Date</TableCell>
//               <TableCell>Retry Count</TableCell>
//               <TableCell>State Monitor Status</TableCell>
//               <TableCell>Status Monitor ID</TableCell>
//               <TableCell>Start Time</TableCell>
//               <TableCell>Completed</TableCell>
//               <TableCell align="center">⋮</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {stateMonitorData.map((row, i) => (
//               <TableRow key={i}>
//                 <TableCell sx={{ color: '#1976d2', cursor: 'pointer' }}>{row.monitor}</TableCell>
//                 <TableCell>{row.effectiveDate}</TableCell>
//                 <TableCell>{row.retryCount}</TableCell>
//                 <TableCell>
//                   <Box display="flex" alignItems="center" gap={1}>
//                     <Box
//                       sx={{
//                         width: 10,
//                         height: 10,
//                         borderRadius: '50%',
//                         backgroundColor: 'green',
//                       }}
//                     />
//                     {row.status}
//                   </Box>
//                 </TableCell>
//                 <TableCell>{row.id}</TableCell>
//                 <TableCell>{row.startTime}</TableCell>
//                 <TableCell>{row.completed}</TableCell>
//                 <TableCell align="center">
//                   <IconButton size="small">
//                     <MoreVertIcon fontSize="small" />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Paper>
//     </Box>
//   );
// }
