import React from 'react';
import { Box, MenuItem, Stack, TextField, Typography } from '@mui/material';

const DynamicExtractForm = ({ title, fields, isTitleAvailable=false, color, customTitleStyle={mb: 3} }) => {
  return (
    <Box>
      {isTitleAvailable && <Typography variant="h6" sx={customTitleStyle} color={color}>{title}</Typography>}
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
            {field?.type === 'select' ? (
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
            ) : field?.type === 'text' ? (
              <TextField
                fullWidth
                label={field?.label}
                placeholder={field?.placeholder}
                defaultValue={field?.defaultValue || ''}
              />
            ) : (
              <Stack spacing={1}>
              <Typography variant='body2' color='black'>{field?.label}</Typography>
              <Typography variant='body2' color='black'>{field?.defaultValue}</Typography>
              </Stack>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default DynamicExtractForm;
