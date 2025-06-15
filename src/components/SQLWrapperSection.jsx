import { Box, Typography, Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const SQLWrapperSection = () => {
  return (
    <Box mt={4}>
      <Typography variant="h6" color='black'>SQL Wrapper</Typography>
      <Box mt={2} p={4} textAlign="center" backgroundColor= 'white' border= '1px solid #ccc'>
        <Button startIcon={<AddCircleOutlineIcon />} variant="text"sx={{ color: 'blue' }} >
          Add SQL Wrapper
        </Button>
      </Box>
    </Box>
  );
};

export default SQLWrapperSection;