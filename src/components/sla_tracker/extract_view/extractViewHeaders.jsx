import {
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Select,
  MenuItem,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import DownloadIcon from '@mui/icons-material/Download';
import { useState } from 'react';
import FilterDrawer from './filter';
import { Search } from '@mui/icons-material';

export default function ExtractViewHeader() {
  const [timezone, setTimezone] = useState('Boston');

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      p={2}
      sx={{ flexWrap: 'wrap' }}
    >
      {/* Label */}
      <Typography variant="body1" fontWeight={500}>
        Extract View
      </Typography>

      {/* Search Field */}
      <TextField
        placeholder="Search the field"
        size="small"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search fontSize="small" />
            </InputAdornment>
          ),
        }}
      />

      {/* Checkbox */}
      <FormControlLabel
        control={<Checkbox size="small" />}
        label="Show Not Started"
      />

      {/* Buttons */}
      <Button variant="contained" sx={{ bgcolor: 'blue' }}>
        Run Extract
      </Button>
      <Button variant="outlined" disabled>
        Rerun
      </Button>
      <Button variant="outlined" disabled>
        Retransmit
      </Button>

      {/* Timezone Select */}
      <Typography>Time Zone:</Typography>
      <Select
        value={timezone}
        onChange={(e) => setTimezone(e.target.value)}
        size="small"
      >
        <MenuItem value="Boston">Boston</MenuItem>
        <MenuItem value="UTC">UTC</MenuItem>
        <MenuItem value="India">India</MenuItem>
      </Select>

      {/* Download and Filter Icons */}
      <IconButton>
        <DownloadIcon />
      </IconButton>
      <FilterDrawer />

    </Box>
  );
}
