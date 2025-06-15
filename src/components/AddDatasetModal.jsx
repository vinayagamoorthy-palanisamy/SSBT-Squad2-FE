import React, { useEffect, useState } from "react";
import { Box, Button, DialogActions, DialogContent, TextField, Typography } from "@mui/material";
import useCustomModal from "../store/useCustomModal";
import useCreateExtract from "../store/useCreateExtract";

const AddDatasetModal = () => {
  const { handleCloseModal } = useCustomModal(state => state);
  const { handleDataset } = useCreateExtract(state => state);
  const [datasetList, setDatasetList] = useState([]);
  const [dataset, setDataset] = useState("");

  const handleDatasetName = (e) => {
    setDataset(e.target.value);
  };

  const handleAddDatasetName = () => {
    setDatasetList(prevState => [...prevState, dataset]);
    handleCloseModal();
  };

  useEffect(() => {
    handleDataset({datasetList});
  }, [datasetList])
  

  return (
    <div>
      <DialogContent sx={{ paddingX: 2.5, py: 1.25 }}>
        <Box>
          <Typography fontSize={14} marginBottom={1.25}>
            Dataset Name
          </Typography>
          <TextField
            sx={{
              "& .MuiOutlinedInput-root": {
                height: 40,
                borderRadius: 0,
              },
              "& .MuiOutlinedInput-input": {
                padding: "8px 12px",
              },
            }}
            onChange={handleDatasetName}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ paddingX: 2.5 }}>
        <Button
          sx={{
            borderRadius: 0,
            textTransform: "capitalize",
            fontSize: "14px",
            fontWeight: 600,
            px: 2,
            py: 0.75,
            color: "#0014BF",
            borderColor: "#0014BF",
          }}
          onClick={handleCloseModal}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          sx={{
            borderRadius: 0,
            textTransform: "capitalize",
            fontSize: "14px",
            fontWeight: 600,
            px: 2,
            py: 0.75,
            background: "#0014BF",
          }}
          onClick={handleAddDatasetName}
          variant="contained"
          disabled={dataset.length === 0}
        >
          Add Dataset
        </Button>
      </DialogActions>
    </div>
  );
};

export default AddDatasetModal;
