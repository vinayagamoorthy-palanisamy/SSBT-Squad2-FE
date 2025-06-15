import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  Box,
  Button
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
 
const HoldingsCard = () => {
  return (
    <Accordion elevation={1}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
          <Typography variant="subtitle1">Holdings</Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <IconButton size="small">
              <MoreVertIcon fontSize="small" color="primary" />
            </IconButton>
            <Button
              variant="outlined"
              size="small"
              startIcon={<VisibilityOutlinedIcon />}
              sx={{ textTransform: 'none', color: 'blue', borderColor: 'blue' }}
            >
              Preview
            </Button>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {/* You can add holding details here */}
      </AccordionDetails>
    </Accordion>
  );
};
 
export default HoldingsCard;