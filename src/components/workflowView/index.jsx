import { Box, Collapse, IconButton, Paper, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useState } from "react";
import WorkflowSummaryTable from "./WorkflowSummaryTable";
import WorkflowDataTable from "./WorkflowDataTable";

const WorkflowView = () => {
  const [openSummary, setOpenSummary] = useState(true);

  return (
    <Paper
      elevation={1}
      sx={{
        padding: 2,
        borderRadius: 2,
        backgroundColor: "white",
        width: "100%",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        onClick={() => setOpenSummary(!openSummary)}
        sx={{ cursor: "pointer", userSelect: "none", mb: 1 }}
      >
        <IconButton size="small">
          {openSummary ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
        </IconButton>
        <Typography variant="h6">Workflow View</Typography>
      </Box>

      <Collapse in={openSummary}>
        <WorkflowSummaryTable />
      </Collapse>
      <WorkflowDataTable />
    </Paper>
  );
};

export default WorkflowView;
