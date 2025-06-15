import React, { useState, forwardRef, useImperativeHandle } from 'react';
import {
  Box,
  Grid,
  Divider,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const SubmitDefinedExtract = forwardRef((_, ref) => {
  const [formValues, setFormValues] = useState({
    fileFormat: '',
    tolerance: '',
    group: '',
    dataDelimiter: '',
    headerDelimiter: '',
    footerDelimiter: '',
    headerDateFormat: '',
    footerDateFormat: '',
    stagingLocation: '',
    transmissionChannel: '',
    fileNameFormat: '',
    fileNameDateFormat: '',
    description: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setFormValues({ ...formValues, [field]: e.target.value });
  };

  useImperativeHandle(ref, () => ({
    submitForm: () => {
      const newErrors = {};
      if (!formValues.fileFormat) newErrors.fileFormat = 'Required';
      if (!formValues.dataDelimiter) newErrors.dataDelimiter = 'Required';
      if (!formValues.transmissionChannel) newErrors.transmissionChannel = 'Required';

      setErrors(newErrors);
      const isValid = Object.keys(newErrors).length === 0;

      return {
        isValid,
        data: formValues,
      };
    },
  }));

  return (
    <Box mt={4}>
      <Typography variant="h5" gutterBottom>
        Submit Defined Extract
      </Typography>

      <Grid container spacing={2}>
        {/* Row 1 */}
        <Grid item xs={12} md={4} sx={{ minWidth: '25%' }}>
          <FormControl fullWidth error={!!errors.fileFormat}>
            <InputLabel>Extract File Format *</InputLabel>
            <Select value={formValues.fileFormat} onChange={handleChange('fileFormat')}>
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="CSV">CSV</MenuItem>
              <MenuItem value="Delimited">Delimited</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4} sx={{ minWidth: '25%' }}>
          <TextField
            fullWidth
            label="Extract Tolerance"
            placeholder="Zero_tolerance"
            value={formValues.tolerance}
            onChange={handleChange('tolerance')}
          />
        </Grid>
        <Grid item xs={12} md={4} sx={{ minWidth: '25%' }}>
          <TextField
            fullWidth
            label="Extract Group"
            placeholder="SOD_ME"
            value={formValues.group}
            onChange={handleChange('group')}
          />
        </Grid>

        {/* Row 2 */}
        <Grid item xs={12} md={4} sx={{ minWidth: '25%' }}>
          <FormControl fullWidth error={!!errors.dataDelimiter}>
            <InputLabel>Data Delimiter *</InputLabel>
            <Select value={formValues.dataDelimiter} onChange={handleChange('dataDelimiter')}>
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="space">space ( )</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4} sx={{ minWidth: '25%' }}>
          <FormControl fullWidth>
            <InputLabel>Header Delimiter</InputLabel>
            <Select value={formValues.headerDelimiter} onChange={handleChange('headerDelimiter')}>
              <MenuItem value="space">space ( )</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4} sx={{ minWidth: '25%' }}>
          <FormControl fullWidth>
            <InputLabel>Footer Delimiter</InputLabel>
            <Select value={formValues.footerDelimiter} onChange={handleChange('footerDelimiter')}>
              <MenuItem value="space">space ( )</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Row 3 */}
        <Grid item xs={12} md={4} sx={{ minWidth: '25%' }}>
          <TextField
            fullWidth
            label="Header Date Format"
            placeholder="YYYY-MM-DD"
            value={formValues.headerDateFormat}
            onChange={handleChange('headerDateFormat')}
          />
        </Grid>
        <Grid item xs={12} md={4} sx={{ minWidth: '25%' }}>
          <TextField
            fullWidth
            label="Footer Date Format"
            placeholder="YYYY-MM-DD"
            value={formValues.footerDateFormat}
            onChange={handleChange('footerDateFormat')}
          />
        </Grid>
        <Grid item xs={12} md={4} sx={{ minWidth: '25%' }}>
          <FormControl fullWidth>
            <InputLabel>Extract Staging Location</InputLabel>
            <Select
              value={formValues.stagingLocation}
              onChange={handleChange('stagingLocation')}
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="STAGING_BLOB">SS_DD_JANUS_EXTRACTS_BLOB</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Row 4 */}
        <Grid item xs={12} md={4} sx={{ minWidth: '25%' }}>
          <FormControl fullWidth error={!!errors.transmissionChannel}>
            <InputLabel>Extract Transmission Channel *</InputLabel>
            <Select
              value={formValues.transmissionChannel}
              onChange={handleChange('transmissionChannel')}
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="SFTP1">CRIMS_JANUS_SFTP_CHANNEL1</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4} sx={{ minWidth: '25%' }}>
          <TextField
            fullWidth
            label="Extract File Name Format"
            placeholder="App_Code_Extract_Name"
            value={formValues.fileNameFormat}
            onChange={handleChange('fileNameFormat')}
          />
        </Grid>
        <Grid item xs={12} md={4} sx={{ minWidth: '25%' }}>
          <TextField
            fullWidth
            label="Extract File Name Date Format"
            placeholder="YYYY-MM-DD"
            value={formValues.fileNameDateFormat}
            onChange={handleChange('fileNameDateFormat')}
          />
        </Grid>

        {/* Row 5 */}
        <Grid item xs={12} sx={{ minWidth: '51.5%' }}>
          <TextField
            fullWidth
            multiline
            rows={2}
            label="Description"
            placeholder="Enter description"
            value={formValues.description}
            onChange={handleChange('description')}
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />
    </Box>
  );
});

export default SubmitDefinedExtract;
