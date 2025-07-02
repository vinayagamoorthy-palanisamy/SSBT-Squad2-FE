import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller, useFieldArray } from 'react-hook-form';

const RunStateMonitor = ({ children }) => {
  const [open, setOpen] = useState(false);

  const { control, handleSubmit, register, reset } = useForm({
    defaultValues: {
      stateMonitorName: '',
      client: '',
      asOfDate: new Date().toISOString().slice(0, 10),
      comment: '',
      attributes: [],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: 'attributes',
  });

  const onSubmit = (data) => {
    console.log('Submitted Data:', data);
    setOpen(false);
    reset();
  };

  return (
    <>
      {children({ openDialog: () => setOpen(true) })}

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ px: 4, pt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Run State Monitor
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Box display="flex" gap={2} mb={2}>
              <FormControl fullWidth required>
                <InputLabel>State Monitor Name</InputLabel>
                <Controller
                  name="stateMonitorName"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label="State Monitor Name">
                      <MenuItem value="Monitor 1">Monitor 3</MenuItem>
                      <MenuItem value="Monitor 2">Monitor 2</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>

              <Controller
                name="asOfDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="As of Date"
                    type="date"
                    fullWidth
                    required
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            </Box>

            <FormControl fullWidth required sx={{ mb: 2 }}>
              <InputLabel>Client</InputLabel>
              <Controller
                name="client"
                control={control}
                render={({ field }) => (
                  <Select {...field} label="Client">
                    <MenuItem value="Client A">Client A</MenuItem>
                    <MenuItem value="Client B">Client B</MenuItem>
                  </Select>
                )}
              />
            </FormControl>

            <TextField
              label="Comment"
              multiline
              minRows={3}
              fullWidth
              {...register('comment')}
              placeholder="Enter text here..."
              variant="outlined"
              sx={{ mb: 2 }}
            />

            <Typography variant="subtitle1" gutterBottom>
              Events Attributes
            </Typography>

            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Value</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fields.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <TextField fullWidth {...register(`attributes.${index}.name`)} />
                    </TableCell>
                    <TableCell>
                      <TextField fullWidth {...register(`attributes.${index}.value`)} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Button onClick={() => append({ name: '', value: '' })} sx={{ mt: 1 }}>
              + Add Attributes
            </Button>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSubmit(onSubmit)} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RunStateMonitor;

