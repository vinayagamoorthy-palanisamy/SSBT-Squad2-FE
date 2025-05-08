import { TextField, Typography, Box, Autocomplete } from "@mui/material";

export default function MyAutocomplete({ label, options, onChange }) {
  const handleChange = (event, newValue) => {
    onChange(newValue);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", maxheight: "40px" }}>
      <Typography
        variant="label"
        component="p"
        sx={{ fontSize: "14px", paddingRight: "12px" }}
      >
        {label}:
      </Typography>
      <Autocomplete
        disablePortal
        options={options}
        onChange={handleChange}
        sx={{
          width: "207px",
          height:"40px",
          "& .MuiOutlinedInput-root": {
              height:"40px",
          },
        }}
        renderInput={(params) => (
          <TextField {...params} sx={{ width: "207px", maxHeight: "40px" }} />
        )}
      />
    </Box>
  );
}
