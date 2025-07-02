import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
  Container, Typography, Paper, Accordion, AccordionSummary, AccordionDetails,
  Box, FormControl, InputLabel, Select, MenuItem, FormGroup, FormControlLabel,
  Switch, TextField, Button, Grid,
  Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import EditSquareIcon from '@mui/icons-material/EditSquare';

import useCustomModal from '../store/useCustomModal';
import ParameterPreviewModal from '../components/ParameterPreviewModal';
import HoldingsPreviewModal from '../components/HoldingsPreviewModal';
import DatasetAddColumns from '../components/DatasetAddColumns';
import DatasetAddFunctions from '../components/DatasetAddFunctions';
import DatasetListView from '../components/DatasetListView';
import FixedLengthModal from './fixedLengthModal';

// Your initial columns:
const datasetColumns = [
  { name: 'Column_4', type: 'column', fixedLengthValue: 0 },
  { name: 'Column_5', type: 'column', fixedLengthValue: 0 },
  { name: 'Column_6', type: 'column', fixedLengthValue: 0 },
  { name: 'Column_7', type: 'column', fixedLengthValue: 0 },
  { name: 'Column_8', type: 'column', fixedLengthValue: 0 },
  { name: 'Column_9', type: 'column', fixedLengthValue: 0 },
  { name: 'Column_10', type: 'column', fixedLengthValue: 0 },
  { name: 'Column_11', type: 'column', fixedLengthValue: 0 },
  { name: 'Column_74', type: 'column', fixedLengthValue: 0 },
  { name: 'Column_3', type: 'column', fixedLengthValue: 0 },
  { name: 'Column_2', type: 'column', fixedLengthValue: 0 },
  { name: 'Column_1', type: 'column', fixedLengthValue: 0 }
];

const isFixedLength = true

// Utility for unique key
const getKey = (item) =>
  item.type === 'function'
    ? item.expression
    : item.name;

const DraggableChip = ({
  item,
  index,
  allItems,
  filteredIndices,
  selectedKeys,
  setSelectedKeys,
  lastClickedIndex,
  setLastClickedIndex,
  moveGroup,
}) => {
  const key = getKey(item);
  const isFunction = item.type === 'function';
  const isSelected = selectedKeys.has(key);

  const handleClick = (e) => {
    const next = new Set(selectedKeys);
    if (e.shiftKey && lastClickedIndex != null) {
      // shift-select over the **visible filtered list** indices
      const [start, end] = [lastClickedIndex, index].sort((a, b) => a - b);
      for (let i = start; i <= end; i++) {
        next.add(getKey(allItems[filteredIndices[i]]));
      }
    } else {
      next.has(key) ? next.delete(key) : next.add(key);
      setLastClickedIndex(index);
    }
    setSelectedKeys(next);
  };

  // Use realIndex to always reference in the FULL allItems list (not just filtered)
  const realIndex = filteredIndices[index];

  const [{ isDragging }, drag] = useDrag({
    type: 'ITEM',
    item: {
      dragIndex: realIndex, // real index in allItems
      selectedKeys: isSelected ? Array.from(selectedKeys) : [key],
    },
    collect: monitor => ({ isDragging: monitor.isDragging() }),
  });

  const [, drop] = useDrop({
    accept: 'ITEM',
    hover: (dragItem) => {
      if (dragItem.dragIndex === realIndex) return;
      moveGroup(dragItem.dragIndex, realIndex, dragItem.selectedKeys);
      dragItem.dragIndex = realIndex;
    }
  });

  return (
    <div ref={node => drag(drop(node))} onClick={handleClick} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <Box
        sx={{
          p: 1,
          bgcolor: isSelected
            ? '#DAECFE'
            : '#fff',
          color: isSelected
            ? '#0014BF'
            : (isFunction ? '#0F8048' : '#000'),
          border: '1px solid',
          borderColor: isSelected
            ?  '#0014BF'
            :  (isFunction ? '#0F8048' :'rgba(0,0,0,0.23)'),
          borderRadius: 5,
          textAlign: 'center',
          cursor: 'grab',
          minHeight: 20,
          width: 250,
          fontWeight: 'normal',
          mb: 1,
          display: isFixedLength ? 'flex' : 'normal',
          justifyContent: item?.type === 'function' || (item.type === 'column' && isFixedLength === false) ? 'center' : 'normal'
        }}
      >
        {isFixedLength && item?.type === 'column' && 
        <>
        <Typography variant="body2" sx={{ px: 1 }}>
          {item?.fixedLengthValue || 0}
        </Typography>
        <Divider  orientation="vertical" flexItem sx={{ mx: 1, bgcolor: isSelected ? '#ffffff' : '#C4C8CC', alignSelf: "stretch" }} /> </>}
        <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography variant="body1" fontWeight={ 500} sx={{ px: 1, textAlign: "center" }}>
          {isFunction ? item.expression : item?.name}
        </Typography>
        </Box>
        {/* </Box> */}
      </Box>
    </div>
  );
};

