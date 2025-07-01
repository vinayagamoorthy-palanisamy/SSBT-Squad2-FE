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
    <TableContainer component={Paper} sx={{ mb: 2 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Client Name</TableCell>
            <TableCell>SM Pending</TableCell>
            <TableCell>SM Failed</TableCell>
            <TableCell>SM Met</TableCell>
            <TableCell>SM Missed</TableCell>
            <TableCell>SM At Risk</TableCell>
            <TableCell>Overall Failed</TableCell>
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
              <TableCell>{row.failedOverall}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WorkflowSummaryTable;
