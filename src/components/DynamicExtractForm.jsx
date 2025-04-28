import React from 'react';
import { Box, MenuItem, TextField, Typography } from '@mui/material';

const DynamicExtractForm = ({ title, fields }) => {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 3 }}>{title}</Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          rowGap: 3,
        }}
      >
        {fields.map((field, idx) => (
          <Box key={idx} sx={{ flex: '1 1 calc(25% - 16px)', minWidth: 200 }}>
            {field.type === 'select' ? (
              <TextField
                fullWidth
                select
                label={field.label}
                defaultValue={field.defaultValue || ''}
              >
                {field.options.map((option, i) => (
                  <MenuItem key={i} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            ) : (
              <TextField
                fullWidth
                label={field.label}
                placeholder={field.placeholder}
                defaultValue={field.defaultValue || ''}
              />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default DynamicExtractForm;
