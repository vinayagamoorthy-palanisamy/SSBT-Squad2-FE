import React from 'react';
import { Box, Button } from '@mui/material';

const DynamicButtonGroup = ({
  showBack,
  showCancel,
  showSave,
  showSubmit,
  onBack,
  onCancel,
  onSave,
  onSubmit,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 2,
        mt: 4,
      }}
    >
      {showBack && <Button onClick={onBack} variant="outlined">Back</Button>}
      {showCancel && <Button onClick={onCancel} variant="outlined">Cancel</Button>}
      {showSave && <Button onClick={onSave} variant="contained" color="primary">Save</Button>}
      {showSubmit && <Button onClick={onSubmit} variant="contained" color="primary">Submit</Button>}
    </Box>
  );
};

export default DynamicButtonGroup;
