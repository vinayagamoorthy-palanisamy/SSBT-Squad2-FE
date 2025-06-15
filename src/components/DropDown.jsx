import { Box, MenuItem, Select, Typography } from "@mui/material";

const DropDown = ({
  value,
  handleChange,
  label,
  options,
  placeHolder = "Select",
  selectStyle,
  color = "#101114",
  flexDirection = "row"
}) => {
  return (
    <Box sx={{ minWidth: 120, display: "flex", flexDirection: {flexDirection}, alignItems: "flex-start" }}>
      <Typography
        variant="label"
        component="p"
        sx={{ marginRight: "10px", color: color, fontSize: 14, paddingBottom: 1 }}
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
          backgroundColor: '#FFF',
          padding: "8px 12px"
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
