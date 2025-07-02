import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Box,
  Typography,
  IconButton,
  Collapse,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";


export default function CharacterLimitModal({ open, onClose, datasetColumns }) {
  const [charLimit, setCharLimit] = useState("");
  const [expanded, setExpanded] = useState(true);
  const [limits, setLimits] = useState({});
  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [columns, setColumns] = useState(datasetColumns)
  console.log('datasetColumns', datasetColumns)

  useEffect(()=>{
    setColumns(datasetColumns)
  },[])

  const handleLimitChange = (col, value) => {
    setLimits((prev) => ({ ...prev, [col]: value }));
  };

//   const handleSelectChange = (col, value) => {
//     setSelected((prev) => ({ ...prev, [col]: value }));
//   };
 const handleSelectChange = (col) => {
    setSelected((prev) => ([ ...prev, col ]));
  };

  const handleApplyToAll = () => {
    const newLimits = {};
    columns.forEach((col) => {
      newLimits[col] = charLimit;
    });
    setLimits(newLimits);
  };

  const handleApplyToSelected = () => {
    const newLimits = { ...limits };
    Object.entries(selected).forEach(([col, isChecked]) => {
      if (isChecked) newLimits[col] = charLimit;
    });
    setLimits(newLimits);
  };

  const handleSelectAll = (checked) => {
    const newSelected = {};
    columns.forEach((col) => {
      newSelected[col] = checked;
    });
    setSelected(newSelected);
    setSelectAll(checked);
  };
 console.log('selected', selected)
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: 'bold',
          fontSize: 16
        }}
      >
        Assign Column Character Limits
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Collapse in={expanded}>
          <Box display="flex" gap={2} alignItems="center" mb={2}>
            <TextField
              label="Character Limit"
              type="number"
              size="small"
              value={charLimit}
              onChange={(e) => setCharLimit(e.target.value)}
            />
            <Button
              variant="contained"
              sx={{
                bgcolor: "#0014BF",
                color: "#FFFFFF",
                fontSize: 14,
                width: 150,
                fontWeight: 500,
                textTransform: "none",
              }}
              onClick={handleApplyToAll}
              disabled={!charLimit}
            >
              Apply To All
            </Button>
            <Button
              variant="outlined"
              sx={{
                border: "1px solid #0014BF",
                color: "#0014BF",
                fontSize: 14,
                width: 170,
                fontWeight: 500,
                textTransform: "none",
              }}
              onClick={handleApplyToSelected}
              disabled={!charLimit}
            >
              Apply To Selected
            </Button>
          </Box>
        </Collapse>

        <Box display="flex" justifyContent="center" alignItems="center" mb={1}>
          {/* <Typography variant="subtitle2">Columns</Typography> */}
          <Button
            onClick={() => setExpanded((prev) => !prev)}
            size="small"
            sx={{ color: "#0014BF", textTransform: "none" }}
            endIcon={
              expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
            }
          >
            {expanded ? "Hide" : "Show"}
          </Button>
        </Box>

        <Box
       
          sx={{
            maxHeight: 300,
            overflowY: "auto",
            border: "1px solid #ccc",
            borderRadius: 1,
            p: 1,
          }}
        >
          {columns?.map((col) => (
            <Box
              key={col}
              display="flex"
              justifyContent={"space-between"}
              alignItems="center"
              gap={1}
              mb={1}
               onClick={() => handleSelectChange(col,limits[col] )}
            >
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  border: selected ? '1px solid #0014BF' : "1px solid #C4C8CC",
                  borderRadius: "16px",
                  paddingY: "4px",
                  paddingX: "8px",
                  bgcolor: selected ? '#DAECFE' : "#f5f5f5",
                  height: 24,
                  flex: 8,
                }}
              >
                <Typography variant="body2" sx={{ px: 1 }}>
                  {limits[col] || 0}
                </Typography>
                <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                <Typography variant="body2" sx={{ px: 1, fontWeight: "normal" }}>
                  {col?.name}
                </Typography>
              </Box>
              <TextField
                variant="outlined"
                size="small"
                label="Character Limit"
                type="number"
                value={limits[col] || ""}
                onChange={(e) => handleLimitChange(col, e.target.value)}
                sx={{ width: 120 }}
              />
            </Box>
          ))}
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          ml: 3,
          mr: 2
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={selectAll}
              onChange={(e) => handleSelectAll(e.target.checked)}
            />
          }
          label="Select all"
          
        />
        <Box>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ml:2}}
            onClick={() => console.log("Saving limits:", limits)}
          >
            Save
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
