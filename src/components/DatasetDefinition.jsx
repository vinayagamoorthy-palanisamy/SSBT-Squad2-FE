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
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import useCustomModal from '../store/useCustomModal';
import ParameterPreviewModal from '../components/ParameterPreviewModal';
import HoldingsPreviewModal from '../components/HoldingsPreviewModal';
import DatasetAddColumns from '../components/DatasetAddColumns';
import DatasetAddFunctions from '../components/DatasetAddFunctions';
import DatasetListView from '../components/DatasetListView';

const DraggableChip = ({
  item,
  index,
  moveChip,
  selectedColumns,
  setSelectedColumns,
  allColumns,
  lastClickedIndex,
  setLastClickedIndex,
}) => {
  const column = item.name;
  const isFunction = item.type === 'function';
  const isSelected = selectedColumns.has(column);

  const handleClick = (e) => {
    const next = new Set(selectedColumns);
    if (e.shiftKey && lastClickedIndex != null) {
      const [start, end] = [lastClickedIndex, index].sort((a, b) => a - b);
      for (let i = start; i <= end; i++) {
        next.add(allColumns[i].name);
      }
    } else if (e.ctrlKey || e.metaKey) {
      next.has(column) ? next.delete(column) : next.add(column);
      setLastClickedIndex(index);
    } else {
      next.has(column) ? next.delete(column) : next.add(column);
      setLastClickedIndex(index);
    }
    setSelectedColumns(next);
  };

  const [{ isDragging }, drag] = useDrag({
    type: 'COLUMN',
    item: () => ({ index, list: selectedColumns.has(column) ? Array.from(selectedColumns) : [column] }),
    collect: monitor => ({ isDragging: monitor.isDragging() }),
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
    <div ref={node => drag(drop(node))} onClick={handleClick} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <Box
        sx={{
          p: 1,
          bgcolor: isSelected ? '#1976d2' : '#fff',
          color: isSelected ? '#fff' : isFunction ? '#0F8048' : '#000',
          border: '1px solid',
          borderColor: isSelected ? '#1976d2' : isFunction ? '#0F8048' : 'rgba(0,0,0,0.23)',
          borderRadius: 2,
          textAlign: 'center',
          cursor: 'grab',
          '&:hover': {
            bgcolor: isSelected
              ? '#1565c0'
              : isFunction
              ? '#c8e6c9'
              : '#f0f0f0',
          },
          width: 250,
          fontWeight:'normal'
        }}
      >
        {column}
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

  const [submittedColumns, setSubmittedColumns] = useState([]);
  const [submittedFunctions, setSubmittedFunctions] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState(new Set());
  const [lastClickedIndex, setLastClickedIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sqlMode, setSqlMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState('Dataset1');

  useEffect(() => {
  if (submittedColumns.length && typeof submittedColumns[0] === 'object') {
    setColumns(submittedColumns); // Already contains { name, type } in order
  } else {
    // Fallback for first-time column addition
    const fallback = [
      ...submittedColumns.map(name => ({ name, type: 'column' })),
      ...submittedFunctions.map(func =>
        typeof func === 'string'
          ? { name: func, type: 'function' }
          : { name: func?.expression || func?.name || 'Unnamed', type: 'function' }
      )
    ];
    setColumns(fallback);
  }
  setSelectedColumns(new Set());
}, [submittedColumns, submittedFunctions]);

  const filteredColumns = useMemo(
    () => columns.filter(c => c.name?.toLowerCase?.().includes(searchQuery.toLowerCase())),
    [columns, searchQuery]
  );

  const moveChip = useCallback((from, to, draggedNames) => {
    setColumns(prev => {
      const arr = [...prev];
      const moving = draggedNames.length
        ? arr.filter(c => draggedNames.includes(c.name))
        : [arr[from]];
      const rest = arr.filter(c => !moving.includes(c));
      rest.splice(to, 0, ...moving);
      return rest;
    });
  }, []);

  const handleAddColumns = () => {
    handleOpenModal({
      isOpen: true,
      showClose: true,
      content: (
        <DatasetAddColumns
          onClose={handleCloseModal}
          onApply={cols => {
            setSubmittedColumns(cols); // cols is array of strings
            handleCloseModal();
          }}
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

  const columnsByType = { text: submittedColumns, number: [], date: [], boolean: [] };

  const handleAddFunctions = () => {
    handleOpenModal({
      isOpen: true,
      showClose: true,
      content: (
        <DatasetAddFunctions
          onClose={handleCloseModal}
          columnsByType={columnsByType}
          onApply={funcs => {
            setSubmittedFunctions(funcs); // funcs is array of strings
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
                },
              }}
            >
              <Box flexGrow={1} marginLeft={3}>
                <Typography variant="h6" fontWeight={'bold'}>Holdings</Typography>
              </Box>
              <Box display="flex" gap={2}>
                <Button
                  style={{ color: '#0014BF', border: '1px solid #0014BF', fontWeight: 'bold' }}
                  variant="contained"
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
            <Typography fontWeight={'bold'} variant="h6">Dataset Columns</Typography>
            <Box display="flex" gap={2}>
              <Button sx={{ color: '#0014BF', fontWeight: 'bold' }} onClick={handleAddColumns} startIcon={<AddCircleOutlineIcon />}>Add Columns</Button>
              <Button disabled={!columns.length} onClick={handleAddFunctions} sx={{ color: '#0014BF', fontWeight: 'bold' }} startIcon={<AddCircleOutlineIcon />}>Add Functions</Button>
              <Button disabled={!columns.length} onClick={() => setIsSidebarOpen(b => !b)} sx={{ color: '#0014BF', fontWeight: 'bold' }} startIcon={<ListAltIcon />}>List View</Button>
            </Box>
          </Box>

          <Box sx={{ p: 3 }}>
            {columns.length > 0 && (
              <TextField fullWidth size="small" placeholder="Search column" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} sx={{ mb: 2 }} />
            )}

            <Box minHeight={300} maxHeight={300} display="flex" alignItems={!filteredColumns.length ? 'center' : 'flex-start'} justifyContent={!filteredColumns.length ? 'center' : 'flex-start'}>
              {filteredColumns.length ? (
                <Grid container spacing={1}>
                  {filteredColumns.map((item, i) => (
                    <Grid item xs={6} sm={4} md={3} key={item.name + item.type}>
                      <DraggableChip
                        item={item}
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
              ) : (
                <Typography>There are no columns selected. Add columns to view them here.</Typography>
              )}
            </Box>

              <DatasetListView
                columns={columns}
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={() => setIsSidebarOpen(o => !o)}
                setSubmittedColumns={setSubmittedColumns} 
              />
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
