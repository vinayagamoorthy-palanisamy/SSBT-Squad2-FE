import { Stepper, Step, StepLabel } from '@mui/material';

const CreateExtractStepper = () => {
  const steps = ['Create Core Extract', 'Submit Core Extract'];

  return (
    <Stepper
      activeStep={0}
      alternativeLabel
      sx={{
        width: '30%',
        '& .MuiStepConnector-root': {
          top: '12px', 

        },
        '& .MuiStepConnector-line': {
          borderTopWidth: 2,
          borderColor: '#ccc',

        },

      }}
    >
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default CreateExtractStepper;