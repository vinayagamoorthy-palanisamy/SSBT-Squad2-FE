import React from "react";
import { Box, Grid, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import {
  SQLQueryParam,
  tableParameters,
  viewExtractDetails,
  viewExtractSQL1,
  viewExtractSQL2,
} from "../utils/submitCustomExtractConfig";
import DynamicExtractForm from "./DynamicExtractForm";
import DynamicButtonGroup from "./DynamicButtonGroup";

const ViewExtract = () => {
  const onEdit = () => console.log("edit");
  const onCloneExtract = () => console.log("Clone Extract");
  const onApprove = () => console.log("Approve");
  const onReject = () => console.log("Reject");
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
            showEdit
            showCloneExtract
            showApprove
            showReject
            onEdit={onEdit}
            onCloneExtract={onCloneExtract}
            onApprove={onApprove}
            onReject={onReject}
          />
        </Grid>
      </Grid>
      <Box sx={{ paddingTop: 4 }}>
        <DynamicExtractForm fields={viewExtractDetails} />
      </Box>
      <Box sx={{mt:4, p:2, pt:1, backgroundColor: '#f7f7f7'}}>
        <Grid container columnSpacing={4}>
          <Grid size={6}>
            {SQLQueryParam?.map(data => (
              <Stack spacing={1} sx={{pt: 2}}>
                <Typography color="black">{data?.label}</Typography>
                <TextField fullWidth placeholder={data?.placeholder}/>
              </Stack>
            ))}
          </Grid>
          <Grid size={6} sx={{p: 2}}>
          <Typography color="black">
            Extract Parameters
          </Typography>
          <TableContainer  sx={{mt:3, border: '1px solid #e0e0e0', background: '#fff'}}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{borderBottom: '1px solid black'}}>
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
