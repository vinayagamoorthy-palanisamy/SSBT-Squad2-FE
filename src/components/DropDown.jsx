import { Box, MenuItem, Select, Typography } from '@mui/material'

const DropDown = ({value,handleChange,label,options}) => {
  console.log("options",options)
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
     {options?.map((item)=>(
      <MenuItem value={item}>{item}</MenuItem>
     ))}
    </Select>
  </Box>
  )
}

export default DropDown