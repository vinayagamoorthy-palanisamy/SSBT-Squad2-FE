import {
  Box,
  Button,
  MenuItem,
  Select,
  Typography,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useState } from "react";

const HeaderControls = ({
  timeZones = [],
  onRun,
  onUpdateMapping,
  onVersionHistory,
}) => {
  const [selectedZone, setSelectedZone] = useState("");

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
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            Time Zone:
          </Typography>
          <Select
            size="small"
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            sx={{ minWidth: 140 }}
          >
            {timeZones.map((tz, index) => (
              <MenuItem key={index} value={tz}>
                {tz}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
    </Box>
  );
};

export default HeaderControls;
