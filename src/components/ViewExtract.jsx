import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import {
  viewExtractButtons,
  viewExtractDetails,
  viewExtractSQL1,
  viewExtractSQL2,
} from "../utils/submitCustomExtractConfig";
import DynamicExtractForm from "./DynamicExtractForm";
import DynamicButtonGroup from "./DynamicButtonGroup";
import QueryBuilder from "./QueryBuilder";

const ViewExtract = () => {
  return (
    <div style={{ margin: 24, padding: 24, background: "#fefefe" }}>
      <Grid container>
        <Grid size={6}>
          <Typography color="black" sx={{ fontSize: 18, fontWeight: 600 }}>
            Extract1
          </Typography>
        </Grid>
        <Grid size={6}>
          <DynamicButtonGroup buttons={viewExtractButtons} />
        </Grid>
      </Grid>
      <Box sx={{ paddingTop: 4 }}>
        <DynamicExtractForm fields={viewExtractDetails} />
      </Box>
      <Box sx={{ mt: 4, p: 2, pt: 1, backgroundColor: "#f7f7f7" }}>
        <QueryBuilder />
      </Box>
      <Grid container rowSpacing={3} sx={{ paddingTop: 4 }}>
        <Grid size={6}>
          <DynamicExtractForm
            color="black"
            title="Extract SQL"
            fields={viewExtractSQL1}
            isTitleAvailable
            customTitleStyle={{ fontWeight: 600, fontSize: 14, mb: 2 }}
          />
        </Grid>
        <Grid size={12}>
          <DynamicExtractForm fields={viewExtractSQL2} />
        </Grid>
      </Grid>
    </div>
  );
};

export default ViewExtract;
