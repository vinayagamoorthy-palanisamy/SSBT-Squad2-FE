import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
  Container,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Switch,
  TextField,
  Button,
  Grid
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FunctionsIcon from '@mui/icons-material/Functions';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import useCustomModal from '../store/useCustomModal';
import DatasetAddColumns from '../components/DatasetAddColumns';
import DatasetAddFunctions from '../components/DatasetAddFunctions';
import DatasetListView from '../components/DatasetListView';

const primaryButtonColor = {
  color: '#fff',
  backgroundColor: '#0033cc',
  '&:hover': { backgroundColor: '#002bb8' },
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
  // same multi-select + drag logic you already have
  const isSelected = selectedColumns.has(column);
  const handleClick = (e) => {
    const next = new Set(selectedColumns);
    if (e.shiftKey && lastClickedIndex != null) {
      const [a, b] = [lastClickedIndex, index].sort((x,y)=>x-y);
      for (let i = a; i <= b; i++) next.add(allColumns[i]);
    } else if (e.ctrlKey || e.metaKey) {
      next.has(column) ? next.delete(column) : next.add(column);
    } else {
      next.add(column);
    }
    setLastClickedIndex(index);
    setSelectedColumns(next);
  };

  const [{ isDragging }, drag] = useDrag({
    type: 'COLUMN',
    item: () => {
      const list = selectedColumns.has(column)
        ? Array.from(selectedColumns)
        : [column];
      return { index, list };
    },
    collect: m => ({ isDragging: m.isDragging() }),
  });

  const [, drop] = useDrop({
    accept: 'COLUMN',
    hover: (item) => {
      if (item.index === index) return;
      moveChip(item.index, index, item.list);
      item.index = index;
    },
  });

  return (
    <div ref={node => drag(drop(node))} onClick={handleClick} style={{ opacity: isDragging?0.5:1 }}>
      <Box
        sx={{
          p: 1,
          bgcolor: isSelected ? '#1976d2' : '#fff',
          color: isSelected ? '#fff' : '#000',
          borderRadius: 2,
          textAlign: 'center',
          cursor: 'grab',
          '&:hover': { bgcolor: isSelected ? '#1565c0' : '#f0f0f0' }
        }}
      >
        {column}
      </Box>
    </div>
  );
};

export default function DatasetDefinition() {
  const { handleOpenModal, handleCloseModal } = useCustomModal(s => s);
  const [submittedColumns, setSubmittedColumns] = useState([]);
  const [submittedFunctions, setSubmittedFunctions] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState(new Set());
  const [lastClickedIndex, setLastClickedIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sqlMode, setSqlMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState('Dataset1');

  // Whenever user picks columns in the modal, recalc our grid
  useEffect(() => {
    setColumns(submittedColumns);
    // reset selection if you like:
    setSelectedColumns(new Set());
  }, [submittedColumns]);

  const filteredColumns = useMemo(
    () =>
      columns.filter(col =>
        col.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [columns, searchQuery]
  );

  // reorder logic
  const moveChip = useCallback((from, to, dragged) => {
    setColumns(prev => {
      const arr = [...prev];
      const moving = dragged.length ? dragged : [arr[from]];
      const rest = arr.filter(c => !moving.includes(c));
      rest.splice(to, 0, ...moving);
      return rest;
    });
  }, []);

  // --- Add Columns modal trigger (unchanged) ---
  const handleAddColumns = () => {
    handleOpenModal({
      isOpen: true,
      showClose: true,
      content: (
        <DatasetAddColumns
          onClose={handleCloseModal}
          onApply={cols => {
            setSubmittedColumns(cols);
            handleCloseModal();
          }}
        />
      ),
      customStyle: {
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 920,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4
      }
    });
  };

  // --- Add Functions modal trigger ---
  // Simple stub to group all into text; replace with your real type logic
  const columnsByType = {
    text:    submittedColumns,
    number:  [],
    date:    [],
    boolean: []
  };

  const handleAddFunctions = () => {
    handleOpenModal({
      isOpen: true,
      showClose: true,
      content: (
        <DatasetAddFunctions
          onClose={handleCloseModal}
          columnsByType={columnsByType}
          onApply={funcs => {
            setSubmittedFunctions(funcs);
            handleCloseModal();
          }}
        />
      ),
      customStyle: {
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 920,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4
      }
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Define Dataset
        </Typography>

        <Paper sx={{ mb: 3, p: 3 }} elevation={3}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box flexGrow={1}>
                <Typography variant="h6">Holdings</Typography>
              </Box>
              <Box display="flex" gap={2}>
                <Button
                  variant="contained"
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={() => alert('Preview: '+[...selectedColumns].join())}
                >
                  Preview
                </Button>
                <FormGroup>
                  <FormControlLabel
                    control={<Switch checked={sqlMode} onChange={() => setSqlMode(m => !m)} />}
                    label="SQL Mode"
                  />
                </FormGroup>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl fullWidth>
                <InputLabel>Select Dataset *</InputLabel>
                <Select
                  value={selectedDataset}
                  label="Select Dataset *"
                  onChange={e => setSelectedDataset(e.target.value)}
                >
                  <MenuItem value="Dataset1">Dataset 1</MenuItem>
                  <MenuItem value="Dataset2">Dataset 2</MenuItem>
                </Select>
              </FormControl>
            </AccordionDetails>
          </Accordion>
        </Paper>

        <Paper sx={{ p: 3 }} elevation={3}>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="h6">Dataset Columns</Typography>
            <Box display="flex" gap={2}>
              <Button
                variant="contained"
                startIcon={<AddCircleOutlineIcon />}
                onClick={handleAddColumns}
                sx={primaryButtonColor}
              >
                Add Columns
              </Button>
              <Button
                variant="contained"
                startIcon={<FunctionsIcon />}
                onClick={handleAddFunctions}
                sx={primaryButtonColor}
              >
                Add Functions
              </Button>
              <Button
                variant="contained"
                startIcon={<ListAltIcon />}
                onClick={() => setIsSidebarOpen(b => !b)}
                sx={primaryButtonColor}
              >
                List View
              </Button>
            </Box>
          </Box>

          <TextField
            fullWidth
            size="small"
            placeholder="Search column"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Grid container spacing={1}>
            {filteredColumns.map((col, i) => (
              <Grid item xs={6} sm={4} md={3} key={col}>
                <DraggableChip
                  column={col}
                  index={i}
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

          {/* Optional: show the list‐view sidebar */}
          <DatasetListView
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={() => setIsSidebarOpen(o => !o)}
          />
        </Paper>
      </Container>
    </DndProvider>
  );
}
