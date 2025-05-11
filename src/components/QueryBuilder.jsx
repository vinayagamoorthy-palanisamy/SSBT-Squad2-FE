import React from "react";
import {
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { SQLQueryParam, tableParameters } from "../utils/submitCustomExtractConfig";

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
        <TableContainer
          sx={{ mt: 3, border: "1px solid #e0e0e0", background: "#fff" }}
        >
          <Table size="small">
            <TableHead>
              <TableRow sx={{ borderBottom: "1px solid black" }}>
                <TableCell>Name</TableCell>
                <TableCell>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableParameters.map((param, index) => (
                <TableRow key={index}>
                  <TableCell>{param.name}</TableCell>
                  <TableCell>{param.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default QueryBuilder;
