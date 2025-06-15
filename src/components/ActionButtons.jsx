import React from 'react';
import { Box, Button } from '@mui/material';

export default function ActionButtons({
  currentStep,
  lastStep,
  onCancel,
  onSave,
  onBack,
  onNext,
  onSubmit,
}) {
  return (
    <Box display="flex" justifyContent="space-between" mt={4} px={2}>
      <Box>
        <Button onClick={onCancel}>Cancel</Button>
        {currentStep > 0 && (
          <Button onClick={onBack}>Back</Button>
        )}
      </Box>
      <Box>
        <Button onClick={onSave} sx={{ mr: 1 }}>Save</Button>
        {currentStep < lastStep ? (
          <Button variant="contained" onClick={onNext}>
            Next
          </Button>
        ) : (
          <Button variant="contained" onClick={onSubmit}>
            Submit
          </Button>
        )}
      </Box>
    </Box>
  );
}
