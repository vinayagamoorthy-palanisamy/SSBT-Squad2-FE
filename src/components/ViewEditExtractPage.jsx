import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import {
  viewExtractSQL1,
  viewExtractSQL2,
} from "../utils/submitCustomExtractConfig";
import DynamicExtractForm from "./DynamicExtractForm";
import DynamicButtonGroup from "./DynamicButtonGroup";
import QueryBuilder from "./QueryBuilder";
import { ViewEditExtractHook } from "./viewEditExtractHook";
import useViewEditExtract from "../store/useViewEditExtract";

const ViewEditExtractPage = () => {
  const {
    viewExtractButtons,
    editExtractButtons,
    viewExtractDetails,
    editExtractDetails,
  } = ViewEditExtractHook();
  const { isEditable } = useViewEditExtract((state) => state);
  return (
    <div style={{ margin: 24, padding: 24, background: "#fefefe" }}>
      <Grid container>
        <Grid size={6}>
          <Typography color="black" sx={{ fontSize: 18, fontWeight: 600 }}>
            Extract1
          </Typography>
        </Grid>
        <Grid size={6}>
          <DynamicButtonGroup
            buttons={isEditable ? editExtractButtons : viewExtractButtons}
          />
        </Grid>
      </Grid>
      <Box sx={{ paddingTop: 4 }}>
        <DynamicExtractForm
          fields={isEditable ? editExtractDetails : viewExtractDetails}
        />
      </Box>
      <Box sx={{ mt: 4, p: 2, pt: 1, backgroundColor: "#f7f7f7" }}>
        <QueryBuilder />
      </Box>
      <Grid container rowSpacing={3} sx={{ paddingTop: 4 }}>
        <Grid size={12}>
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

export default ViewEditExtractPage;
