import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const DynamicButtonGroup = ({
  showBack,
  showCancel,
  showSave,
  showSubmit,
  onBack,
  onCancel,
  onSave,
  onSubmit,
  showEdit,
  showCloneExtract,
  showApprove,
  showReject,
  onEdit,
  onCloneExtract,
  onApprove,
  onReject
}) => {

  const theme = createTheme({
    palette: {
      dark: {
        main: '#46474B'
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 2,
      }}
    >
      {showBack && <Button onClick={onBack} variant="outlined">Back</Button>}
      {showCancel && <Button onClick={onCancel} variant="outlined">Cancel</Button>}
      {showSave && <Button onClick={onSave} variant="contained" color="primary">Save</Button>}
      {showSubmit && <Button onClick={onSubmit} variant="contained" color="primary">Submit</Button>}
      {showEdit && <Button onClick={onEdit} variant="contained" color="dark">Edit</Button>}
      {showCloneExtract && <Button onClick={onCloneExtract} variant="contained" color="dark">Clone Extract</Button>}
      {showApprove && <Button onClick={onApprove} variant="contained" color="dark">Approve</Button>}
      {showReject && <Button onClick={onReject} variant="contained" color="dark">Reject</Button>}
    </Box>
    </ThemeProvider>
  );
};

export default DynamicButtonGroup;
