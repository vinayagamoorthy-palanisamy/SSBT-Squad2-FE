import React, { useState, useCallback } from 'react';
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
  Checkbox
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FunctionsIcon from '@mui/icons-material/Functions';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useDrag, useDrop } from 'react-dnd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import useCustomModal from "../store/useCustomModal"
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

const DatasetAddColumns = ({ handleCloseModal, setSubmittedColumns }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [columns, setColumns] = useState([
    'Column_4', 'Column_5', 'Column_6', 'Column_7', 'Column_8',
    'Column_9', 'Column_10', 'Column_11', 'Column_74', 'Column_3', 'Column_2', 'Column_1'
  ]);
  const [selectedColumns, setSelectedColumns] = useState(new Set());
  const [lastClickedIndex, setLastClickedIndex] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc'); // asc or desc

  const sortedColumns = [...columns].sort((a, b) =>
    sortOrder === 'asc' ? a.localeCompare(b) : b.localeCompare(a)
  );

  const filteredColumns = sortedColumns.filter((column) =>
    column.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const moveChip = useCallback((dragIndex, hoverIndex) => {
    setColumns((prev) => {
      const updated = [...prev];
      const [dragged] = updated.splice(dragIndex, 1);
      updated.splice(hoverIndex, 0, dragged);
      return updated;
    });
  }, []);

  const handleSelectAllChange = (e) => {
    const checked = e.target.checked;
    const updated = new Set(selectedColumns);
    filteredColumns.forEach(col => {
      checked ? updated.add(col) : updated.delete(col);
    });
    setSelectedColumns(updated);
  };

  const handleAddColumns = () => {
    setSubmittedColumns([...selectedColumns]);
    handleCloseModal();
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Container maxWidth="lg" sx={{ mt: 4, pb: 10 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Add Columns</Typography>
            <FormControl size="small">
              <InputLabel>Sort</InputLabel>
              <Select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                label="Sort"
              >
                <MenuItem value="asc">Sort A → Z</MenuItem>
                <MenuItem value="desc">Sort Z → A</MenuItem>
              </Select>
            </FormControl>
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

        {/* Footer */}
        <Box
          position="fixed"
          bottom={0}
          left={0}
          width="90%"
          bgcolor="white"
          borderTop="1px solid #ddd"
          p={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={
                  filteredColumns.length > 0 &&
                  filteredColumns.every((col) => selectedColumns.has(col))
                }
                indeterminate={
                  selectedColumns.size > 0 &&
                  selectedColumns.size < filteredColumns.length
                }
                onChange={handleSelectAllChange}
              />
            }
            label="Select all"
             sx={{
        color: 'rgba(0, 0, 0, 0.87)', // Change label color
        fontSize: '1rem', // Customize label font size
        '& .MuiFormControlLabel-label': {
          fontWeight: 'bold', // Make the label bold
        },
      }}
          />

          <Typography      sx={{
        color: 'rgba(0, 0, 0, 0.87)', // Change label color
        fontSize: '1rem', // Customize label font size
        '& .MuiFormControlLabel-label': {
          fontWeight: 'bold', // Make the label bold
        },
      }}>{selectedColumns.size} Columns Selected</Typography>

          <Box display="flex" gap={2}>
            <Button variant="outlined" onClick={handleCloseModal}>Cancel</Button>
            <Button
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              onClick={handleAddColumns}
              disabled={selectedColumns.size === 0}
            >
              Add Columns
            </Button>
          </Box>
        </Box>
      </Container>
    </DndProvider>
  );
};


export default DatasetAddColumns;
