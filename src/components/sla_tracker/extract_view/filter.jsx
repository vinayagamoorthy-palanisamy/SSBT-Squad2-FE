import React, { useState } from 'react';
import {
  Drawer,
  IconButton,
  TextField,
  Typography,
  Box,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Divider,
  Switch,
  InputAdornment,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { CalendarMonth, CalendarMonthOutlined, Search } from '@mui/icons-material';
import MultiDatePicker from "react-multi-date-picker"
import './index.css'
const CustomInput = ({ openCalendar, value }) => {
  return (
    <TextField
      value={value}
      onClick={openCalendar}
      fullWidth
      sx={{width:'100%'}}
      variant="outlined"
      size='small'
      placeholder='MM/DD/YYYY - MM/DD/YYYY'
      InputProps={{
        readOnly: true,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={openCalendar}>
              <CalendarMonth />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
export default function FilterDrawer() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [filterValues, setFilterValues] = useState({
    extractName: '',
    generationStatus: '',
    deliveryStatus: '',
    client: '',
    region: '',
    effectiveDateStart: null,
    effectiveDateEnd: null,
  });

  // Format selected dates like: MM/DD/YYYY - MM/DD/YYYY
  const formattedValue =
    value.length === 2
      ? `${value[0].format("MM/DD/YYYY")} - ${value[1].format("MM/DD/YYYY")}`
      : "";
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <IconButton onClick={() => setOpen(true)}>
        <FilterListIcon />
      </IconButton>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 350, p: 3, pb: 0 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, alignItems:'center' }}>
            <Typography variant="h6">Advanced Filter</Typography>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box>
            {/* <Typography variant='subtitle2'>Search the field</Typography> */}
            <TextField
              fullWidth
              size="small"
              sx={{ mb: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search fontSize="small" />
                  </InputAdornment>
                ),
              }}
              variant='outlined'
              placeholder='Search the field'
            />
          </Box>


          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0, justifyContent: 'flex-end' }}>
            <Switch />
            <Typography variant="body2" mr={1}>Show Filter Tags</Typography>
          </Box>
          <Box>
            <Typography variant='subtitle2'>Extract Name</Typography>
            <TextField
              fullWidth
              size="small"
              value={filterValues.extractName}
              onChange={(e) => setFilterValues({ ...filterValues, extractName: e.target.value })}
              sx={{ mb: 2 }}
            />
          </Box>
          {/* Date Range Pickers */}
          <Box mb={2} sx={{width:'100%'}}>
            <Typography variant='subtitle2'>Effective Date</Typography>
            <MultiDatePicker
              multiple
              style={{ width: '100%', padding: '8.5px 14px', height: 34.5 }}
              dateSeparator=' - '
              format="MM/DD/YYYY"

              render={<CustomInput value={formattedValue} />}
              value={value}
              onChange={(dates) => {
                console.log(dates, 'eeee')
                if (dates.length <= 2) setValue(dates);
                else setValue([])
              }}
            />
          </Box>
          {/* <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <DatePicker
              label="Start Date"
              value={filterValues.effectiveDateStart}
              onChange={(newValue) =>
                setFilterValues({ ...filterValues, effectiveDateStart: newValue })
              }
              renderInput={(params) => <TextField {...params} size="small" fullWidth />}
            />
            <DatePicker
              size='small'
              label="End Date"
              value={filterValues.effectiveDateEnd}
              onChange={(newValue) =>
                setFilterValues({ ...filterValues, effectiveDateEnd: newValue })
              }
              renderInput={(params) => <TextField {...params} size="small" fullWidth />}
            />
          </Box> */}

          {/* Dropdowns */}
          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <Typography variant='subtitle2'>Generation Status</Typography>
            <Select
              size='small'
              value={filterValues.generationStatus}
              onChange={(e) =>
                setFilterValues({ ...filterValues, generationStatus: e.target.value })
              }
            // label="Generation Status"
            >
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Failed">Failed</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <Typography variant='subtitle2'>Delivery Status</Typography>
            <Select
              size='small'
              value={filterValues.deliveryStatus}
              onChange={(e) =>
                setFilterValues({ ...filterValues, deliveryStatus: e.target.value })
              }
            // label="Delivery Status"
            >
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Retry">Retry</MenuItem>
              <MenuItem value="Failed">Failed</MenuItem>
              <MenuItem value="Not Start">Not Start</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <Typography variant='subtitle2'>Client</Typography>
            <Select
              size='small'
              value={filterValues.client}
              onChange={(e) =>
                setFilterValues({ ...filterValues, client: e.target.value })
              }
            // label="Client"
            >
              <MenuItem value="NACC2">NACC2</MenuItem>
              <MenuItem value="HSBC Holdings PLC">HSBC Holdings PLC</MenuItem>
            </Select>
          </FormControl>
          <Box>
            <Typography variant='subtitle2'>Region</Typography>
            <TextField
              // label="Region"
              fullWidth
              size="small"
              value={filterValues.region}
              onChange={(e) => setFilterValues({ ...filterValues, region: e.target.value })}
              sx={{ mb: 2 }}
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Action buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button variant="outlined" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                console.log(filterValues);
                setOpen(false);
              }}
            >
              Apply
            </Button>
          </Box>
        </Box>
      </Drawer>
    </LocalizationProvider>
  );
}
