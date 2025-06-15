import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditSquareIcon from '@mui/icons-material/EditSquare';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import DropDown from "./DropDown";
import SQLEditor from "./SQLEditor";
import { AntSwitch } from "../CustomToggle";
import useCustomModal from "../store/useCustomModal";
import AddDatasetModal from "./AddDatasetModal";
import useCreateExtract from "../store/useCreateExtract";

const dataset = [
  {
    label: "Holding1",
    value: "holding1",
  },
];

const DatasetSection = () => {
  const { handleOpenModal } = useCustomModal((state) => state);
  const { datasetList, sqlEditorToggle, handleDataset } = useCreateExtract((state) => state);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dataActionMenu = [
  {
    name: "SQL Editor Mode",
    value: "editorMode",
    icon: <EditSquareIcon fontSize="small" />,
    color: "#101114"
  },
  {
    name: "Rename Dataset",
    value: "edit",
    icon: <EditSquareIcon fontSize="small" />,
    color: "#101114"
  },
  {
    name: "Delete Dataset",
    value: "delete",
    icon: <DeleteForeverSharpIcon fontSize="small" />,
    color: "#BF1D1D"
  },
];


  const handleToggle = (e, i) => {
    e.stopPropagation();
    sqlEditorToggle[i] = e.target.checked;
    handleDataset({sqlEditorToggle: [...sqlEditorToggle]});
  }
   
  const handleDelete = (idx) => {
    const filteredDataset = datasetList?.filter(data => data !== datasetList[idx]);
    handleDataset({datasetList: filteredDataset});
  }

  const handleAddDataset = (type , inx) => {
    handleOpenModal({
      isOpen: true,
      showClose: true,
      title: "Add Dataset",
      content: <AddDatasetModal />,
    });
  };

  const handleGetButtons = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleItem = (type, inx) => {
    switch(type){
      case "edit":
        handleAddDataset(type);
      case "delete":
        handleDelete(inx);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  }

  const ButtonInMenu = ({idx}) => {
    return (
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              width: 212,
              borderRadius: 0,
            },
          },
          list: {
            "aria-labelledby": "long-button",
          },
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {dataActionMenu.map((option) => (
          <MenuItem key={option?.value} onClick={() => handleItem(option?.value, idx)}>
            <ListItemIcon sx={{color: option?.color}}>
              {option?.icon}
            </ListItemIcon>
            <Typography sx={{color: option?.color}}>{option?.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    );
  };

  return (
    <Box mt={4}>
      <Typography marginBottom={2} variant="h6" color="black">
        Define Dataset
      </Typography>
      {datasetList.length > 0 &&
        datasetList?.map((datasetName, inx) => (
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
                <Box paddingLeft={1}>
                  <Typography component="span">{datasetName}</Typography>
                  <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? "long-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                    onClick={e => handleGetButtons(e, inx)}
                    size="small"
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                  <ButtonInMenu idx={inx} />
                </Box>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={
                    <VisibilityOutlinedIcon sx={{ color: "#0014BF" }} />
                  }
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
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ alignItems: "center" }}
                >
                  <AntSwitch
                    aria-label="ant design"
                    onChange={e => handleToggle(e, inx)}
                    value={sqlEditorToggle[inx]}
                    checked={sqlEditorToggle[inx]}
                    defaultChecked
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
              {sqlEditorToggle[inx] && <SQLEditor />}
            </AccordionDetails>
          </Accordion>
        ))}
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