export default function DatasetDefinition() {
  const { handleOpenModal, handleCloseModal } = useCustomModal(s => s);

  const [paramPreviewOpen, setParamPreviewOpen] = useState(false);
  const [dataPreviewOpen, setDataPreviewOpen] = useState(false);
  const [previewSQL, setPreviewSQL] = useState('');
  const [parameters] = useState([
    { name: 'P_IN_EFFECTIVE_DATE', value: '${env.date}' },
    { name: 'P_IN_ENTITY_ID', value: '023456773' },
    { name: 'P_IN_CLIENT_ID', value: 'JANUS' }
  ]);

  // <--- Single array for everything --->
  const [allItems, setAllItems] = useState([]);

  // For selection and drag
  const [selectedKeys, setSelectedKeys] = useState(new Set());
  const [lastClickedIndex, setLastClickedIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sqlMode, setSqlMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState('Dataset1');
  const [openFixedLength, setOpenFixedLength] = useState(false)

  // get filtered items and their indices in allItems
  const { filteredItems, filteredIndices } = useMemo(() => {
    const items = [];
    const indices = [];
    allItems.forEach((item, i) => {
      if (item.type === 'function'
        ? item.expression?.toLowerCase().includes(searchQuery.toLowerCase())
        : item.name?.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        items.push(item);
        indices.push(i);
      }
    });
    return { filteredItems: items, filteredIndices: indices };
  }, [allItems, searchQuery]);

  // Drag & drop moves all selected (regardless of type), keeping order
  const moveGroup = useCallback((from, to, draggedKeys) => {
    setAllItems(prev => {
      const arr = [...prev];
      const moving = arr.filter(c => draggedKeys.includes(getKey(c)));
      const rest = arr.filter(c => !draggedKeys.includes(getKey(c)));
      rest.splice(to, 0, ...moving);
      return rest;
    });
  }, []);

  // Open "Add Columns" modal
 const handleAddColumns = () => {
  handleOpenModal({
    isOpen: true,
    showClose: true,
    content: (
      <DatasetAddColumns
      fixed
        onClose={handleCloseModal}
        onApply={cols => {
          setAllItems(current => {
            const existingNames = new Set(current.filter(i => i.type === 'column').map(i => i.name));
            const newCols = cols.filter(c => !existingNames.has(c.name));
            return [...current, ...newCols];
          });
          handleCloseModal();
          setOpenFixedLength(true)
        }}
        datasetColumns={datasetColumns}
      />
    ),
    title: 'Add Columns',
    fullWidth: true,
    maxWidth: 'lg',
    customStyle: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      width: 920,
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4
    }
  });
};


  const columnsByType = useMemo(() => ({
    text: allItems.filter(i => i.type === 'column'),
    number: [],
    date: [],
    boolean: []
  }), [allItems]);

  const handleAddFunctions = () => {
    handleOpenModal({
      isOpen: true,
      showClose: true,
      content: (
        <DatasetAddFunctions
          onClose={handleCloseModal}
          columnsByType={columnsByType}
          onApply={funcs => {
            setAllItems(current => {
              // Only add new functions (no duplicate expressions)
              const existingExpressions = new Set(current.filter(i => i.type === 'function').map(i => i.expression));
              // Place new functions after the last column, or at the end
              const lastColumnIdx = current.map(i => i.type).lastIndexOf('column');
              const newFuncs = funcs.filter(f => !existingExpressions.has(f.expression));
              let arr = [...current];
              if (lastColumnIdx === -1) {
                arr = [...arr, ...newFuncs];
              } else {
                arr.splice(lastColumnIdx + 1, 0, ...newFuncs);
              }
              return arr;
            });
            handleCloseModal();
          }}
        />
      ),
      title: 'Add Functions',
      fullWidth: true,
      maxWidth: 'lg',
      customStyle: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 920,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4
      }
    });
  };

  const handleViewData = () => {
    const cols = parameters.map(p => p.name).join(', ');
    setPreviewSQL(`SELECT ${cols} FROM ${selectedDataset}`);
    setParamPreviewOpen(false);
    setDataPreviewOpen(true);
  };

  const handleEditCharLimit = () => {
  setOpenFixedLength(true);
};
  return (
    <DndProvider backend={HTML5Backend}>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom style={{ color: '#000000' }}>Define Dataset</Typography>

        <Paper sx={{ mb: 3, p: 3 }} elevation={3}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                flexDirection: 'row-reverse',
                '& .MuiAccordionSummary-expandIconWrapper': {
                  marginLeft: 'auto',
                  bgcolor: '#ffffff'
                },
              }}
            >
              <Box flexGrow={1} marginLeft={3}>
                <Typography variant="h6" fontWeight={'bold'}>Holdings</Typography>
              </Box>
              <Box display="flex" gap={2}>
                <Button
                  style={{ color: '#0014BF', border: '1px solid #0014BF', fontWeight: 'bold' }}
                  startIcon={<RemoveRedEyeIcon />}
                  onClick={() => setParamPreviewOpen(true)}
                >Preview</Button>
              </Box>
            </AccordionSummary>
            <AccordionDetails style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <FormControl style={{ width: '300px' }}>
                <InputLabel>Select Dataset *</InputLabel>
                <Select value={selectedDataset} label="Select Dataset *" onChange={e => setSelectedDataset(e.target.value)}>
                  <MenuItem value="Dataset1">Dataset 1</MenuItem>
                  <MenuItem value="Dataset2">Dataset 2</MenuItem>
                </Select>
              </FormControl>
              <FormGroup>
                <FormControlLabel control={<Switch checked={sqlMode} onChange={() => setSqlMode(m => !m)} />} label="SQL Mode" />
              </FormGroup>
            </AccordionDetails>
          </Accordion>
        </Paper>

        <Paper elevation={3}>
          <Box sx={{ p: 2, px: 3, backgroundColor: '#F0F2F5' }} display="flex" justifyContent="space-between">
            <Typography fontWeight={'bold'} variant="h6">Dataset Columns & Functions</Typography>
            <Box display="flex" gap={2}>
              <Button sx={{ color: '#0014BF', fontWeight: 'bold', textTransform: 'none' }} onClick={handleAddColumns} startIcon={<AddCircleOutlineIcon />}>Add Columns</Button>
              <Button disabled={!allItems.some(i => i.type === 'column')} onClick={handleAddFunctions} sx={{ color: '#0014BF', fontWeight: 'bold', textTransform: 'none' }} startIcon={<AddCircleOutlineIcon />}>Add Functions</Button>
              {
              isFixedLength && <><Button disabled={!allItems.length} sx={{ color: '#0014BF', fontWeight: 'bold', textTransform: 'none' }}  onClick={handleEditCharLimit} startIcon={<EditSquareIcon />}>Edit Character Limit</Button>
              <Divider orientation="vertical" flexItem sx={{ mx: 1 }} /></>
              }
              <Button disabled={!allItems.length} onClick={() => setIsSidebarOpen(b => !b)} sx={{ color: '#0014BF', fontWeight: 'bold', textTransform: 'none' }} startIcon={<ListAltIcon />}>List View</Button>
            </Box>
          </Box>

          <Box sx={{ p: 3 }}>
            {allItems.length > 0 && (
              <TextField fullWidth size="small" placeholder="Search columns or functions" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} sx={{ mb: 2 }} />
            )}

            <Box minHeight={300} maxHeight={300} display="flex" alignItems={!filteredItems.length ? 'center' : 'flex-start'} justifyContent={!filteredItems.length ? 'center' : 'flex-start'}>
              {filteredItems.length ? (
                <Grid container spacing={1}>
                  {filteredItems.map((item, i) => (
                    <Grid item xs={6} sm={4} md={3} key={getKey(item)}>
                      <DraggableChip
                        item={item}
                        index={i}
                        allItems={allItems}
                        filteredIndices={filteredIndices}
                        selectedKeys={selectedKeys}
                        setSelectedKeys={setSelectedKeys}
                        lastClickedIndex={lastClickedIndex}
                        setLastClickedIndex={setLastClickedIndex}
                        moveGroup={moveGroup}
                      />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography color="text.secondary" sx={{ py: 8, textAlign: 'center' }}>
                  No columns or functions selected yet. Add columns to start!
                </Typography>
              )}
            </Box>

            <DatasetListView
              items={allItems}
              isSidebarOpen={isSidebarOpen}
              toggleSidebar={() => setIsSidebarOpen(o => !o)}
              setItems={setAllItems}
              isFixedLength={isFixedLength}
            />

            {isFixedLength && 
            <FixedLengthModal 
            open={openFixedLength} 
            onClose={()=> setOpenFixedLength(false)} 
            datasetColumns={allItems.filter(col => col.type === 'column')} 
            onSave={updatedColumns => {
            // Merge updated values into allItems (parent state)
            setAllItems(items =>
              items.map(item =>
                item.type === "column"
                  ? {
                      ...item,
                      fixedLengthValue:
                        updatedColumns.find(c => c.name === item.name)?.fixedLengthValue ?? item.fixedLengthValue,
                    }
                  : item
              )
            );
            setOpenFixedLength(false);
          }}
            />
            }
          </Box>
        </Paper>

        <ParameterPreviewModal
          open={paramPreviewOpen}
          onClose={() => setParamPreviewOpen(false)}
          parameters={parameters}
          onViewData={handleViewData}
        />

        <HoldingsPreviewModal open={dataPreviewOpen} onClose={() => setDataPreviewOpen(false)} sql={previewSQL} />
      </Container>
    </DndProvider>
  );
}
