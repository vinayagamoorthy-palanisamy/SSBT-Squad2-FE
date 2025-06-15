// src/components/CreateDefinedExtract.jsx

import React from 'react';
import { Box, Typography } from '@mui/material';
import CoreExtractForm from './CoreExtractForm';
import DatasetSection from './DatasetSection';
import SQLWrapperSection from './SQLWrapperSection';
import ActionButtons from './ActionButtons';

export default function CreateDefinedExtract({
  onCancel,
  onSave,
  onBack,
  onNext,
}) {
  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
        Create Defined Extract
      </Typography>

      {/* Reuse your core‐extract form steps */}
      <CoreExtractForm />
      <DatasetSection />
      <SQLWrapperSection />

      {/* Actions */}
      <Box display="flex" justifyContent="flex-end" mt={3}>
        <ActionButtons
          currentStep={2}
          onCancel={onCancel}
          onSave={onSave}
          onBack={onBack}
          onNext={onNext}
        />
      </Box>
    </Box>
  );
}
