import React, { useState, useCallback, useMemo } from 'react';
import {
  Container, Typography, Paper, FormControl, InputLabel, Select, MenuItem,
  TextField, Button, Grid, Box, Chip, Checkbox, FormControlLabel
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PropTypes from 'prop-types';

const type = 'Chip';

const DraggableChip = ({
  column, index, moveChip, selectedColumns, setSelectedColumns,
  allColumns, lastClickedIndex, setLastClickedIndex,
}) => {
  const handleClick = (e) => {
    const newSelection = new Set(selectedColumns);
    if (e.shiftKey && lastClickedIndex !== null) {
      const start = Math.min(lastClickedIndex, index);
      const end = Math.max(lastClickedIndex, index);
      let allSelected = true;
      for (let i = start; i <= end; i++) {
        if (!selectedColumns.has(allColumns[i])) {
          allSelected = false;
          break;
        }
      }
      for (let i = start; i <= end; i++) {
        allSelected ? newSelection.delete(allColumns[i]) : newSelection.add(allColumns[i]);
      }
    } else {
      selectedColumns.has(column) ? newSelection.delete(column) : newSelection.add(column);
    }
    setSelectedColumns(newSelection);
    setLastClickedIndex(index);
  };

  const [{ isDragging }, drag] = useDrag({
    type,
    item: { id: column, index },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  const [, drop] = useDrop({
    accept: type,
    hover: (item) => {
      if (item.index !== index) {
        moveChip(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <Chip
      ref={(node) => drag(drop(node))}
      label={column}
      onClick={handleClick}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick(e)}
      sx={{
        cursor: 'grab',
        backgroundColor: selectedColumns.has(column) ? '#1976d2' : 'white',
        color: selectedColumns.has(column) ? 'white' : 'black',
        transition: 'background-color 0.3s',
        '&:hover': {
          backgroundColor: selectedColumns.has(column) ? '#1565c0' : '#f0f0f0',
        },
        width: '100%',
        textAlign: 'center',
        padding: '8px',
        opacity: isDragging ? 0.5 : 1,
      }}
    />
  );
};


export const DatasetAddColumns = ({ onClose, onApply }) => {

  const [searchQuery, setSearchQuery] = useState('');
  const [columns, setColumns] = useState([
    'Column_4', 'Column_5', 'Column_6', 'Column_7', 'Column_8',
    'Column_9', 'Column_10', 'Column_11', 'Column_74', 'Column_3', 'Column_2', 'Column_1'
  ]);
  const [selectedColumns, setSelectedColumns] = useState(new Set());
  const [lastClickedIndex, setLastClickedIndex] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const sortedColumns = useMemo(() => [...columns].sort((a, b) =>
    sortOrder === 'asc' ? a.localeCompare(b) : b.localeCompare(a)
  ), [columns, sortOrder]);

  const filteredColumns = useMemo(() => sortedColumns.filter((column) =>
    column.toLowerCase().includes(searchQuery.toLowerCase())
  ), [sortedColumns, searchQuery]);

  const moveChip = useCallback((dragIndex, hoverIndex) => {
    setColumns((prev) => {
      const updated = [...prev];
      const [dragged] = updated.splice(dragIndex, 1);
      updated.splice(hoverIndex, 0, dragged);
      return updated;
    });
  }, []);

  const handleSelectAllChange = (e) => {
    const updated = new Set(selectedColumns);
    filteredColumns.forEach(col => e.target.checked ? updated.add(col) : updated.delete(col));
    setSelectedColumns(updated);
  };

  const handleAddColumns = () => {
    onApply([...selectedColumns]);
    onClose();

  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Container maxWidth="lg" sx={{ mt: 4, pb: 10 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Add Columns</Typography>
            <FormControl size="small">
              <InputLabel>Sort</InputLabel>
              <Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} label="Sort">
                <MenuItem value="asc">Sort A - Z</MenuItem>
                <MenuItem value="desc">Sort Z - A</MenuItem>
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
                checked={filteredColumns.length > 0 && filteredColumns.every((col) => selectedColumns.has(col))}
                indeterminate={selectedColumns.size > 0 && selectedColumns.size < filteredColumns.length}
                onChange={handleSelectAllChange}
              />
            }
            label="Select all"
            sx={{
              color: 'rgba(0, 0, 0, 0.87)',
              fontSize: '1rem',
              '& .MuiFormControlLabel-label': { fontWeight: 'bold' },
            }}
          />
          <Typography sx={{ fontWeight: 'bold' }}>{selectedColumns.size} Columns Selected</Typography>
          <Box display="flex" gap={2}>
            <Button variant="outlined" onClick={onClose}>Cancel</Button>
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


DatasetAddColumns.propTypes = {
  onClose: PropTypes.func.isRequired,
  onApply: PropTypes.func.isRequired,
};


export default DatasetAddColumns;
