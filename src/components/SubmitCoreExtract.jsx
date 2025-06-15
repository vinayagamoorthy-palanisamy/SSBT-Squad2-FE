import React, { useState, forwardRef, useImperativeHandle } from 'react';
import {
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Divider,
  FormControlLabel,
  Switch,
  Typography,
} from '@mui/material';

const SubmitCoreExtract = forwardRef(({ isDefine, onToggleDefine }, ref) => {
  const [formValues, setFormValues] = useState({
    fileFormat: '',
    tolerance: '',
    group: '',
    dataDelimiter: '',
    headerDelimiter: '',
    footerDelimiter: '',
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

      setErrors(newErrors);
      const isValid = Object.keys(newErrors).length === 0;

      return {
        isValid,
        data: {
          ...formValues,
          createDefinedExtract: isDefine,
        },
      };
    },
  }));

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Submit Core Extract
      </Typography>

      <Grid container spacing={2}>
        {[
          [
            { key: 'fileFormat', label: 'Extract File Format *', type: 'select', options: ['CSV', 'Delimited'] },
            { key: 'tolerance', label: 'Extract Tolerance', type: 'text', placeholder: 'Enter tolerance' },
            { key: 'group', label: 'Extract Group', type: 'text', placeholder: 'Enter extract group' },
          ],
          [
            { key: 'dataDelimiter', label: 'Data Delimiter *', type: 'select', options: ['Comma', 'Space'] },
            { key: 'headerDelimiter', label: 'Header Delimiter', type: 'select', options: ['Comma', 'Space'] },
            { key: 'footerDelimiter', label: 'Footer Delimiter', type: 'select', options: ['Comma', 'Space'] },
          ],
        ].map((row, ri) => (
          <React.Fragment key={ri}>
            {row.map((field) => (
              <Grid item xs={4} sx={{ minWidth: '25%' }} key={field.key}>
                {field.type === 'select' ? (
                  <FormControl fullWidth error={!!errors[field.key]}>
                    <InputLabel>{field.label}</InputLabel>
                    <Select
                      value={formValues[field.key]}
                      onChange={handleChange(field.key)}
                      label={field.label}
                    >
                      <MenuItem value="">Select</MenuItem>
                      {field.options.map((o) => (
                        <MenuItem value={o} key={o}>
                          {o}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <TextField
                    fullWidth
                    label={field.label}
                    placeholder={field.placeholder}
                    value={formValues[field.key]}
                    onChange={handleChange(field.key)}
                    error={!!errors[field.key]}
                    helperText={errors[field.key] || ''}
                  />
                )}
              </Grid>
            ))}
          </React.Fragment>
        ))}

          <Grid item xs={12} sx={{ minWidth: '51.5%' }}>
            <TextField
              fullWidth
              label="Description"
              placeholder="Enter description"
              value={formValues.description}
              onChange={handleChange('description')}
            />
          </Grid>
      </Grid>

        <Grid container xs={12} display="flex" flexDirection="column" >
                    <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={isDefine}
                  onChange={(_, v) => onToggleDefine(v)}
                />
              }
              label="Create Defined Extract Using Core"
            />
          </Grid>
        </Grid>
    </Box>
  );
});

export default SubmitCoreExtract;
