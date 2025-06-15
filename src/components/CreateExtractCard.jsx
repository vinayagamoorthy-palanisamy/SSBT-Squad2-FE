import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import ExtractCard from './card';
import ExtractList from './list';
import ToastNotification from './toastify';
const extractOptions = [
  {
    title: 'Core Extract',
    description: 'Standardized, reusable data extract that provides structured, validated content for consistent use',
  },
  {
    title: 'Defined Extract',
    description: 'Tailored data extract with specific formatting or logic needs beyond standard templates',
  },
  {
    title: 'Defined Extract From Core',
    description: 'Configurable data extract created from a core extract template',
  },
];

const CreateExtractCard = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('error');
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleCreate = () => {
    setButtonDisabled(true); 
    if (selectedIndex === null) {
      setToastMessage('Please select an extract type before proceeding.');
      setToastType('error');
      setToastOpen(true);
      setButtonDisabled(false); 
      return;
    }
  };

  return (
    <Box
      sx={{
        minHeight: '95vh',
        backgroundColor: '#f5f6f8',
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Typography variant="h4" fontSize="32px" padding="12px 0px" fontWeight="600" gutterBottom color='#101114'>
          Create Extract
        </Typography>

        <Typography variant="h6" fontWeight="400" gutterBottom sx={{ marginTop: 2 }}  color='#101114'>
          Select Extract Type
        </Typography>

        <Box display="flex" gap={3} flexWrap="wrap" mt={2}>
          {extractOptions.map((item, index) => (
            <ExtractCard
              key={index}
              title={item.title}
              description={item.description}
              selected={selectedIndex === index}
              onClick={() => {
                setSelectedIndex(index);
                setButtonDisabled(false); 
              }}
            />
          ))}
        </Box>

        {selectedIndex === 2 && <ExtractList />}
      </Box>

      <Box display="flex" justifyContent="flex-end" mt={4}>
        <Button
          variant="contained"
          color="primary"
          sx={{ borderRadius: 0, boxShadow: 3, position: 'fixed', bottom: "16px", right: "16px" }}
          onClick={handleCreate}
          disabled={buttonDisabled}
        >
          Create Extract
        </Button>
      </Box>

      <ToastNotification
        open={toastOpen}
        type={toastType}
        message={toastMessage}
        onClose={() => setToastOpen(false)}
      />
    </Box>
  );
};

export default CreateExtractCard;
