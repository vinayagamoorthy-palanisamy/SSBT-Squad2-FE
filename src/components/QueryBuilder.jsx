import React from "react";
import {
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { SQLQueryParam } from "../utils/submitCustomExtractConfig";
import CustomTable from "./CustomTable";

const QueryBuilder = () => {
  return (
    <Grid container columnSpacing={4}>
      <Grid size={6}>
        {SQLQueryParam?.map((data, index) => (
          <Stack key={index} spacing={1} sx={{ pt: 2 }}>
            <Typography color="black">{data?.label}</Typography>
            <TextField fullWidth placeholder={data?.placeholder} />
          </Stack>
        ))}
      </Grid>
      <Grid size={6} sx={{ p: 2 }}>
        <Typography color="black">Extract Parameters</Typography>
        <CustomTable customStyles={{mt: 3, border: "1px solid #e0e0e0", background: "#fff"}} />
      </Grid>
    </Grid>
  );
};

export default QueryBuilder;
