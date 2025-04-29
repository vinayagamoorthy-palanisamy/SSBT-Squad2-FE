import { Box, MenuItem, Select, Typography } from '@mui/material'

const DropDown = ({value,handleChange,label}) => {
  return (
    <Box sx={{ minWidth: 120,display:"flex", alignItems:"center" }}>
    <Typography variant="label" component="p"sx={{marginRight:"10px"}}>{label}: </Typography>
    <Select
      labelId="label"
      id="select"
      value={value}
      // label="Age"
      onChange={handleChange}
      sx={{ width: 200, height: 40,marginRight:"10px" }}
    >
      <MenuItem value={10}>Ten</MenuItem>
      <MenuItem value={20}>Twenty</MenuItem>
      <MenuItem value={30}>Thirty</MenuItem>
    </Select>
  </Box>
  )
}

export default DropDown