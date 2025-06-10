import React, { useState, useCallback,useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormGroup,
  FormControlLabel,
  TextField,
  Button,
  Grid,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Tooltip,
  Chip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FunctionsIcon from '@mui/icons-material/Functions';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useDrag, useDrop } from 'react-dnd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import useCustomModal from "../store/useCustomModal"
import DatasetAddColumns from './DatasetAddColumns';
const type = 'Chip';

const DraggableChip = ({
  column,
  index,
  moveChip,
  selectedColumns,
  setSelectedColumns,
  activeColumn,
  allColumns, // Renamed from columns
  lastClickedIndex,
  setLastClickedIndex,
}) => {
  const handleClick = (e) => {
    if (e.shiftKey && lastClickedIndex !== null) {
      const start = Math.min(lastClickedIndex, index);
      const end = Math.max(lastClickedIndex, index);
      const newSelection = new Set(selectedColumns); // Use a Set

      let allSelected = true;
      for (let i = start; i <= end; i++) {
        const col = allColumns[i];
        if (!selectedColumns.has(col)) { // Check if the Set contains the column
          allSelected = false;
          break;
        }
      }

      for (let i = start; i <= end; i++) {
        const col = allColumns[i];
        if (allSelected) {
          newSelection.delete(col); // Deselect if all are selected
        } else {
          newSelection.add(col); // Select if not all are selected
        }
      }

      setSelectedColumns(newSelection); // Update with the Set
    } else {
      const newSelection = new Set(selectedColumns);
      if (selectedColumns.has(column)) {
        newSelection.delete(column);
      } else {
        newSelection.add(column);
      }
      setSelectedColumns(newSelection);
    }
    setLastClickedIndex(index);
  };

  const [{ isDragging }, drag] = useDrag({
    type: type,
    item: { id: column, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: type,
    hover: (item) => {
      if (item.index === index) return;
      moveChip(item.index, index);
      item.index = index;
    },
  });

  return (
    <Chip
      ref={(node) => drag(drop(node))}
      label={column}
      onClick={handleClick}
      sx={{
        cursor: 'grab',
        backgroundColor: selectedColumns.has(column) ? '#1976d2' : 'white', // Check if the Set contains the column
        color: selectedColumns.has(column) ? 'white' : 'black', // Check if the Set contains the column
        transition: 'background-color 0.3s',
        '&:hover': {
          backgroundColor: selectedColumns.has(column) ? '#1565c0' : '#f0f0f0', // Check if the Set contains the column
        },
        width: '100%',
        textAlign: 'center',
        padding: '8px',
        opacity: isDragging ? 0.5 : 1,
      }}
    />
  );
};

const DatasetDefinition = () => {
  const [selectedDataset, setSelectedDataset] = useState('Dataset1');
  const [sqlMode, setSqlMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
   const [submittedColumns, setSubmittedColumns] = useState([

  ]);
  const [columns, setColumns] = useState([

  ]);
  const [selectedColumns, setSelectedColumns] = useState(new Set()); // Use a Set
  const [activeColumn, setActiveColumn] = useState(null);
  const [lastClickedIndex, setLastClickedIndex] = useState(null);

  const moveChip = useCallback((dragIndex, hoverIndex) => {
    setColumns((prevChips) => {
      const newChips = [...prevChips];
      const draggedChip = newChips[dragIndex];
      newChips.splice(dragIndex, 1);
      newChips.splice(hoverIndex, 0, draggedChip);
      return newChips;
    });
  }, []);

  const handlePreview = () => {
    alert(`Previewing selected columns: ${Array.from(selectedColumns).join(', ')}`); // Convert Set to Array for display
  };



  const handleAddFunctions = () => {
    alert('Adding functions...');
  };

  const handleListView = () => {
    alert('Switching to list view...');
  };

  const filteredColumns = columns.filter((column) =>
    column?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const { handleOpenModal, handleCloseModal } = useCustomModal(
    (state) => state
  );
  const handleAddColumns = () => {
  //  alert('Adding columns...');
     handleOpenModal({
      isOpen: true,
      showClose: true,
      content: (
        <DatasetAddColumns handleCloseModal={handleCloseModal} setSubmittedColumns={setSubmittedColumns}/>
      ),
      customStyle:{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 700,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
      }
    });
  };
    useEffect(() => {
        setColumns(submittedColumns)
    },[submittedColumns])
  return (
    <>
    <DndProvider backend={HTML5Backend}>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Define Dataset
        </Typography>

        {/* Holdings Section */}
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="holdings-content"
              id="holdings-header"
            >
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">Holdings</Typography>
                <Box display="flex" gap={2}>
                  {/* Preview Button */}
                  <Button variant="contained" color="primary" onClick={handlePreview}>
                    <Tooltip title="Preview">
                      <IconButton size="small">
                        <AddCircleOutlineIcon />
                      </IconButton>
                    </Tooltip>
                    Preview
                  </Button>

                  {/* SQL Mode Switch */}
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={sqlMode}
                          onChange={() => setSqlMode(!sqlMode)}
                          name="sqlMode"
                        />
                      }
                      label="SQL Mode"
                    />
                  </FormGroup>
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              {/* Dataset Selection */}
              <FormControl fullWidth margin="normal">
                <InputLabel id="dataset-label">Select Dataset *</InputLabel>
                <Select
                  labelId="dataset-label"
                  value={selectedDataset}
                  label="Select Dataset *"
                  onChange={(e) => setSelectedDataset(e.target.value)}
                >
                  <MenuItem value="Dataset1">Dataset 1</MenuItem>
                  <MenuItem value="Dataset2">Dataset 2</MenuItem>
                  <MenuItem value="Dataset3">Dataset 3</MenuItem>
                </Select>
              </FormControl>
            </AccordionDetails>
          </Accordion>
        </Paper>

        {/* Dataset Columns Section */}
        <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Dataset Columns</Typography>
            <Box display="flex" gap={2}>
              {/* Add Columns */}
              <Button
                variant="outlined"
                startIcon={<AddCircleOutlineIcon />}
                onClick={handleAddColumns}
              >
                Add Columns
              </Button>

              {/* Add Functions */}
              <Button variant="outlined" startIcon={<FunctionsIcon />} onClick={handleAddFunctions}>
                Add Functions
              </Button>

              {/* List View */}
              <Button variant="outlined" startIcon={<ListAltIcon />} onClick={handleListView}>
                List View
              </Button>
            </Box>
          </Box>

          {/* Search Bar */}
          <TextField
            label="Search column"
            variant="outlined"
            fullWidth
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ mb: 2 }}
          />

          {/* Column Grid */}
          <Grid container spacing={1}>
            {filteredColumns.map((column, index) => (
              <Grid item xs={6} sm={4} md={3} key={column}>
                <DraggableChip
                  column={column}
                  index={index}
                  moveChip={moveChip}
                  selectedColumns={selectedColumns}
                  setSelectedColumns={setSelectedColumns}
                  activeColumn={activeColumn}
                  allColumns={filteredColumns} // Pass filteredColumns
                  lastClickedIndex={lastClickedIndex}
                  setLastClickedIndex={setLastClickedIndex}
                />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </DndProvider>
    </>
  );
};

export default DatasetDefinition;
