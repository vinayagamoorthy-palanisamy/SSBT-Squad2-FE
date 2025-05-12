import React from "react";
import DynamicButtonGroup from "./DynamicButtonGroup";
import { Typography } from "@mui/material";

const ApprovePopup = ({ showTitle, isApproval, buttons }) => {
  return (
    <>
      {showTitle && (
        <Typography color="black" id="modal-title" variant="h6" component="h2">
          {isApproval ? "Approve" : "Reject"}
        </Typography>
      )}
      <Typography color="black" id="modal-description" sx={{ mt: 2, pb: 2 }}>
        Are you sure want to {isApproval ? "approve" : "reject"}?
      </Typography>
      <DynamicButtonGroup buttons={buttons} justifyContent="center" />
    </>
  );
};

export default ApprovePopup;
