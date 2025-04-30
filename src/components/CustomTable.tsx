import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { tableParameters } from "../utils/submitCustomExtractConfig";

const CustomTable = ({ customStyles = {} }) => {
  return (
    <TableContainer sx={customStyles}>
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
  );
};

export default CustomTable;
