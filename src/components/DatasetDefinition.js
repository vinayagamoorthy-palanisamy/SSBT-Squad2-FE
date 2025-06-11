import React, { useState, useCallback, useEffect } from 'react';
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
  Chip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FunctionsIcon from '@mui/icons-material/Functions';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import useCustomModal from '../store/useCustomModal';
import DatasetAddColumns from './DatasetAddColumns';
import DatasetListView from './DatasetListView';

const type = 'Chip';

const primaryButtonColor = {
  color: '#fff',
  backgroundColor: '#0033cc',
  '&:hover': {
    backgroundColor: '#002bb8',
  },
};

const DraggableChip = ({
  column,
  index,
  moveChip,
  selectedColumns,
  setSelectedColumns,
  allColumns,
  lastClickedIndex,
  setLastClickedIndex,
}) => {
  const isSelected = selectedColumns.has(column);

 const handleClick = (e) => {
  const newSelection = new Set(selectedColumns);

  if (e.shiftKey && lastClickedIndex !== null) {
    const start = Math.min(lastClickedIndex, index);
    const end = Math.max(lastClickedIndex, index);

    for (let i = start; i <= end; i++) {
      newSelection.add(allColumns[i]);
    }
  } else if (e.metaKey || e.ctrlKey) {
    if (newSelection.has(column)) {
      newSelection.delete(column); // Only Ctrl+Click allows unselect
    } else {
      newSelection.add(column); // Add to selection
    }
  } else {
    // Normal click always adds (does not remove)
    newSelection.add(column);
  }

  setSelectedColumns(newSelection);
  setLastClickedIndex(index);
};

  const [{ isDragging }, drag] = useDrag({
    type,
    item: () => {
      const selectedList = selectedColumns.has(column)
        ? Array.from(selectedColumns)
        : [column];
      return { index, selectedList };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: type,
    hover: (item) => {
      if (item.index === index) return;
      moveChip(item.index, index, item.selectedList);
      item.index = index;
    },
  });

  return (
    <div ref={(node) => drag(drop(node))} onClick={handleClick}>
      <Chip
        label={column}
        sx={{
          cursor: 'grab',
          backgroundColor: isSelected ? '#1976d2' : 'white',
          color: isSelected ? 'white' : 'black',
          '&:hover': {
            backgroundColor: isSelected ? '#1565c0' : '#f0f0f0',
          },
          width: '100%',
          textAlign: 'center',
          padding: '8px',
          opacity: isDragging ? 0.5 : 1,
          userSelect: 'none',
        }}
      />
    </div>
  );
};

const DatasetDefinition = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState('Dataset1');
  const [sqlMode, setSqlMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [submittedColumns, setSubmittedColumns] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState(new Set());
  const [lastClickedIndex, setLastClickedIndex] = useState(null);

  const moveChip = useCallback((dragIndex, hoverIndex, draggedItems = []) => {
    setColumns((prevChips) => {
      const chips = [...prevChips];
      const dragging = draggedItems.length ? draggedItems : [chips[dragIndex]];
      const remaining = chips.filter((chip) => !dragging.includes(chip));
      remaining.splice(hoverIndex, 0, ...dragging);
      return remaining;
    });
  }, []);

  const handlePreview = () => {
    alert(`Previewing selected columns: ${Array.from(selectedColumns).join(', ')}`);
  };

  const handleAddFunctions = () => {
    alert('Adding functions...');
  };

  const { handleOpenModal, handleCloseModal } = useCustomModal((state) => state);

  const handleAddColumns = () => {
    handleOpenModal({
      isOpen: true,
      showClose: true,
      content: (
        <DatasetAddColumns
          handleCloseModal={handleCloseModal}
          setSubmittedColumns={setSubmittedColumns}
        />
      ),
      customStyle: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 920,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      },
    });
  };

  useEffect(() => {
    setColumns(submittedColumns);
  }, [submittedColumns]);

  const filteredColumns = columns.filter((column) =>
    column?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ color: 'black' }}>
          Define Dataset
        </Typography>

        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box display="flex" justifyContent="space-between" width="100%">
                <Typography variant="h6">Holdings</Typography>
                <Box display="flex" gap={2}>
                  <Button
                    sx={primaryButtonColor}
                    variant="outlined"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={handlePreview}
                  >
                    Preview
                  </Button>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={sqlMode}
                          onChange={() => setSqlMode(!sqlMode)}
                        />
                      }
                      label="SQL Mode"
                    />
                  </FormGroup>
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
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

        <Paper elevation={3} sx={{ p: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Dataset Columns</Typography>
            <Box display="flex" gap={2}>
              <Button
                sx={primaryButtonColor}
                variant="outlined"
                startIcon={<AddCircleOutlineIcon />}
                onClick={handleAddColumns}
              >
                Add Columns
              </Button>
              <Button
                sx={primaryButtonColor}
                variant="outlined"
                startIcon={<FunctionsIcon />}
                onClick={handleAddFunctions}
              >
                Add Functions
              </Button>
              <Button
                sx={primaryButtonColor}
                variant="outlined"
                startIcon={<ListAltIcon />}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                List View
              </Button>
              <DatasetListView
                setIsSidebarOpen={setIsSidebarOpen}
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
              />
            </Box>
          </Box>

          <TextField
            label="Search column"
            variant="outlined"
            fullWidth
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Grid container spacing={1}>
            {filteredColumns.map((column, index) => (
              <Grid item xs={6} sm={4} md={3} key={column}>
                <DraggableChip
                  column={column}
                  index={index}
                  moveChip={moveChip}
                  selectedColumns={selectedColumns}
                  setSelectedColumns={setSelectedColumns}
                  allColumns={filteredColumns}
                  lastClickedIndex={lastClickedIndex}
                  setLastClickedIndex={setLastClickedIndex}
                />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </DndProvider>
  );
};

export default DatasetDefinition;
