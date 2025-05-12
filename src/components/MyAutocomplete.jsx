import { TextField, Typography, Box, Autocomplete } from "@mui/material";

export default function MyAutocomplete({ label, options, value, onChange }) {
  const handleChange = (event, newValue) => {
    onChange(newValue);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", maxHeight: "40px" }}>
      <Typography
        variant="body2"
        sx={{ fontSize: "14px", paddingRight: "12px", whiteSpace: "nowrap" }}
      >
        {label}:
      </Typography>
      <Autocomplete
        disablePortal
        options={options}
        onChange={handleChange}
        value={value}
        sx={{
          width: 207,
          "& .MuiOutlinedInput-root": {
            height: "40px",
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{ width: 207, maxHeight: "40px" }}
            size="small"
          />
        )}
      />
    </Box>
  );
}
