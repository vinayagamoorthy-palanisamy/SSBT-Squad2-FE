import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Box
} from '@mui/material';

/**
 * Props:
 *   open: boolean
 *   onClose: () => void
 *   parameters: Array<{ name: string; value: string }>
 *   onViewData: () => void
 */
export default function ParameterPreviewModal({ open, onClose, parameters = [], onViewData }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Extract Parameters</DialogTitle>
      <DialogContent>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Value</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {parameters.map((p, i) => (
              <TableRow key={i}>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box display="flex" justifyContent="flex-end" mt={2} gap={1}>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={() => { onClose(); onViewData(); }}>View Preview</Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

