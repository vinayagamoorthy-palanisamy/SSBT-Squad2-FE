import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  TextField,
} from "@mui/material";

// Expanded task options (20 items each)
const taskOptions = {
  Extract: [
    "Extract Task 1","Extract Task 2","Extract Task 3","Extract Task 4","Extract Task 5",
    "Extract Task 6","Extract Task 7","Extract Task 8","Extract Task 9","Extract Task 10",
    "Extract Task 11","Extract Task 12","Extract Task 13","Extract Task 14","Extract Task 15",
    "Extract Task 16","Extract Task 17","Extract Task 18","Extract Task 19","Extract Task 20",
  ],
  DQ: [
    "DQ Task 1","DQ Task 2","DQ Task 3","DQ Task 4","DQ Task 5",
    "DQ Task 6","DQ Task 7","DQ Task 8","DQ Task 9","DQ Task 10",
    "DQ Task 11","DQ Task 12","DQ Task 13","DQ Task 14","DQ Task 15",
    "DQ Task 16","DQ Task 17","DQ Task 18","DQ Task 19","DQ Task 20",
  ],
};

const TaskPopup = ({ open, onClose, onSubmit, type }) => {
  const [taskType, setTaskType] = useState("Extract");
  const [taskName, setTaskName] = useState(taskOptions["Extract"][0]);

  const handleTypeChange = (event) => {
    const selected = event.target.value;
    setTaskType(selected);
    setTaskName(taskOptions[selected][0]);
  };

  const handleSubmit = () => {
    onSubmit(taskType, taskName);
    // reset to defaults
    setTaskType("Extract");
    setTaskName(taskOptions["Extract"][0]);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Add {type === "parallel" ? "Parallel" : "Dependent"} Task
      </DialogTitle>
      <DialogContent>
        <TextField
          select
          label="Task Type"
          value={taskType}
          onChange={handleTypeChange}
          fullWidth
          margin="normal"
        >
          {Object.keys(taskOptions).map((tt) => (
            <MenuItem key={tt} value={tt}>
              {tt}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          fullWidth
          margin="normal"
        >
          {taskOptions[taskType].map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={!taskName}>
          Add Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskPopup;
