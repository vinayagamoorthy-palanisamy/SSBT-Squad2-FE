import React, { useRef, useState } from 'react';
import {
  Container,
  Paper,
  Box,
  Typography,
} from '@mui/material';
import CreateExtractStepper from './CreateExtractStepper';
import CoreExtractForm from './CoreExtractForm';
import DatasetSection from './DatasetSection';
import SQLWrapperSection from './SQLWrapperSection';
import SubmitCoreExtract from './SubmitCoreExtract';
import SubmitDefinedExtract from './SubmitDefinedExtract';
import ActionButtons from './ActionButtons';

export default function CreateExtractPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [isDefine, setIsDefine]     = useState(false);

  const coreRef = useRef();
  const definedRef = useRef();

  const coreSteps   = ['Create Core Extract', 'Submit Core Extract'];
  const defineSteps = [
    'Create Core Extract',
    'Submit Core Extract',
    'Create Defined Extract',
    'Submit Defined Extract',
  ];
  const steps = isDefine ? defineSteps : coreSteps;

  const handleToggleDefine = (checked) => {
    setIsDefine(checked);
    if (!checked && activeStep > 1) setActiveStep(1);
  };

const handleNext = () => {
  if (activeStep === 1 && coreRef.current) {
    const result = coreRef.current.submitForm();
    if (!result?.isValid) {
      console.warn('Validation failed');
      return;
    }
    console.log('Core Extract Submit data:', result.data);
  }

  setActiveStep((s) => Math.min(s + 1, steps.length - 1));
};
  const handleBack   = () => setActiveStep((s) => Math.max(s - 1, 0));
  const handleCancel = () => {
    console.log('Cancelled');
  };
  const handleSave   = () => {
    console.log('Saved (stub)');
  };

  const handleSubmit = () => {
    let result = null;

    if (activeStep === 1 && coreRef.current) {
      result = coreRef.current.submitForm();
    } else if (activeStep === 3 && definedRef.current) {
      result = definedRef.current.submitForm();
    }

    if (result?.isValid) {
      console.log('✅ Form submitted with values:', result.data);
      // You can integrate API call or next steps here
    } else {
      console.warn('❌ Validation failed on current form');
    }
  };

  let content;
  switch (activeStep) {
    case 0:
      content = (
        <>
          <CoreExtractForm />
          <DatasetSection />
          <SQLWrapperSection />
        </>
      );
      break;
    case 1:
      content = (
        <SubmitCoreExtract
          ref={coreRef}
          isDefine={isDefine}
          onToggleDefine={handleToggleDefine}
        />
      );
      break;
    case 2:
      content = (
        <>
          <CoreExtractForm />
          <DatasetSection />
          <SQLWrapperSection />
        </>
      );
      break;
    case 3:
      content = <SubmitDefinedExtract ref={definedRef} />;
      break;
    default:
      content = null;
  }

  return (
    <Container maxWidth="lg" p={3} bgcolor="#f5f6f9" minHeight="100vh">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Box display="flex" alignItems="center" justifyContent="flex-start" gap={2} mb={2}>
          <Typography variant="h4" >
            Create Extract
          </Typography>
        <CreateExtractStepper steps={steps} activeStep={activeStep} />
        </Box>


        {content}

        <ActionButtons
          currentStep={activeStep}
          lastStep={steps.length - 1}
          onCancel={handleCancel}
          onSave={handleSave}
          onBack={handleBack}
          onNext={handleNext}
          onSubmit={handleSubmit}
        />
      </Paper>
    </Container>
  );
}
