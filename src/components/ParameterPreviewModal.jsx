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
  Box,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          Extract Parameters
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Table size="small">
  <TableHead>
    <TableRow>
      <TableCell sx={{ border: '1px solid #ccc' }}><strong>Name</strong></TableCell>
      <TableCell sx={{ border: '1px solid #ccc' }}><strong>Value</strong></TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {parameters.map((p, i) => (
      <TableRow key={i}>
        <TableCell sx={{ border: '1px solid #ccc' }}>{p.name}</TableCell>
        <TableCell sx={{ border: '1px solid #ccc' }}>{p.value}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>

        <Box display="flex" justifyContent="flex-end" mt={2} gap={1}>
          <Button onClick={onClose} sx={{
            color: '#0033cc',
            border: '2px solid #0033cc',
            backgroundColor: '#fff',
          }}>Cancel</Button>
          <Button variant="contained" onClick={() => { onClose(); onViewData(); }}sx={{
            color: '#fff',
            backgroundColor: '#0033cc',
            '&:hover': { backgroundColor: '#002bb8' },
          }}>View Preview</Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
