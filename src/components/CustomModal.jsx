// import React from "react";
// import { Modal, Box, IconButton } from "@mui/material";
// import useCustomModal from "../store/useCustomModal";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   p: 4,
// };

// const CustomModal = () => {
//   const { isOpen, handleCloseModal, showClose, content } = useCustomModal(
//     (state) => state
//   );

//   return (
//     <Modal
//       open={isOpen}
//       onClose={handleCloseModal}
//       aria-labelledby="modal-title"
//       aria-describedby="modal-description"
//     >
//       <Box sx={style}>
//         {showClose && (
//           <IconButton
//             aria-label="close"
//             onClick={handleCloseModal}
//             sx={{
//               position: "absolute",
//               right: 8,
//               top: 8,
//               color: (theme) => theme.palette.grey[500],
//             }}
//           >
//             X
//           </IconButton>
//         )}
//         {content}
//       </Box>
//     </Modal>
//   );
// };

// export default CustomModal;

// components/CommonDialog.jsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useCustomModal from "../store/useCustomModal";

export default function CustomModal() {
  const {
    isOpen,
    handleCloseModal,
    showClose,
    content,
    maxWidth,
    fullWidth,
    title,
  } = useCustomModal((state) => state);
  return (
    <Dialog
      open={isOpen}
      onClose={handleCloseModal}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      slotProps={{
        paper: {
          sx: {
            borderRadius: 0,
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          m: 0,
          pl: 2.5,
          pr: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: 6.5,
        }}
      >
        <Typography variant="body1" fontWeight={600}>
          {title}
        </Typography>
        {showClose && (
          <IconButton
            onClick={handleCloseModal}
            sx={{ color: (theme) => theme.palette.grey[500] }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>
     {content}
    </Dialog>
  );
}
