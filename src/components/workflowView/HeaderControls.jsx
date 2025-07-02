import {
  Box,
  Button,
  MenuItem,
  Select,
  Typography,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useState } from 'react';

const HeaderControls = ({ timeZones = [], onRun, onUpdateMapping, onVersionHistory }) => {
  const [selectedZone, setSelectedZone] = useState('');

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexWrap="wrap"
      gap={2}
      mb={2}
    >
      {/* Action buttons */}
      <Box display="flex" gap={1} flexWrap="wrap">
        <Button variant="contained" onClick={onRun}>
          Run Workflow
        </Button>
        <Button variant="contained" onClick={onUpdateMapping}>
          Run State Monitor
        </Button>

        {/* Time Zone Select */}
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel id="timezone-label">Time Zone</InputLabel>
          <Select
            labelId="timezone-label"
            value={selectedZone}
            label="Time Zone"
            onChange={(e) => setSelectedZone(e.target.value)}
          >
            {timeZones.map((tz, index) => (
              <MenuItem key={index} value={tz}>
                {tz}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default HeaderControls;
