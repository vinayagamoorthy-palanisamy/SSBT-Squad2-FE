import React from "react";
import { Modal, Box, IconButton } from "@mui/material";
import useCustomModal from "../store/useCustomModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const CustomModal = () => {
  const { isOpen, handleCloseModal, showClose, content,customStyle } = useCustomModal(
    (state) => state
  );
  return (
    <Modal
      open={isOpen}
      onClose={handleCloseModal}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={customStyle?customStyle:style}>
        {showClose && (
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            X
          </IconButton>
        )}
        {content}
      </Box>
    </Modal>
  );
};

export default CustomModal;
