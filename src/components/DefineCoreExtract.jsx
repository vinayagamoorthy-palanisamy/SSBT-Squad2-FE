import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Tabs,
  Tab,
  IconButton,
  Button,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
import Search from "@mui/icons-material/Search";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import Add from "@mui/icons-material/Add";
import EditableTransferList from "../components/EditableTransferList";

const tabLabels = ["Header SQL", "Footer SQL", "Session SQL", "Warehouse SQL"];

const DefineCoreExtract = () => {
  const [name, setName] = useState("SSDD_EXTRACT_CORE_SDO_SECURITY...");
  const [format, setFormat] = useState("Delimited");
  const [activeTab, setActiveTab] = useState(0);
  const [sqlValues, setSqlValues] = useState(["", "", "", ""]);
  const [parameters, setParameters] = useState([
    { name: "P_IN_CLIENT_ID", value: "JANUS" },
    { name: "P_IN_EFFECTIVE_DATE", value: "${env.date}" },
    { name: "P_IN_CLIENT_ID", value: "023456773" }
  ]);
  const [search, setSearch] = useState("");
  const [newParam, setNewParam] = useState({ name: "", value: "" });

  const handleSqlChange = (value) => {
    const updated = [...sqlValues];
    updated[activeTab] = value;
    setSqlValues(updated);
  };

  const handleAddParam = () => {
    if (newParam.name && newParam.value) {
      setParameters([...parameters, newParam]);
      setNewParam({ name: "", value: "" });
    }
  };

  const handleEditParam = (index, field, value) => {
    const updated = [...parameters];
    updated[index][field] = value;
    setParameters(updated);
  };

  const handleDeleteParam = (index) => {
    const updated = [...parameters];
    updated.splice(index, 1);
    setParameters(updated);
  };

  const filteredParams = parameters.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.value.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box p={3} display="flex" flexDirection="column" gap={3}>
      <Typography variant="h6">Define Core Extract</Typography>

      {/* Name and Format */}
      <Box display="flex" gap={2}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
        <TextField
          select
          label="Extract Format"
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          fullWidth
        >
          <MenuItem value="Delimited">Delimited</MenuItem>
          <MenuItem value="Fixed">Fixed</MenuItem>
        </TextField>
      </Box>

      <Box p={0} display="flex" gap={2}>
      {/* SQL Section */}
      <Paper elevation={2} sx={{ p: 2 }}>
        <Tabs value={activeTab} onChange={(e, newVal) => setActiveTab(newVal)} sx={{ mb: 2 }}>
          {tabLabels.map((label, index) => (
            <Tab key={index} label={label} />
          ))}
        </Tabs>

        <TextField
          multiline
          minRows={10}
          placeholder={`Enter ${tabLabels[activeTab]}`}
          value={sqlValues[activeTab]}
          onChange={(e) => handleSqlChange(e.target.value)}
          fullWidth
          variant="outlined"
        />
      </Paper>

      {/* Parameters Section */}
      <Paper elevation={2} sx={{ p: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="subtitle1">Extract Parameters*</Typography>
          <TextField
            size="small"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              )
            }}
            sx={{ width: 300 }}
          />
        </Box>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Value</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredParams.map((param, index) => (
              <TableRow key={index}>
                <TableCell>
                  <TextField
                    variant="standard"
                    value={param.name}
                    onChange={(e) => handleEditParam(index, "name", e.target.value)}
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="standard"
                    value={param.value}
                    onChange={(e) => handleEditParam(index, "value", e.target.value)}
                    fullWidth
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleDeleteParam(index)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>
                <TextField
                  placeholder="Name"
                  variant="standard"
                  value={newParam.name}
                  onChange={(e) => setNewParam({ ...newParam, name: e.target.value })}
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <TextField
                  placeholder="Value"
                  variant="standard"
                  value={newParam.value}
                  onChange={(e) => setNewParam({ ...newParam, value: e.target.value })}
                  fullWidth
                />
              </TableCell>
              <TableCell align="right">
                <IconButton onClick={handleAddParam}>
                  <Add />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Box>
      {/* Editable Transfer List */}
      <EditableTransferList />

      {/* Next Button */}
      <Box display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary">
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default DefineCoreExtract;
