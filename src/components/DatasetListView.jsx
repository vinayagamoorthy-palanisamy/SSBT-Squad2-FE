import React, { useState, useRef, useCallback } from 'react';
import {
  Drawer,
  Button,
  List,
  Typography,
  Box,
  Divider,
  Stack,
  Paper,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemType = {
  COLUMN: 'COLUMN',
};

const DraggableListItem = ({
  item,
  index,
  moveMultipleItems,
  handleDelete,
  isSelected,
  selectedIndices,
  handleItemClick,
}) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: ItemType.COLUMN,
    hover(draggedItem) {
      const draggedIndices = draggedItem.selectedIndices;
      if (!draggedIndices.includes(index)) {
        moveMultipleItems(draggedIndices, index);
        draggedItem.selectedIndices = draggedIndices.map((_, i) => index + i);
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType.COLUMN,
    item: { type: ItemType.COLUMN, index, selectedIndices },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <Paper
      ref={ref}
      onClick={(e) => handleItemClick(e, index)}
      variant="outlined"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 1,
        marginBottom: 1,
        cursor: 'pointer',
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: isSelected ? '#e0f3ff' : '#fafafa',
        border: isSelected ? '2px solid #2196f3' : '1px solid #ddd',
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <DragIndicatorIcon fontSize="small" color="action" />
        <Typography>{item}</Typography>
      </Stack>
      <IconButton size="small" onClick={() => handleDelete(index)}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </Paper>
  );
};

const DatasetListView = ({
  handleCloseModal,
  setSubmittedColumns,
  setIsSidebarOpen,
  isSidebarOpen,
  toggleSidebar,
}) => {
  const [columnListItems, setColumnListItems] = useState([
    'Column_4', 'Column_7', 'Column_9', 'Column_10',
    'Column_11', 'Column_15', 'Column_5', 'Column_6',
    'Column_8', 'Column_12', 'Column_13', 'Column_14', 'Column_16',
  ]);

  const [selectedIndices, setSelectedIndices] = useState([]);
  const lastClickedIndex = useRef(null);

  const moveMultipleItems = useCallback((fromIndices, toIndex) => {
    const updatedList = [...columnListItems];
    const itemsToMove = fromIndices.map(i => updatedList[i]);
    const remainingItems = updatedList.filter((_, i) => !fromIndices.includes(i));

    const insertIndex = toIndex > Math.max(...fromIndices)
      ? toIndex - fromIndices.filter(i => i < toIndex).length
      : toIndex;

    remainingItems.splice(insertIndex, 0, ...itemsToMove);
    setColumnListItems(remainingItems);

    const newSelectedIndices = itemsToMove.map((_, i) => insertIndex + i);
    setSelectedIndices(newSelectedIndices);
  }, [columnListItems]);

  const handleDelete = (index) => {
    const updatedList = [...columnListItems];
    updatedList.splice(index, 1);
    setColumnListItems(updatedList);
    setSelectedIndices((prev) => prev.filter((i) => i !== index));
  };

  const handleBulkDelete = () => {
    const updatedList = columnListItems.filter((_, i) => !selectedIndices.includes(i));
    setColumnListItems(updatedList);
    setSelectedIndices([]);
  };

  const handleItemClick = (event, index) => {
    if (event.shiftKey && lastClickedIndex.current !== null) {
      // Shift+Click: add range to selection
      const rangeStart = Math.min(lastClickedIndex.current, index);
      const rangeEnd = Math.max(lastClickedIndex.current, index);
      const range = Array.from({ length: rangeEnd - rangeStart + 1 }, (_, i) => i + rangeStart);
      setSelectedIndices((prev) => Array.from(new Set([...prev, ...range])));
    } else {
      // Normal click: toggle selected state
      setSelectedIndices((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
      lastClickedIndex.current = index;
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Drawer anchor="right" open={isSidebarOpen} onClose={toggleSidebar}>
        <Box sx={{ width: 300, padding: 2 }}>
          <Typography variant="h6" fontWeight={'bold'}>Dataset Columns</Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Drag the columns to place the columns in desired order for extract.
          </Typography>

          <Divider sx={{ my: 2 }} />

          <List disablePadding>
            {columnListItems.map((item, index) => (
              <DraggableListItem
                key={item}
                index={index}
                item={item}
                moveMultipleItems={moveMultipleItems}
                handleDelete={handleDelete}
                isSelected={selectedIndices.includes(index)}
                selectedIndices={selectedIndices}
                handleItemClick={handleItemClick}
              />
            ))}
          </List>

          <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body2">{selectedIndices.length} selected</Typography>
            <Button
              variant="text"
              color="error"
              onClick={handleBulkDelete}
              disabled={selectedIndices.length === 0}
            >
              Delete Selected
            </Button>
          </Box>

          <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
            <Button variant="outlined" onClick={toggleSidebar} sx={{color:'#0014BF', border:'1px solid #0014BF', fontWeight: '600', textTransform: 'none'}}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                if (setSubmittedColumns) {
                  setSubmittedColumns(columnListItems);
                }
                toggleSidebar();
              }}
              sx={{
                backgroundColor: '#0033cc',
                '&:hover': {
                  backgroundColor: '#002bb8',
                },
                 fontWeight: '600', textTransform: 'none'
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Drawer>
    </DndProvider>
  );
};

export default DatasetListView;
