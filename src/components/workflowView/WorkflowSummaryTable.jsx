import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { workflowSummary } from "../../data/workflowData";

const WorkflowSummaryTable = () => {
  return (
    <TableContainer
  component={Paper}
  sx={{
    mb: 2,
    maxHeight: '300px',
    overflowY: 'auto',
    borderRadius: 0,
    backgroundColor: '#fff',
  }}
>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Client Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>SM Pending</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>SM Failed</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>SM Met</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>SM Missed</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>SM At Risk</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Overall Failed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workflowSummary.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell>{row.client}</TableCell>
              <TableCell>{row.pending}</TableCell>
              <TableCell>{row.failed}</TableCell>
              <TableCell>{row.met}</TableCell>
              <TableCell>{row.missed}</TableCell>
              <TableCell>{row.risk}</TableCell>
              <TableCell
                sx={{
                  color: row.failedOverall > 0 ? "#f44336" : "inherit",
                }}
              >
                {row.failedOverall}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WorkflowSummaryTable;
