import React, { useState } from 'react';
import { TextField, Popper, Paper, List, ListItem, ListItemButton, ListItemText, ClickAwayListener, Typography, Box } from '@mui/material';
 
 
export default function SearchableDropdown({label,options}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState('');
 
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
 
  const handleSelect = (option) => {
    setSelected(option);
    setSearch('');
    setAnchorEl(null);
    
  };
 
  const handleClickAway = () => {
    setAnchorEl(null);
  };
 
  const open = Boolean(anchorEl);
  const id = open ? 'searchable-dropdown' : undefined;
 
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(search.toLowerCase())
  );
 
  return (
    <Box sx={{ display:"flex", alignItems:"center"}}>
      <Typography variant="label" component="p" sx={{fontSize: "14px",paddingRight:"12px"}}>{label}: </Typography>
      <TextField
        value={selected}
        onClick={handleClick}
        InputProps={{ readOnly: true, 
          style:{
            maxHeight:"40px",
            maxWidth:"207px",
          }
         }}
      />
      <Popper id={id} open={open} anchorEl={anchorEl} style={{ zIndex: 1200, width: anchorEl?.clientWidth }}>
        <ClickAwayListener onClickAway={handleClickAway}>
          <Paper sx={{ mt: 1, p: 1 }}>
            <TextField
              placeholder="Search..."
              size="small"
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <List>
              {filteredOptions.length ? (
                filteredOptions.map((option) => (
                  <ListItem disablePadding key={option}>
                    <ListItemButton onClick={() => handleSelect(option)}>
                      <ListItemText primary={option} />
                    </ListItemButton>
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary="No results found" />
                </ListItem>
              )}
            </List>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </Box>
  );
}