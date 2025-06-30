import React, { useState, useRef, useCallback } from 'react';
import {
  Drawer, Button, List, Typography, Box,
  Divider, Stack, Paper, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemType = { COLUMN: 'COLUMN' };

const DraggableListItem = ({
  item, index, moveItem, handleDelete,
  isSelected, handleItemClick
}) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: ItemType.COLUMN,
    hover(dragged) {
      if (dragged.index !== index) {
        moveItem(dragged.index, index);
        dragged.index = index;
      }
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType.COLUMN,
    item: { index },
    collect: (monitor) => ({ isDragging: monitor.isDragging() })
  });

  drag(drop(ref));

  return (
    <Paper
      ref={ref}
      onClick={(e) => handleItemClick(e, index)}
      variant="outlined"
      sx={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        padding: 1, marginBottom: 1,
        cursor: 'pointer',
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: isSelected ? '#e0f3ff' : '#fafafa',
        border: isSelected ? '2px solid #2196f3' : '1px solid #ddd'
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <DragIndicatorIcon fontSize="small" color="action" />
        <Typography>{item}</Typography>
      </Stack>
      <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleDelete(index); }}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </Paper>
  );
};

const DatasetListView = ({
  setSubmittedColumns, isSidebarOpen, toggleSidebar
}) => {
  const [items, setItems] = useState([
    'Column_4', 'Column_7', 'Column_9', 'Column_10',
    'Column_11', 'Column_15', 'Column_5', 'Column_6',
    'Column_8', 'Column_12', 'Column_13', 'Column_14', 'Column_16'
  ]);

  const [selected, setSelected] = useState([]);
  const lastClick = useRef(null);

  const moveItem = useCallback((from, to) => {
    setItems((prev) => {
      const arr = [...prev];
      const [moved] = arr.splice(from, 1);
      arr.splice(to, 0, moved);
      return arr;
    });
    setSelected((prev) => {
      if (!prev.includes(from)) return prev;
      return prev.map((i) => {
        if (i === from) return to;
        if (from < to && i > from && i <= to) return i - 1;
        if (from > to && i < from && i >= to) return i + 1;
        return i;
      }).sort((a, b) => a - b);
    });
  }, []);

  const handleDelete = (idx) => {
    setItems((prev) => prev.filter((_, i) => i !== idx));
    setSelected((prev) => prev.filter((i) => i !== idx));
  };

  const handleBulkDelete = () => {
    setItems((prev) => prev.filter((_, i) => !selected.includes(i)));
    setSelected([]);
  };

  const handleItemClick = (e, idx) => {
    if (e.shiftKey && lastClick.current != null) {
      const start = Math.min(lastClick.current, idx);
      const end = Math.max(lastClick.current, idx);
      setSelected((prev) => [
        ...new Set([...prev, ...Array.from({ length: end - start + 1 }, (_, i) => start + i)])
      ]);
    } else {
      setSelected((prev) =>
        prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
      );
      lastClick.current = idx;
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Drawer anchor="right" open={isSidebarOpen} onClose={toggleSidebar}>
        <Box sx={{ width: 300, p: 2 }}>
          <Typography variant="h6">Dataset Columns</Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Select items then drag one to move it along with its selection style.
          </Typography>
          <Divider sx={{ my: 2 }} />
          <List disablePadding>
            {items.map((it, idx) => (
              <DraggableListItem
                key={it}
                item={it}
                index={idx}
                moveItem={moveItem}
                handleDelete={handleDelete}
                isSelected={selected.includes(idx)}
                handleItemClick={handleItemClick}
              />
            ))}
          </List>
          <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body2">{selected.length} selected</Typography>
            <Button
              color="error"
              variant="text"
              onClick={handleBulkDelete}
              disabled={!selected.length}
            >
              Delete Selected
            </Button>
          </Box>
          <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
            <Button variant="outlined" onClick={toggleSidebar}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setSubmittedColumns(items);
                toggleSidebar();
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
