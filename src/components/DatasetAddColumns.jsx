import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
  Box, TextField, Typography, Grid, Chip, Checkbox, Button,
  FormControl, InputLabel, Select, MenuItem, FormControlLabel
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
        if (!selectedColumns.has(allColumns[i].name)) {
          allSelected = false;
          break;
        }
      }
      for (let i = start; i <= end; i++) {
        const colName = allColumns[i].name;
        allSelected ? newSelection.delete(colName) : newSelection.add(colName);
      }
    } else {
      selectedColumns.has(column.name)
        ? newSelection.delete(column.name)
        : newSelection.add(column.name);
    }
    setSelectedColumns(newSelection);
    setLastClickedIndex(index);
  };

  const [{ isDragging }, drag] = useDrag({
    type,
    item: { id: column.name, index },
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
      label={column.name}
      onClick={handleClick}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick(e)}
      sx={{
        cursor: 'grab',
        border: '1px solid',
        borderColor: selectedColumns.has(column.name) ? '#0014BF' : 'rgba(0, 0, 0, 0.23)',
        backgroundColor: selectedColumns.has(column.name) ? 'rgba(25,118,210,0.1)' : '#fff',
        color: selectedColumns.has(column.name) ? '#0014BF' : '#000',
        width: 250,
        textAlign: 'center',
        px: 2,
        mb: 1,
        opacity: isDragging ? 0.5 : 1,
      }}
    />
  );
};

export const DatasetAddColumns = ({ onClose, onApply, datasetColumns }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [columns, setColumns] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState(new Set());
  const [lastClickedIndex, setLastClickedIndex] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    setColumns(datasetColumns);
  }, [datasetColumns]);

  const sortedColumns = useMemo(() =>
    [...columns].sort((a, b) =>
      sortOrder === 'asc'
        ? a?.name?.localeCompare(b?.name)
        : b?.name?.localeCompare(a?.name)
    ), [columns, sortOrder]);

  const filteredColumns = useMemo(() => sortedColumns.filter((column) =>
    column?.name?.toLowerCase().includes(searchQuery.toLowerCase())
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
    filteredColumns.forEach(col =>
      e.target.checked ? updated.add(col.name) : updated.delete(col.name)
    );
    setSelectedColumns(updated);
  };

  const handleAddColumns = () => {
    // Only return column objects that are selected
    onApply(columns.filter(col => selectedColumns.has(col.name)));
    onClose();
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Box sx={{ backgroundColor: '#F0F2F5' }}>
        <Box display="flex" gap={2} mb={2} sx={{ paddingLeft: 3, paddingRight: 3, paddingTop: 2, paddingBottom: 0 }}>
          <TextField
            label="Search column"
            variant="outlined"
            fullWidth
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Box display="flex" flexDirection="column" alignItems="flex-end">
            <FormControl size="small" sx={{ width: 120 }}>
              <InputLabel>Sort</InputLabel>
              <Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} label="Sort">
                <MenuItem value="asc">Sort A - Z</MenuItem>
                <MenuItem value="desc">Sort Z - A</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Typography sx={{ paddingLeft: 3 }}>
          Click to select column. Hold shift key to select a range of columns.
        </Typography>

        <Box sx={{ backgroundColor: '#ffffff', p: 3 }}>
          <Box display="flex" gap={2} minHeight={300} maxHeight={300} sx={{ overflowY: 'scroll' }}>
            <Box flex={1}>
              <Grid container spacing={1}>
                {filteredColumns.map((column, index) => (
                  <Grid item xs={6} key={column.name}>
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
            </Box>
          </Box>
          <Box
            width="100%"
            bgcolor="white"
            borderTop="1px solid #ddd"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            pt={1}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={filteredColumns.length > 0 && filteredColumns.every((col) => selectedColumns.has(col.name))}
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
              <Button
                variant="outlined"
                onClick={onClose}
                sx={{
                  backgroundColor: '#ffffff',
                  color: '#0014BF',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  border: '1px solid #0014BF'
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleAddColumns}
                disabled={selectedColumns.size === 0}
                sx={{
                  backgroundColor: '#0014BF',
                  textTransform: 'none',
                  color: '#ffffff',
                  fontWeight: 'bold'
                }}
              >
                Add Columns
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </DndProvider>
  );
};

DatasetAddColumns.propTypes = {
  onClose: PropTypes.func.isRequired,
  onApply: PropTypes.func.isRequired,
};

export default DatasetAddColumns;
