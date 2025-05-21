import { Box, MenuItem, Select, Typography } from "@mui/material";

const DropDown = ({
  value,
  handleChange,
  label,
  options,
  placeHolder = "Select",
  selectStyle,
  color = "#101114",
}) => {
  return (
    <Box sx={{ minWidth: 120, display: "flex", alignItems: "center" }}>
      <Typography
        variant="label"
        component="p"
        sx={{ marginRight: "10px", color: color, fontSize: 14 }}
      >
        {label}
      </Typography>
      <Select
        labelId="label"
        id="select"
        value={value}
        placehol
        // label="Age"
        onChange={handleChange}
        sx={{
          width: selectStyle?.width ?? 100,
          height: selectStyle?.height ?? 40,
          marginRight: "10px",
          color: value ? color : "#8A939E",
          borderRadius: 0,
          fontSize: 14,
          backgroundColor: '#FFF'
        }}
        displayEmpty
      >
        <MenuItem sx={{ display: "none" }} value="" disabled>
          <em>{placeHolder}</em>
        </MenuItem>
        {options?.map((item) => (
          <MenuItem disabled={item?.disable} value={item?.value}>
            {item?.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default DropDown;
