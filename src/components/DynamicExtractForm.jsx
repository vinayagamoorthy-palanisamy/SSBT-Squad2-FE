import React from "react";
import {
  Box,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const DynamicExtractForm = ({
  title,
  fields,
  isTitleAvailable = false,
  color,
  customTitleStyle = { mb: 3 },
}) => {
  return (
    <Box>
      {isTitleAvailable && (
        <Typography variant="h6" sx={customTitleStyle} color={color}>
          {title}
        </Typography>
      )}
      <Grid container rowSpacing={3} columnSpacing={2}>
        {fields.map((field, idx) => (
          <Grid key={idx} size={field?.customSize ?? 3}>
            {field?.type === "select" ? (
              <TextField
                fullWidth
                select
                label={field.label}
                defaultValue={field.defaultValue || ""}
              >
                {field.options.map((option, i) => (
                  <MenuItem key={i} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            ) : field?.type === "text" ? (
              <TextField
                fullWidth
                label={field?.label}
                placeholder={field?.placeholder}
                defaultValue={field?.defaultValue || ""}
              />
            ) : (
              <Stack spacing={1}>
                <Typography variant="body2" color="black">
                  {field?.label}
                </Typography>
                <Typography variant="body2" color="black">
                  {field?.defaultValue}
                </Typography>
              </Stack>
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DynamicExtractForm;
