import { Snackbar, IconButton, Box, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import CloseIcon from '@mui/icons-material/Close';

const ToastNotification = ({ open, type = 'success', message, onClose }) => {
  const toastStyles = {
    success: {
      icon: <CheckCircleIcon sx={{ color: 'white', fontSize: 28 }} />,
      leftBg: '#007e3e',
      rightBg: '#e3fcef',
      textColor: '#1e4620',
    },
    error: {
      icon: <ErrorIcon sx={{ color: 'white', fontSize: 28 }} />,
      leftBg: '#d32f2f',
      rightBg: '#fdecea',
      textColor: '#611a15',
    },
  };

  const { icon, leftBg, rightBg, textColor } = toastStyles[type];

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Box sx={{ display: 'flex', bgcolor: leftBg, borderRadius: '4px', overflow: 'hidden', boxShadow: 3 }}>
        <Box sx={{ bgcolor: leftBg, p: 1.5, display: 'flex', alignItems: 'center' }}>
          {icon}
        </Box>
        <Box sx={{ bgcolor: rightBg, px: 2, py: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ color: textColor }}>{message}</Typography>
          <IconButton size="small" onClick={onClose}>
            <CloseIcon sx={{ color: textColor }} />
          </IconButton>
        </Box>
      </Box>
    </Snackbar>
  );
};

export default ToastNotification;
