// EditableTransferList.js (Main Component)
import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Select,
  MenuItem,
  Checkbox,
  TextField,
  InputAdornment,
  List,
  ListItemButton,
  ListItemText,
  Divider
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SearchIcon from "@mui/icons-material/Search";
import ChipList from "./ChipList";

const allDatasets = Array.from({ length: 10 }, (_, i) => `Dataset_Name_${i + 1}`);
const allColumnsMap = Object.fromEntries(
  allDatasets.map((ds, i) => [
    ds,
    Array.from({ length: 30 }, (_, j) => `Column_${j + 1 + i}`) // unique columns per dataset
  ])
);

const initialDataset = allDatasets[0];
const initialAvailable = allColumnsMap[initialDataset].slice(1);
const initialSelected = [allColumnsMap[initialDataset][0], "MAX_FundValue", "MIN_FundValue"];

const EditableTransferList = () => {
  const [datasetSearch, setDatasetSearch] = useState("");
  const [selectedDataset, setSelectedDataset] = useState(initialDataset);
  const [availableColumns, setAvailableColumns] = useState(initialAvailable);
  const [selectedColumns, setSelectedColumns] = useState(initialSelected);
  const [editChipIndex, setEditChipIndex] = useState(null);
  const [editedValue, setEditedValue] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [rangeSelect, setRangeSelect] = useState(false);
  const [selectedAvailable, setSelectedAvailable] = useState([]);
  const [selectedSelected, setSelectedSelected] = useState([]);
  const [lastSelectedIndex, setLastSelectedIndex] = useState(null);
  const [searchAvailable, setSearchAvailable] = useState("");
  const [searchSelected, setSearchSelected] = useState("");

  const handleChipClick = (index, listType) => {
    const setSelected = listType === "available" ? setSelectedAvailable : setSelectedSelected;
    const currentSelected = listType === "available" ? selectedAvailable : selectedSelected;
    if (!rangeSelect) {
      if (currentSelected.includes(index)) {
        setSelected(currentSelected.filter((i) => i !== index));
      } else {
        setSelected([...currentSelected, index]);
      }
    } else {
      if (lastSelectedIndex === null) {
        setSelected([index]);
        setLastSelectedIndex(index);
      } else {
        const [start, end] = [lastSelectedIndex, index].sort((a, b) => a - b);
        const newRange = Array.from({ length: end - start + 1 }, (_, i) => start + i);
        setSelected(newRange);
        setLastSelectedIndex(null);
      }
    }
  };

  const moveItems = (from, to, selectedIndices, setFrom, setTo, clearSelected) => {
    const fromList = [...from];
    const toList = [...to];
    const itemsToMove = selectedIndices.map((i) => fromList[i]);
    const updatedFrom = fromList.filter((_, i) => !selectedIndices.includes(i));
    const updatedTo = [...toList, ...itemsToMove];
    setFrom(updatedFrom);
    setTo(updatedTo);
    clearSelected([]);
  };

  const handleEdit = (index) => {
    setEditChipIndex(index);
    setEditedValue(selectedColumns[index]);
  };

  const handleEditConfirm = () => {
    const updated = [...selectedColumns];
    updated[editChipIndex] = editedValue;
    setSelectedColumns(updated);
    setEditChipIndex(null);
    setEditedValue("");
  };

  const handleSortChange = (e) => {
    const order = e.target.value;
    setSortOrder(order);
    const sorted = [...availableColumns].sort((a, b) =>
      order === "asc" ? a.localeCompare(b) : b.localeCompare(a)
    );
    setAvailableColumns(sorted);
  };

  const handleDatasetSelect = (dataset) => {
    setSelectedDataset(dataset);
    setAvailableColumns(allColumnsMap[dataset].slice(1));
    setSelectedColumns([allColumnsMap[dataset][0], "MAX_FundValue", "MIN_FundValue"]);
    setSelectedAvailable([]);
    setSelectedSelected([]);
    setEditChipIndex(null);
  };

  const filterList = (list, query) => {
    return list.filter((item) => item.toLowerCase().includes(query.toLowerCase()));
  };

  return (
    <Box display="flex" flexDirection={"column"} gap={1} mt={3}>
    <Box display="flex" alignItems="center" justifyContent={"space-between"} gap={2} mb={0} sx={{backgroundColor:"#f3f3f3"}} p={2} >
    <Box display="flex" alignItems="center" gap={2} mb={0}>
      <Checkbox checked={rangeSelect} onChange={(e) => {
        setRangeSelect(e.target.checked);
        setLastSelectedIndex(null);
      }} />
      <Typography>Range Select</Typography>
      <Select value={sortOrder} onChange={handleSortChange} size="small" displayEmpty>
        <MenuItem value="">Sort</MenuItem>
        <MenuItem value="asc">A - Z</MenuItem>
        <MenuItem value="desc">Z - A</MenuItem>
      </Select>
    </Box>
      <Box mt={0}>
      <Button variant="contained" color="primary">Apply Functions</Button>
    </Box>
    </Box>

    <Box display={"flex"} gap={2} p={2}>

      {/* Dataset selection */}
      <Box mb={2} >
      <Typography variant="h6" gutterBottom>Dataset Columns</Typography>
        <TextField
          size="small"
          placeholder="Search dataset name..."
          value={datasetSearch}
          onChange={(e) => setDatasetSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
          fullWidth
        />
        <List dense>
          {filterList(allDatasets, datasetSearch).map((ds) => (
            <ListItemButton
              key={ds}
              selected={ds === selectedDataset}
              onClick={() => handleDatasetSelect(ds)}
            >
              <ListItemText primary={ds} />
            </ListItemButton>
          ))}
        </List>
        <Divider sx={{ my: 2 }} />
      </Box>


      <Box display="flex" gap={4}>
        <Box>
          <TextField
            size="small"
            placeholder="Search available..."
            value={searchAvailable}
            onChange={(e) => setSearchAvailable(e.target.value)}
            InputProps={{ startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ) }}
            fullWidth
            sx={{ mb: 1 }}
          />
          <ChipList
            title="Available columns"
            chips={filterList(availableColumns, searchAvailable)}
            selectedIndices={selectedAvailable}
            onChipClick={(index) => handleChipClick(index, "available")}
            editable={false}
          />
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="center" gap={1}>
          <Button
            variant="outlined"
            onClick={() =>
              moveItems(
                availableColumns,
                selectedColumns,
                selectedAvailable,
                setAvailableColumns,
                setSelectedColumns,
                setSelectedAvailable
              )
            }
          >
            <ArrowForwardIosIcon />
          </Button>
          <Button
            variant="outlined"
            onClick={() =>
              moveItems(
                selectedColumns,
                availableColumns,
                selectedSelected,
                setSelectedColumns,
                setAvailableColumns,
                setSelectedSelected
              )
            }
          >
            <ArrowBackIosIcon />
          </Button>
        </Box>
        <Box>
          <TextField
            size="small"
            placeholder="Search selected..."
            value={searchSelected}
            onChange={(e) => setSearchSelected(e.target.value)}
            InputProps={{ startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ) }}
            fullWidth
            sx={{ mb: 1 }}
          />
          <ChipList
            title="Selected columns"
            chips={filterList(selectedColumns, searchSelected)}
            selectedIndices={selectedSelected}
            onChipClick={(index) => handleChipClick(index, "selected")}
            editable
            editChipIndex={editChipIndex}
            editedValue={editedValue}
            onEditChange={setEditedValue}
            onEditClick={handleEdit}
            onEditConfirm={handleEditConfirm}
          />
        </Box>
      </Box>
    </Box>
    </Box>
  );
};

export default EditableTransferList;
