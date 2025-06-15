// src/components/SubmitCoreExtract.jsx
import React from 'react';
import {
  Box,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Divider,
  FormControlLabel,
  Switch,
} from '@mui/material';
import ActionButtons from './ActionButtons';

export default function SubmitCoreExtract({
  onCancel,
  onSave,
  onBack,
  onNext,
  onSubmit,
}) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Submit Core Extract
      </Typography>

      <Grid container spacing={2} alignItems="flex-start">
        {/* Row 1 */}
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>Extract File Format *</InputLabel>
            <Select defaultValue="">
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="CSV">CSV</MenuItem>
              <MenuItem value="Delimited">Delimited</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Extract Tolerance"
            placeholder="Enter tolerance"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Extract Group"
            placeholder="Enter extract group"
          />
        </Grid>

        {/* Row 2 */}
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>Data Delimiter *</InputLabel>
            <Select defaultValue="">
              <MenuItem value="">Select</MenuItem>
              <MenuItem value=",">Comma</MenuItem>
              <MenuItem value=" ">Space</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>Header Delimiter</InputLabel>
            <Select defaultValue="">
              <MenuItem value="">Select</MenuItem>
              <MenuItem value=",">Comma</MenuItem>
              <MenuItem value=" ">Space</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>Footer Delimiter</InputLabel>
            <Select defaultValue="">
              <MenuItem value="">Select</MenuItem>
              <MenuItem value=",">Comma</MenuItem>
              <MenuItem value=" ">Space</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Full-width description */}
        <Grid item xs={12}>
          <TextField fullWidth label="Description" placeholder="Enter description" />
        </Grid>

        {/* Divider + switch */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Switch />}
            label="Create Defined Extract Using Core"
          />
        </Grid>
      </Grid>

      {/* Actions */}
      <Box display="flex" justifyContent="flex-end" mt={3}>
        <ActionButtons
          currentStep={1}
          onCancel={onCancel}
          onSave={onSave}
          onBack={onBack}
          onNext={onNext}
          onSubmit={onSubmit}
        />
      </Box>
    </Box>
  );
}
