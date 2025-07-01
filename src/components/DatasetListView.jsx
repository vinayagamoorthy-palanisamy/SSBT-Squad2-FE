import React, { useState, useRef, useCallback, useEffect } from 'react';
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
  item, moveItems, handleDelete,
  isSelected, handleItemClick, selectedItems
}) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: ItemType.COLUMN,
    item: {
      item,
      items: selectedItems.includes(item.name)
        ? selectedItems
        : [item.name]
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const [, drop] = useDrop({
    accept: ItemType.COLUMN,
    hover(dragged) {
      if (dragged.item.name === item.name) return;
      moveItems(dragged.items, item.name);
      dragged.item = item;
    }
  });

  drag(drop(ref));

  return (
    <Paper
      ref={ref}
      onClick={(e) => handleItemClick(e, item.name)}
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
        border: isSelected ? '2px solid #2196f3' : (item.type === 'function' ? '1px solid #0F8048' : '1px solid #ddd'),
        color: item.type === 'function' ? '#0F8048' : 'inherit'
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <DragIndicatorIcon fontSize="small" color="action" />
        <Typography sx={{ fontWeight: isSelected ? 'bold' : 'normal' }}>
          {item.name}
        </Typography>
      </Stack>
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          handleDelete(item.name);
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Paper>
  );
};

const DatasetListView = ({
  setSubmittedColumns,
  isSidebarOpen,
  toggleSidebar,
  columns
}) => {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState([]); // array of item.name
  const lastClick = useRef(null);

  useEffect(() => {
    setItems(columns);
    setSelected([]);
  }, [columns]);

  const moveItems = useCallback((draggedItemNames, targetItemName) => {
    setItems(prev => {
      const moving = prev.filter(i => draggedItemNames.includes(i.name));
      const rest = prev.filter(i => !draggedItemNames.includes(i.name));
      const dropIndex = rest.findIndex(i => i.name === targetItemName);
      rest.splice(dropIndex, 0, ...moving);
      return rest;
    });
    setSelected(draggedItemNames);
  }, []);

  const handleDelete = (itemName) => {
    setItems(prev => prev.filter(i => i.name !== itemName));
    setSelected(prev => prev.filter(n => n !== itemName));
  };

  const handleBulkDelete = () => {
    const toDelete = new Set(selected);
    setItems(prev => prev.filter(i => !toDelete.has(i.name)));
    setSelected([]);
  };

  const handleItemClick = (e, itemName) => {
    const index = items.findIndex(i => i.name === itemName);

    if (e.shiftKey && lastClick.current != null) {
      const lastIndex = items.findIndex(i => i.name === lastClick.current);
      const [start, end] = [lastIndex, index].sort((a, b) => a - b);
      const range = items.slice(start, end + 1).map(i => i.name);
      setSelected(prev => [...new Set([...prev, ...range])]);
    } else if (e.ctrlKey || e.metaKey) {
      setSelected(prev =>
        prev.includes(itemName)
          ? prev.filter(n => n !== itemName)
          : [...prev, itemName]
      );
      lastClick.current = itemName;
    } else {
      setSelected(prev =>
        prev.includes(itemName)
          ? prev.filter(n => n !== itemName)
          : [...prev, itemName]
      );
      lastClick.current = itemName;
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Drawer anchor="right" open={isSidebarOpen} onClose={toggleSidebar}>
        <Box sx={{ width: 300, p: 2 }}>
          <Typography variant="h6">Dataset Columns</Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Click to select/deselect. Shift for range. Cmd/Ctrl for multi-toggle.
          </Typography>
          <Divider sx={{ my: 2 }} />
          <List disablePadding>
            {items.map((item) => (
              <DraggableListItem
                key={item.name + item.type}
                item={item}
                moveItems={moveItems}
                handleDelete={handleDelete}
                isSelected={selected.includes(item.name)}
                handleItemClick={handleItemClick}
                selectedItems={selected}
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
                setSubmittedColumns(items); // this now stores full array of { name, type }
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