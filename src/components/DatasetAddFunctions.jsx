import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Tabs,
  Tab,
  Grid,
  Button,
  Chip,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Tooltip,
  Divider,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import SearchIcon from '@mui/icons-material/Search';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ToastNotification from './toastify';
import CircleIcon from '@mui/icons-material/Circle';
/**
 * Content component for "Add Functions" dialog.
 * Open via custom modal: handleOpenModal({ content: <DatasetAddFunctions .../> })
 */
const DatasetAddFunctions = ({ onClose, columnsByType = {}, onApply }) => {
  const textColsRaw = columnsByType.text || [];
  const numColsRaw = columnsByType.number?.length ? columnsByType.number : textColsRaw;
  const dateColsRaw = columnsByType.date?.length ? columnsByType.date : textColsRaw;
  const boolColsRaw = columnsByType.boolean?.length ? columnsByType.boolean : textColsRaw;

  const [tab, setTab] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  const [editorMode, setEditorMode] = useState(false);
  const [selectedCols, setSelectedCols] = useState(new Set());
  const [selectedFuncs, setSelectedFuncs] = useState(new Set());
  const [aliasText, setAliasText] = useState('');
  const [codeText, setCodeText] = useState('');
  const [applied, setApplied] = useState([]);
  const [sortOrder, setSortOrder] = useState('')
  const [toastOpen, setToastOpen] = useState(false)
  const [notification, setNotification] = useState(false)
  const [selectAllColumns, setSelectAllColumns] = useState(false)

  const FUNCTION_CONFIG = {
    text: [
      { id: 'UPPER', desc: 'Convert string to uppercase', type: 'SCALAR' },
      { id: 'LOWER', desc: 'Convert string to lowercase', type: 'SCALAR' },
      { id: 'TRIM', desc: 'Remove whitespace', type: 'SCALAR' },
      { id: 'LENGTH', desc: 'Count letters', type: 'SCALAR' }
    ],
    number: [
      { id: 'SUM', desc: 'Total sum', type: 'AGGREGATE' },
      { id: 'AVG', desc: 'Average value', type: 'AGGREGATE' },
      { id: 'MAX', desc: 'Largest value', type: 'AGGREGATE' },
      { id: 'MIN', desc: 'Smallest value', type: 'AGGREGATE' }
    ],
    date: [
      { id: 'COUNT', desc: 'Count dates', type: 'AGGREGATE' },
      { id: 'MIN', desc: 'Earliest date', type: 'AGGREGATE' },
      { id: 'MAX', desc: 'Latest date', type: 'AGGREGATE' }
    ],
    boolean: [
      { id: 'COUNT', desc: 'Count TRUE', type: 'AGGREGATE' },
      { id: 'SUM', desc: 'Sum TRUE', type: 'AGGREGATE' },
      { id: 'MAX', desc: 'Any TRUE', type: 'AGGREGATE' }
    ]
  };
  const columnTypes = ['text', 'number', 'date', 'boolean'];
  const tabLabels = ['Text Columns', 'Number Columns', 'Date Columns', 'Boolean Columns', 'Applied Functions'];

  const displayCols = useMemo(() => {
    let list = [];
    if (tab === 0) list = textColsRaw;
    else if (tab === 1) list = numColsRaw;
    else if (tab === 2) list = dateColsRaw;
    else if (tab === 3) list = boolColsRaw;
    const filtered = list.filter(c => c.toLowerCase().includes(searchText.toLowerCase()));
    return sortAsc ? filtered.slice().sort() : filtered.slice().sort().reverse();
  }, [textColsRaw, numColsRaw, dateColsRaw, boolColsRaw, tab, searchText, sortAsc]);

  const handleColClick = useCallback(col => {
    setSelectedCols(prev => {
      const next = new Set(prev);
      next.has(col) ? next.delete(col) : next.add(col);
      return next;
    });
  }, []);

  const handleFuncToggle = useCallback(fn => {
    setSelectedFuncs(prev => {
      const next = new Set(prev);
      next.has(fn) ? next.delete(fn) : next.add(fn);
      return next;
    });
  }, []);

  useEffect(() => {
    if(tab === 4){
      setNotification(false)
    }
  }, [tab])

  const applyFunction = () => {
    const newFns = [];
    if (editorMode) {
      codeText.split(';').forEach(expr => {
        const trimmed = expr.trim();
        if (trimmed) newFns.push({ column: null, expression: trimmed });
      });
    } else {
      selectedCols.forEach(col => selectedFuncs.forEach(fn => {
        const expr = `${fn}(${col})${aliasText ? ` AS ${aliasText}` : ''}`;
        const exists =   applied?.some(item => item?.column === col && item?.expression === expr)
        if(!exists) newFns.push({ column: col, expression: expr });
      }));
    }
    setApplied(prev => [...prev, ...newFns]);
    setToastOpen(true)
    setNotification(true)
    setSelectedCols(new Set());
    setSelectedFuncs(new Set());
    setAliasText('');
    setCodeText('');
    // setTab(4);
  };


  const moveFunction = useCallback((from, to) => {
    setApplied(prev => {
      const arr = [...prev];
      const [item] = arr.splice(from, 1);
      arr.splice(to, 0, item);
      return arr;
    });
  }, []);

  const handleDone = () => { onApply(applied); onClose(); };

  const DraggableFn = ({ fn, idx }) => {
    const [{ isDragging }, drag] = useDrag({ type: 'FN', item: { idx }, collect: m => ({ isDragging: m.isDragging() }) });
    const [, drop] = useDrop({ accept: 'FN', hover: item => {
      if (item.idx !== idx) { moveFunction(item.idx, idx); item.idx = idx; }
    }});
    return (
      <div ref={node => drag(drop(node))} style={{ opacity: isDragging ? 0.5 : 1 }}>
        <Tooltip title={fn.expression}>
          <Chip
            label={fn.expression.length > 25 ? `${fn.expression.slice(0,25)}...` : fn.expression}
            onDelete={() => setApplied(prev => prev.filter((_,i) => i!==idx))}
            variant="outlined"
            sx={{
              backgroundColor: '#ffffff',
              borderColor: '#0F8048',
              color: '#0F8048',
              m: 0.5,
              width: 250,
              '& .MuiChip-label': {
              flexGrow: 1,
              textAlign: 'center',
              paddingLeft: 0,
              paddingRight: 0,
            },
            '& .MuiChip-deleteIcon': {
              marginLeft: 'auto',
            },
            }}
          />
        </Tooltip>
      </div>
    );
  };
  
  return (
    <Box sx={{ backgroundColor:'#F0F2F5'}}>
      {/* <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Add Functions</Typography>
        <IconButton onClick={onClose}><CloseIcon /></IconButton>
      </Box> */}

      <Box display="flex" gap={2} mb={2} sx={{paddingLeft:3, paddingRight: 3, paddingTop: 2, paddingBottom: 0}}>
        <TextField
          fullWidth size="small" placeholder="Search column"
          value={searchText} onChange={e => setSearchText(e.target.value)}
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment> }}
        />
        <Box display="flex" flexDirection="column" alignItems="flex-end">
          <FormControl size="small" sx={{width: 120}}>
              <InputLabel>Sort</InputLabel>
              <Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} label="Sort">
                <MenuItem value="asc">Sort A - Z</MenuItem>
                <MenuItem value="desc">Sort Z - A</MenuItem>
              </Select>
            </FormControl>
        </Box>
      </Box>

      <Box sx={{backgroundColor:'#ffffff', p:3}}>
      <Box display="flex" alignItems="center" mb={2} sx={{borderBottom: 1, borderColor: 'divider'}}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ flex: 1 }} >
          {tabLabels.map((label, i) => (
            <Tab
              key={i}
              label={
                <Box display="flex" alignItems="center" >
                  <Typography fontWeight="bold" sx={{textTransform: 'none'}}>{label}</Typography>
                  {i === 4 && notification && (
                    <CircleIcon sx={{ fontSize: 10, color: '#BF1D1D', marginLeft: 1 }} />
                  )}
                </Box>
              }
            />
          ))}
        </Tabs>
        <FormControlLabel
          control={<Switch size="small" checked={editorMode} onChange={() => setEditorMode(e => !e)} />}
          label="Editor Mode"
          sx={{ color: '#000' }}
        />
      </Box>

      {tab < 4 ? (
        <Box display="flex" gap={2}   minHeight={300} maxHeight={300}  sx={{overflowY : 'scroll'}}>
          <Box flex={1}>
            {displayCols.length !== 0 && <Typography variant="subtitle2" sx={{ mb:1, fontWeight: 'bold', fontSize: 16 }}>Select Column</Typography>}
            {displayCols.length ? (
              <Grid container spacing={1}>
                {displayCols.map(col => (
                  <Grid item xs={5} key={col}>
                    <Chip
                      label={col}
                      clickable
                      onClick={() => handleColClick(col)}
                      sx={{
                        // width: '100%',
                        width: 250,
                        textAlign: 'center',
                        border: '1px solid',
                        borderColor: selectedCols.has(col) ? '#0014BF' : 'rgba(0, 0, 0, 0.23)',
                        backgroundColor: selectedCols.has(col) ? 'rgba(25,118,210,0.1)' : '#fff',
                        color: selectedCols.has(col) ? '#0014BF' : '#000',
                        px: 2,
                        mb: 1
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
               <Box sx={{ display: 'flex', justifyContent:'center', alignItems: 'center'}} height={'100%'}>
                <Typography  sx={{ mt:2 }}>No columns available.</Typography>
                </Box>
            )}
          </Box>

          {selectedCols.size !== 0 && <Box sx={{ width: 300 }}>
            {editorMode ? (
              <>
                <Typography variant="subtitle1" sx={{ mb:1, color: '#000' }}>Function Code Editor</Typography>
                <Typography variant="body2" sx={{ mb:1, color: '#000' }}>Apply any scalar or aggregate functions using this code editor. Use ';' to separate each function.</Typography>
                <TextField
                  multiline
                  minRows={8}
                  fullWidth
                  variant="outlined"
                  placeholder="Enter column functions (e.g. SUBSTRING(Column_7, 1, 5); Concat(Column_4, Column_7);)"
                  value={codeText}
                  onChange={e => setCodeText(e.target.value)}
                />
                <Button variant="contained" size="small" sx={{ mt:1 }} onClick={applyFunction} disabled={!codeText.trim()}>Apply Function</Button>
              </>
            ) : (
              <>
                <Typography variant="subtitle1" sx={{ mb:1, color: '#000', fontWeight: 'bold' }}>Select Functions</Typography>

                {FUNCTION_CONFIG[columnTypes[tab]].filter(f => f.type === 'SCALAR').length > 0 && <Typography variant="subtitle1" sx={{ mb:1, color: '#000' , fontStyle: 'italic'}}>SCALAR</Typography>}

                {FUNCTION_CONFIG[columnTypes[tab]].filter(f => f.type === 'SCALAR').map(f => (
                  <FormControlLabel
                    key={f.id}
                    control={<Checkbox size="small"  checked={selectedFuncs.has(f.id)} onChange={() => handleFuncToggle(f.id)} />}
                    label={<><p style={{ margin: 0, padding: 0, }}>{f.id}(Col): {f.desc}</p></>}
                    sx={{ color: '#000', display: 'flex', alignItems  : 'center', padding: 0.5 }}
                  />
                ))}

                {FUNCTION_CONFIG[columnTypes[tab]].filter(f => f.type === 'AGGREGATE').length > 0 && <Typography variant="subtitle1" sx={{ mb:1, color: '#000', fontStyle: 'italic' }}>AGGREGATE</Typography>}

                {FUNCTION_CONFIG[columnTypes[tab]].filter(f => f.type === 'AGGREGATE').map(f => (
                  <FormControlLabel
                    key={f.id}
                    control={<Checkbox size="small" checked={selectedFuncs.has(f.id)} onChange={() => handleFuncToggle(f.id)} />}
                   label={<><p style={{ margin: 0, padding: 0, }}>{f.id}(Col): {f.desc}</p></>}
                    sx={{ color: '#000', display: 'flex', alignItems  : 'center', padding: 0.5 }}
                  />
                ))}
                <Box mt={2} display="flex" flexDirection="column" gap={1}>
                  <TextField size="small" placeholder="Show As" value={aliasText} onChange={e => setAliasText(e.target.value)} />
                  <Button sx={{ color:'#0014BF', fontWeight:'bold', border: '1px solid #0014BF', width: 150, textTransform: 'none'}} size="small" onClick={applyFunction} disabled={selectedCols.size === 0 || selectedFuncs.size === 0}>Apply Function</Button>
                </Box>
              </>
            )}
          </Box>}
        </Box>
      ) : (
      applied.length > 0 ?
      <Box  minHeight={300} maxHeight={300}  sx={{overflowY : 'scroll'}}>
        <DndProvider backend={HTML5Backend}>
          <Box display="flex" flexWrap="wrap">
            {applied.map((fn, i) => <DraggableFn fn={fn} idx={i} key={i}  />)}
          </Box>
        </DndProvider> 
        </Box>: 
        <Box   minHeight={300} maxHeight={300} sx={{overflowY : 'scroll', display: 'flex', justifyContent:'center', alignItems: 'center'}}>
          <Typography>When you have applied functions, they will appear here.</Typography>
        </Box>
      )}
        <ToastNotification
          open={toastOpen}
          type={'success'}
          message={'Column functions added'}
          onClose={() => setToastOpen(false)}
        />
        <Box display={'flex'} alignItems={ 'center'} justifyContent={tab !== 4 ? 'space-between' : 'flex-end'} borderTop="1px solid #ddd" pt={2}>
          {tab !== 4 && <><Box>
            {/* <Typography>Select All</Typography> */}
            <FormControlLabel
                    key={1}
                    control={<Checkbox size="small"  checked={selectAllColumns} onChange={()=> setSelectAllColumns(!selectAllColumns)} />}
                    label={<><p style={{ margin: 0, padding: 0, fontWeight: 'bold', fontSize: '1rem' }}>Select All</p></>}
                    sx={{ color: '#000', display: 'flex', alignItems  : 'center', padding: 0.5 }}
                  />
          </Box>
          <Typography sx={{ fontWeight: 'bold'}}>{selectedCols?.size  || 0} Selected</Typography></>}
      <Box display="flex" justifyContent="flex-end"  sx={{}}>
        <Button onClick={onClose} sx={{backgroundColor:'#ffffff', color:'#0014BF', textTransform: 'none', fontWeight:'bold', border: '1px solid #0014BF', marginRight: 2}}>Cancel</Button>
        <Button variant="contained" onClick={handleDone} sx={{backgroundColor:'#0014BF',textTransform: 'none', color:'#ffffff', fontWeight:'bold'}}>Done</Button>
      </Box>
      </Box>

      </Box>
    </Box>
  );
};

export default DatasetAddFunctions;
