import {
  Box,
  Typography,
  Button,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  TextField,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import DropDown from "./DropDown";
import SQLEditor from "./SQLEditor";
import { AntSwitch } from "../CustomToggle";
import useCustomModal from "../store/useCustomModal";

const dataset = [
  {
    label: "Holding1",
    value: "holding1",
  },
];

const DatasetSection = () => {
  const { handleOpenModal } = useCustomModal((state) => state);
  const [showDatset, setShowDataset] = useState(true);
  const [showSqlToggle, setShowSqlToggle] = useState(false);

  const handleToggle = (e) => {
    setShowSqlToggle(e.target.check);
  };

  const handleAddDataset = () => {
    handleOpenModal({ isOpen: true, showClose: true, title: "Add Dataset", confirmText: "Add Dataset", content: <AddDatasetModal /> });
  };

  const AddDatasetModal = () => {
    return (
      <Box>
        <Typography fontSize={1.75} marginBottom={1.25}>Dataset Name</Typography>
        <TextField sx={{
        '& .MuiOutlinedInput-root': {
          height: 40,
          borderRadius: 0,        
        },
        '& .MuiOutlinedInput-input': {
          padding: '8px 12px',
        },
      }} fullWidth />
      </Box>
    );
  };

  return (
    <Box mt={4}>
      <Typography marginBottom={2} variant="h6" color="black">
        Define Dataset
      </Typography>
      {showDatset && (
        <Accordion
          sx={{
            minHeight: "52px",
            "& .MuiAccordionSummary-root": {
              padding: "12px 24px",
            },
          }}
        >
          <AccordionSummary
            defaultChecked
            expandIcon={<ExpandMoreIcon />}
            sx={{
              flexDirection: "row-reverse",
              "& .MuiAccordionSummary-expandIconWrapper": {
                marginRight: "auto",
                marginLeft: 0,
              },
            }}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Box>
                <Typography component="span">Holdings</Typography>
                <IconButton size="small">
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </Box>
              <Button
                variant="outlined"
                size="small"
                startIcon={<VisibilityOutlinedIcon sx={{ color: "#0014BF" }} />}
                sx={{
                  textTransform: "none",
                  color: "#0014BF",
                  borderColor: "#0014BF",
                  borderRadius: 0,
                  "& .MuiButtonBase-root": { padding: "6px 16px" },
                }}
              >
                Preview
              </Button>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box display="flex" justifyContent="space-between">
              <Box paddingLeft={4}>
                <DropDown
                  label="Select Dataset"
                  value={dataset?.value}
                  options={dataset}
                  flexDirection="column"
                  selectStyle={{ width: 300 }}
                />
              </Box>
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <AntSwitch
                  aria-label="ant design"
                  onChange={handleToggle}
                  value={showSqlToggle}
                />
                <Typography
                  paddingRight={0.5}
                  variant="body2"
                  color="textSecondary"
                >
                  SQL Mode
                </Typography>
              </Stack>
            </Box>
            <SQLEditor />
          </AccordionDetails>
        </Accordion>
      )}
      <Box
        mt={2}
        textAlign="center"
        backgroundColor="white"
        border="1px solid #ccc"
        display="flex"
        justifyContent="center"
        py={1}
      >
        <Button
          sx={{ height: "52px", padding: "12px 24px" }}
          startIcon={<AddCircleOutlineIcon sx={{ color: "#0014BF" }} />}
          variant="text"
          onClick={handleAddDataset}
        >
          <Typography
            fontWeight={600}
            color="#0014BF"
            variant="body"
            sx={{ textTransform: "capitalize" }}
          >
            Add Dataset
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default DatasetSection;
