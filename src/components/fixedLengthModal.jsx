import React, { useEffect, useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Checkbox, FormControlLabel,
  Box, Typography, IconButton, Collapse, Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function FixedLengthModal({ open, onClose, datasetColumns, onSave }) {
  const [charLimit, setCharLimit] = useState("");
  const [expanded, setExpanded] = useState(true);
  const [limits, setLimits] = useState({});
  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    setLimits(
      Object.fromEntries((datasetColumns || []).map(col => [col.name, col.fixedLengthValue || ""]))
    );
    setSelected([]);
    setSelectAll(false);
  }, [datasetColumns, open]);

  const handleSelectChange = (colName) => {
    setSelected(prev =>
      prev.includes(colName) ? prev.filter(n => n !== colName) : [...prev, colName]
    );
  };

  const handleApplyToAll = () => {
    setLimits(
      Object.fromEntries((datasetColumns || []).map(col => [col.name, charLimit]))
    );
  };

  const handleApplyToSelected = () => {
    setLimits(prev => {
      const updated = { ...prev };
      selected.forEach(colName => {
        updated[colName] = charLimit;
      });
      return updated;
    });
  };

  const handleSelectAll = (checked) => {
    setSelected(checked ? datasetColumns.map(col => col.name) : []);
    setSelectAll(checked);
  };

  const handleLimitChange = (colName, value) => {
    setLimits(prev => ({ ...prev, [colName]: value }));
  };

  const handleSave = () => {
    const updatedColumns = (datasetColumns || []).map(col => ({
      ...col,
      fixedLengthValue: Number(limits[col.name]) || 0
    }));
    if (typeof onSave === "function") {
      onSave(updatedColumns);
    }
    onClose();
  };

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
        <IconButton onClick={onClose}><CloseIcon /></IconButton>
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
              disabled={!charLimit || selected.length === 0}
            >
              Apply To Selected
            </Button>
          </Box>
        </Collapse>

        <Box display="flex" justifyContent="center" alignItems="center" mb={1}>
          <Button
            onClick={() => setExpanded((prev) => !prev)}
            size="small"
            sx={{ color: "#0014BF", textTransform: "none" }}
            endIcon={expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
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
          {(datasetColumns || []).map((col) => {
            const isSel = selected.includes(col.name);
            return (
              <Box
                key={col.name}
                display="flex"
                alignItems="center"
                gap={1}
                mb={1}
                sx={{ cursor: "pointer" }}
                onClick={() => handleSelectChange(col.name)}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    border: isSel ? '1.5px solid #0014BF' : "1px solid #C4C8CC",
                    borderRadius: "16px",
                    paddingY: "4px",
                    paddingX: "8px",
                    bgcolor: isSel ? '#DAECFE' : "#f5f5f5",
                    minHeight: 32,
                    minWidth: 120,
                    color: isSel ? "#0014BF" : "#000",
                    flex: 8,
                  }}
                >
                  <Typography variant="body2" sx={{ px: 1 }}>
                    {limits[col.name] || 0}
                  </Typography>
                  <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                  <Typography variant="body2" sx={{
                    px: 1,
                    fontWeight: "normal",
                    textAlign: "center",
                    flex: 1,
                  }}>
                    {col.name}
                  </Typography>
                </Box>
                <TextField
                  variant="outlined"
                  size="small"
                  label="Character Limit"
                  type="number"
                  value={limits[col.name] || ""}
                  onChange={(e) => {
                    e.stopPropagation(); // prevent click selecting when typing
                    handleLimitChange(col.name, e.target.value);
                  }}
                  sx={{ width: 120 }}
                />
              </Box>
            );
          })}
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
              checked={selected.length === (datasetColumns || []).length && datasetColumns.length > 0}
              onChange={(e) => handleSelectAll(e.target.checked)}
            />
          }
          label="Select all"
        />
        <Box sx={{m: 1}}>
          <Button variant="outlined" sx={{ color:'#0014BF', backgroundColor: '#ffffff', borderColor: '#0014BF'}} onClick={onClose}>Cancel</Button>
          <Button
            variant="contained"
            sx={{ ml: 2 , backgroundColor:'#0014BF', color: '#ffffff'}}
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
