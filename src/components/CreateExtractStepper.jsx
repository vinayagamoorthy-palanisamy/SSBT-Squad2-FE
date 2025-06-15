import React from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';

export default function CreateExtractStepper({ steps, activeStep }) {
  return (
    <Stepper
      activeStep={activeStep}
      alternativeLabel
      sx={{         width: steps.length > 2 ? "60%" : "30%",
        '& .MuiStepConnector-root': {
          top: '12px', 

        },
        '& .MuiStepConnector-line': {
          borderTopWidth: 2,
          borderColor: '#ccc',

        }, }}
    >
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
