// ChipList.js
import React from "react";
import { Box, Typography, TextField, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const ChipList = ({
  title,
  chips,
  selectedIndices = [],
  onChipClick,
  editable = false,
  editChipIndex,
  editedValue,
  onEditChange,
  onEditClick,
  onEditConfirm
}) => {
  return (
    <Box>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>{title}</Typography>
      <Box display="flex" flexWrap="wrap">
        {chips.map((chip, index) => (
          <Box
            key={chip}
            onClick={() => onChipClick?.(index)}
            sx={{
              m: 0.5,
              display: 'inline-flex',
              alignItems: 'center',
              borderRadius: 2,
              border: selectedIndices.includes(index) ? '2px solid #1976d2' : '1px solid #ccc',
              px: 1.5,
              py: 0.75,
              cursor: 'pointer',
              backgroundColor: selectedIndices.includes(index) ? '#e3f2fd' : 'white',
              '&:hover .edit-icon': {
                visibility: editable ? 'visible' : 'hidden'
              }
            }}
          >
            {editable && editChipIndex === index ? (
              <TextField
                value={editedValue}
                size="small"
                autoFocus
                onChange={(e) => onEditChange(e.target.value)}
                onBlur={onEditConfirm}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') onEditConfirm();
                }}
                sx={{ minWidth: 120 }}
              />
            ) : (
              <>
                <Typography variant="body2" sx={{ mr: 1 }}>{chip}</Typography>
                {editable && (
                  <Tooltip title="Edit">
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditClick(index);
                      }}
                      className="edit-icon"
                      sx={{ p: 0, visibility: 'hidden' }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
              </>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ChipList;
