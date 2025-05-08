import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, IconButton, Typography, Box, Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const VersionHistoryModal = ({ open, onClose, extractName, versions }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Version History For {extractName}
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {versions.map((version, idx) => (
          <Box
            key={version.version}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p={1}
            mb={1}
            border={1}
            borderRadius={2}
            borderColor="#ccc"
          >
            <Box display="flex" flexDirection="column">
              <Typography variant="subtitle2">
                <strong>Version {version.version}</strong> by {version.author}
              </Typography>
              <Typography variant="caption">{version.timestamp}</Typography>
            </Box>
            <Box display="flex" gap={1}>
            {!version.isCurrent &&<Button variant="contained" size="small">View</Button>}
              {!version.isCurrent && <Button variant="outlined" size="small">Restore</Button>}
              {version.isCurrent && (
                <Typography variant="body2" color="primary" fontWeight={600}>Current Version</Typography>
              )}
            </Box>
          </Box>
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default VersionHistoryModal;
