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

const DatasetAddColumns = ({handleCloseModal,setSubmittedColumns}) => {
  const [selectedDataset, setSelectedDataset] = useState('Dataset1');
  const [sqlMode, setSqlMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [columns, setColumns] = useState([
    'Column_4',
    'Column_5',
    'Column_6',
    'Column_7',
    'Column_8',
    'Column_9',
    'Column_10',
    'Column_11',
    'Column_74',
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


  const filteredColumns = columns.filter((column) =>
    column.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddColumns = () => {
const selectedColumnsArray = [...selectedColumns];

setSubmittedColumns(selectedColumnsArray)
 handleCloseModal()
  };
  return (
    <>
    <DndProvider backend={HTML5Backend}>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {/* Dataset Columns Section */}
        <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Add Columns</Typography>
          
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
    <Box display="flex" gap={2}>
        <Button
                    variant="outlined"

                    onClick={handleCloseModal}
                  >
                    Cancel
                  </Button>
                  {/* Add Columns */}
                  <Button
                    variant="outlined"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={handleAddColumns}
                  >
                    Add Columns
                  </Button>
    
               
                </Box>
    </>
  );
};

export default DatasetAddColumns;
