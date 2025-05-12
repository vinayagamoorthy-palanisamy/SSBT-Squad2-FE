import React, { useState } from "react";
import { Box, Stepper, Step, StepLabel, Paper } from "@mui/material";
import DefineCoreExtract from "./DefineCoreExtract";
import EditableTransferList from "./SubmitCoreExtract";

const steps = ["Define Core Extract", "Submit Core Extract"];

const CoreExtractStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [extractData, setExtractData] = useState(null);

  const handleNext = (data) => {
    setExtractData(data);
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    console.log("Final submission:", extractData);
    // You can add API calls here
    alert("Core extract submitted successfully!");
  };

  return (
    <Box p={3}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Paper elevation={3} sx={{ mt: 3, p: 3 }}>
        {activeStep === 0 && (
          <DefineCoreExtract onNext={handleNext} />
        )}
        {activeStep === 1 && extractData && (
            <EditableTransferList />
        //   <SubmitCoreExtract
        //     // extractData={extractData}
        //     // onBack={handleBack}
        //     // onSubmit={handleSubmit}
        //   />
        )}
      </Paper>
    </Box>
  );
};

export default CoreExtractStepper;
