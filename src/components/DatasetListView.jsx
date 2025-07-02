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

const getKey = (item) =>
  item.type === 'function' ? item.expression : item.name;

const DraggableListItem = ({
  item, moveItems, handleDelete,
  isSelected, handleItemClick, selectedItems, isFixedLength
}) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: ItemType.COLUMN,
    item: {
      item,
      items: isSelected
        ? selectedItems
        : [getKey(item)]
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const [, drop] = useDrop({
    accept: ItemType.COLUMN,
    hover(dragged) {
      if (getKey(dragged.item) === getKey(item)) return;
      moveItems(dragged.items, getKey(item));
      dragged.item = item;
    }
  });

  drag(drop(ref));

  return (
    <Paper
      ref={ref}
      onClick={(e) => handleItemClick(e, getKey(item))}
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
        {isFixedLength && item?.type === 'column' && 
          <>
          <Typography variant="body2" sx={{ px: 1 }}>
            {item?.fixedLengthValue || 0}
          </Typography>
          <Divider orientation="vertical" flexItem sx={{ mx: 1, bgcolor: isSelected ? '#ffffff' : '#C4C8CC' }} /> </>}
        
        <Typography sx={{ fontWeight: isSelected ? 'bold' : 'normal' }}>
          {item.type === 'function' ? item.expression : item.name}
        </Typography>
        
      </Stack>
      <Box sx={{display: 'flex', alignItems :'center'}}>
      <DragIndicatorIcon fontSize="small" color="action" />
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          handleDelete(getKey(item));
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
      </Box>
    </Paper>
  );
};

const DatasetListView = ({
  setItems,
  isSidebarOpen,
  toggleSidebar,
  items,
  isFixedLength
}) => {
  const [localItems, setLocalItems] = useState([]);
  const [selected, setSelected] = useState([]); // array of key (expression or name)
  const lastClick = useRef(null);

  useEffect(() => {
    setLocalItems(items);
    setSelected([]);
  }, [items]);

  const moveItems = useCallback((draggedKeys, targetKey) => {
    setLocalItems(prev => {
      const moving = prev.filter(i => draggedKeys.includes(getKey(i)));
      const rest = prev.filter(i => !draggedKeys.includes(getKey(i)));
      const dropIndex = rest.findIndex(i => getKey(i) === targetKey);
      rest.splice(dropIndex, 0, ...moving);
      return rest;
    });
    setSelected(draggedKeys);
  }, []);

  const handleDelete = (itemKey) => {
    setLocalItems(prev => prev.filter(i => getKey(i) !== itemKey));
    setSelected(prev => prev.filter(n => n !== itemKey));
  };

  const handleBulkDelete = () => {
    const toDelete = new Set(selected);
    setLocalItems(prev => prev.filter(i => !toDelete.has(getKey(i))));
    setSelected([]);
  };

  const handleItemClick = (e, itemKey) => {
    const index = localItems.findIndex(i => getKey(i) === itemKey);

    if (e.shiftKey && lastClick.current != null) {
      const lastIndex = localItems.findIndex(i => getKey(i) === lastClick.current);
      const [start, end] = [lastIndex, index].sort((a, b) => a - b);
      const range = localItems.slice(start, end + 1).map(getKey);
      setSelected(prev => [...new Set([...prev, ...range])]);
    } else if (e.ctrlKey || e.metaKey) {
      setSelected(prev =>
        prev.includes(itemKey)
          ? prev.filter(n => n !== itemKey)
          : [...prev, itemKey]
      );
      lastClick.current = itemKey;
    } else {
      setSelected(prev =>
        prev.includes(itemKey)
          ? prev.filter(n => n !== itemKey)
          : [...prev, itemKey]
      );
      lastClick.current = itemKey;
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Drawer anchor="right" open={isSidebarOpen} onClose={toggleSidebar}>
        <Box sx={{ width: 300, p: 2 }}>
          <Typography variant="h6">Dataset Columns & Functions</Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Click to select/deselect. Shift for range. Cmd/Ctrl for multi-toggle.
          </Typography>
          <Divider sx={{ my: 2 }} />
          <List disablePadding>
            {localItems.map((item) => (
              <DraggableListItem
                key={getKey(item)}
                item={item}
                moveItems={moveItems}
                handleDelete={handleDelete}
                isSelected={selected.includes(getKey(item))}
                handleItemClick={handleItemClick}
                selectedItems={selected}
                isFixedLength={isFixedLength}
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
                setItems(localItems); // this now stores full array (columns+functions+order)
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
