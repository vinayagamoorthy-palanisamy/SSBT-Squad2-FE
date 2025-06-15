import {
  Box,
  TextField,
  MenuItem,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Link,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

const CoreExtractForm = () => {
  const [parameters, setParameters] = useState([
    { name: 'P_IN_EFFECTIVE_DATE', value: '${env.date}' },
    { name: 'P_IN_ENTITY_ID', value: '023456773' },
    { name: 'P_IN_ENTITY_ID', value: '023456773' },
    { name: 'P_IN_ENTITY_ID', value: '023456773' },
    { name: 'P_IN_ENTITY_ID', value: '023456773' },
    { name: 'P_IN_ENTITY_ID', value: '023456773' },
    { name: 'P_IN_ENTITY_ID', value: '023456773' },
    { name: 'P_IN_ENTITY_ID', value: '023456773' },
  ]);
  const [isExpanded, setIsExpanded] = useState(false);

  const addParameter = () => {
    setParameters([...parameters, { name: '', value: '' }]);
  };

  const deleteParameter = (index) => {
    const updated = [...parameters];
    updated.splice(index, 1);
    setParameters(updated);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Box mt={4}>
      <Typography variant="h6" color="black">
        Create Core Extract
      </Typography>

      <Box display="flex" gap={2} mt={2}>
        <TextField
          label="Name"
          required
          placeholder="Enter name"
          sx={{ width: '30%', backgroundColor: 'white', border: '1px solid #ccc' }}
        />
        <TextField
          select
          label="Extract Format"
          required
          sx={{ width: '30%', backgroundColor: 'white', border: '1px solid #ccc' }}
          defaultValue="Formatted"
        >
          <MenuItem value="Formatted">Formatted</MenuItem>
          <MenuItem value="CSV">CSV</MenuItem>
        </TextField>
      </Box>

      <Box my={4}>
        <Typography variant="subtitle1" fontWeight="bold" color="black" mb={1}>
          Extract Parameters <span style={{ color: 'red' }}>*</span>
        </Typography>

        <Table sx={{ backgroundColor: 'white', border: '1px solid #ccc' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', borderRight: '1px solid #ccc' }}>
                Name
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', }}>
                Value
              </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCell colSpan={3}>
                <Link
                  component="button"
                  variant="body2"
                  onClick={addParameter}
                  sx={{ color: 'blue', ml: 1 }}
                >
                  + Add Parameter
                </Link>
              </TableCell>
            </TableRow>

            {(isExpanded ? parameters : parameters.slice(0, 6)).map((param, index) => (
              <TableRow key={index}>
                <TableCell sx={{ borderRight: '1px solid #ccc' }}>{param.name}</TableCell>
                <TableCell>{param.value}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => deleteParameter(index)} size="small">
                    <CloseIcon sx={{ color: 'darkblue', fontSize: 18 }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Box textAlign="center" mt={2}>
          <Link
            component="button"
            sx={{ color: 'darkblue', fontWeight: '500' }}
            onClick={toggleExpand}
          >
            {isExpanded ? 'Show Less' : 'View All Parameters'}
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default CoreExtractForm;