import React, { useState } from "react";
import {
  Divider,
  Button,
  Drawer,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Typography,
  Grid,
  InputAdornment
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
export default function SearchForm() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    role: "",
    datetime: new Date(),
    client: "",
    workflow_name: "",
    region: "",
    effective_date: new Date(),
    state_monitor_status: "",
    overall_status: "",
    informative_status: "",
    preventive_status: "",
    extract_generative_status: ""
  });

  const toggleDrawer = (state) => () => setOpen(state);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (field) => (newValue) => {
    setFormData((prev) => ({ ...prev, [field]: newValue }));
  };
  const inputSx = {
    width: 321,
    height: 40,
    p: "0px"
  };
  const renderTextField = (label, name) => (
    <Box sx={{ mb: 2 }}>
      <label htmlFor={name}>
        {label.split(" ").map((word, i) => (
          <React.Fragment key={i}>
            {word}&nbsp;
          </React.Fragment>
        ))}
      </label>
     
      <TextField
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        margin="dense"
        sx={inputSx}
        className="form-field"
        InputProps={{ sx: inputSx }}
      />
    </Box>
  );

  const renderSelectField = (label, name) => (
    <Box sx={{ mb: 2,pt: 2 }}>
      <label htmlFor={name}>
        {label.split(" ").map((word, i) => (
          <React.Fragment key={i}>
            {word}&nbsp;
          </React.Fragment>
        ))}
      </label>
  
      <FormControl  margin="dense">
        <InputLabel id={`${name}-label`}>{label}</InputLabel>
        <Select
          labelId={`${name}-label`}
          id={name}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          label={label}
          sx={inputSx}
          className="form-field"
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="editor">Editor</MenuItem>
          <MenuItem value="viewer">Viewer</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );

  const renderDateTimeField = (label, name) => (
    <Box sx={{ mb: 2 }}>
      <label htmlFor={name}>
        {label.split(" ").map((word, i) => (
          <React.Fragment key={i}>
            {word}&nbsp;
          </React.Fragment>
        ))}
      </label>
     
      <DateTimePicker
        value={formData[name]}
        onChange={handleDateChange(name)}
        renderInput={(params) => (
          <TextField
            fullWidth
            id={name}
            margin="dense"
            sx={inputSx}
             className="form-field"
            InputProps={{ ...params.InputProps, sx: inputSx }}
         
          />
        )}
      />
    </Box>
  );

  return (
    <div>
      <Button variant="contained" color="primary" onClick={toggleDrawer(true)}>
        Advanced Filter
      </Button>

      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: { xs: "100%", sm: 726 }, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Advanced Filter
          </Typography>
        
          {/* Search Input */}
          <Box sx={{ mb: 2 }}>
            <label htmlFor="search">Search</label>
            <br />
            <TextField
              id="search"
              sx={{ width: 321, height: 36 }}
              placeholder="Search..."
              variant="outlined"
              margin="dense"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                sx: { height: 36 }
              }}
            />
          </Box>

          <Divider sx={{ my: 2.6 }} />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid container spacing={2}>
              {/* Left Column */}
              <Grid item xs={12} sm={6}>
                {renderSelectField("Client", "client")}
                {renderTextField("Workflow Name", "workflow_name")}
                {renderSelectField("Region", "region")}
                {renderDateTimeField("Effective Date", "effective_date")}
                {renderTextField("State Monitor Status", "state_monitor_status")}
                {renderTextField("Overall Status", "overall_status")}
                {renderTextField("Informative Status", "informative_status")}
                {renderTextField("Preventive Status", "preventive_status")}
                {renderTextField("Extract Generative Status", "extract_generative_status")}
              </Grid>

              {/* Right Column */}
              <Grid item xs={12} sm={6}>
                {renderDateTimeField("Time to SLA", "datetime")}
                {renderDateTimeField("Start Time", "datetime")}
                {renderDateTimeField("Completed Time", "datetime")}
                {renderSelectField("State Monitor", "state_monitor")}
                {renderDateTimeField("Expected Start Time", "datetime")}
                {renderDateTimeField("Estimated Completed Time", "datetime")}
                {renderSelectField("Executed By", "executed_by")}
                {renderDateTimeField("Last Updated Time", "datetime")}
                {renderTextField("State Monitor Id", "state_monitor_id")}
              </Grid>
            </Grid>
          </LocalizationProvider>

          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              console.log("Submitted Data:", formData);
              setOpen(false);
            }}
            fullWidth
            sx={{ mt: 3 }}
          >
            Submit
          </Button>
        </Box>
      </Drawer>
    </div>
  );
}
