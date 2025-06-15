import { Box, Typography } from '@mui/material';
import CreateExtractStepper from './CreateExtractStepper';
import CoreExtractForm from './CoreExtractForm';
import DatasetSection from './DatasetSection';
import SQLWrapperSection from './SQLWrapperSection';

const CreateExtractPage = () => {
  const handleCancel = () => {
    alert("Cancel clicked");
  };

  const handleSave = () => {
    alert("Save clicked");
  };

  const handleNext = () => {
    alert("Next clicked");
  };

  return (
    <Box p={3} bgcolor="#f5f6f9" minHeight="100vh">
      <Box display='flex' alignItems="center" mb={10}>
        <Typography variant="h4" fontWeight="bold" color="black">
          Create Extract
        </Typography>
        <CreateExtractStepper />
      </Box>

      <CoreExtractForm />
      <DatasetSection />
      <SQLWrapperSection />

      <Box 
        display="flex" 
        justifyContent="flex-end" 
        mt={4} 
        gap="10px"
      >
        <button
          onClick={handleCancel}
          style={{
            background: 'none',
            border: 'none',
            color: '#002db3',
            fontSize: '16px',
            padding: '10px 20px',
            cursor: 'pointer'
          }}
        >
          Cancel
        </button>

        <button
          onClick={handleSave}
          style={{
            backgroundColor: 'white',
            border: '1px solid #002db3',
            color: '#002db3',
            fontSize: '16px',
            padding: '10px 20px',
            cursor: 'pointer'
          }}
        >
          Save
        </button>

        <button
          onClick={handleNext}
          style={{
            backgroundColor: '#002db3',
            color: 'white',
            border: 'none',
            fontSize: '16px',
            padding: '10px 20px',
            cursor: 'pointer'
          }}
        >
          Next
        </button>
      </Box>
    </Box>
  );
};

export default CreateExtractPage;