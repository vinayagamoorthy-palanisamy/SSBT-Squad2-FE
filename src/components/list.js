import { useState, useMemo } from "react";
import {
  Box,
  Typography,
  TextField,
  List,
  ListItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const dummyExtracts = [
  {
    name: "Extract_1",
    description: "Lorem ipsum dolor sit amet lorem max 2 lines of text here...",
  },
  {
    name: "Extract_2",
    description: "Lorem ipsum dolor sit amet lorem max 2 lines of text here...",
  },
  {
    name: "Extract_3",
    description: "Lorem ipsum dolor sit amet lorem max 2 lines of text here...",
  },
  {
    name: "Extract_4",
    description: "Lorem ipsum dolor sit amet lorem max 2 lines of text here...",
  },
  {
    name: "Extract_5",
    description: "Lorem ipsum dolor sit amet lorem max 2 lines of text here...",
  },
  {
    name: "Extract_6",
    description: "Lorem ipsum dolor sit amet lorem max 2 lines of text here...",
  },
  {
    name: "Extract_7",
    description: "Lorem ipsum dolor sit amet lorem max 2 lines of text here...",
  },
  {
    name: "Extract_8",
    description: "Lorem ipsum dolor sit amet lorem max 2 lines of text here...",
  },
  {
    name: "Extract_9",
    description: "Lorem ipsum dolor sit amet lorem max 2 lines of text here...",
  },
  {
    name: "Extract_10",
    description: "Lorem ipsum dolor sit amet lorem max 2 lines of text here...",
  },
  {
    name: "Extract_11",
    description: "Lorem ipsum dolor sit amet lorem max 2 lines of text here...",
  },
  {
    name: "Extract_12",
    description: "Lorem ipsum dolor sit amet lorem max 2 lines of text here...",
  },
];

const ExtractList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const filteredAndSortedExtracts = useMemo(() => {
    const filtered = dummyExtracts.filter(({ name, description }) =>
      (name + description).toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sorted = [...filtered].sort((a, b) =>
      sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );

    return sorted;
  }, [searchQuery, sortAsc]);

  return (
    <Box mt={6}>
      <Typography variant="h6" color="#101114" gutterBottom>
        Select Existing Core Extracts
      </Typography>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        gap={1}
      >
        <TextField
          placeholder="Search extracts"
          size="small"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            maxWidth: "90%",
            backgroundColor: "white",
            "& input::placeholder": {
              opacity: 1,
            },
            "& .MuiInputBase-root": {
              borderRadius: 0,
            },
          }}
        />

        <Button
          variant="outlined"
          onClick={() => setSortAsc(!sortAsc)}
          sx={{
            backgroundColor: "white",
            color: "#383838",
            borderColor: "#C4C8CC",
            "&:hover": {
              backgroundColor: "#f0f0f0",
              borderColor: "#C4C8CC",
            },
            maxHeight: "40px",
            textTransform: "capitalize",
            padding: "8px 12px",
            letterSpacing: 0,
            minWidth: 120,
            borderRadius: 0,
          }}
          endIcon={
            <KeyboardArrowDownIcon sx={{ color: "black", fontSize: 20 }} />
          }
        >
          Sort {sortAsc ? "A→ Z" : "Z→ A"}
        </Button>
      </Box>

      <RadioGroup>
        <List
          sx={{ maxHeight: 400, overflow: "auto", backgroundColor: "white" }}
        >
          {filteredAndSortedExtracts.map((extract, i) => (
            <ListItem alignItems="flex-start" key={i} sx={{ height: 34 }}>
              <FormControlLabel
                value={extract.name}
                control={<Radio size="small" />}
                label={
                  <Box display="flex">
                    <Typography
                      variant="caption"
                      fontWeight="700"
                      color="#000"
                      sx={{ marginLeft: 2, width: 160 }}
                    >
                      {extract.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      fontWeight="400"
                      sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        marginLeft: 12,
                      }}
                    >
                      {extract.description}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </RadioGroup>
    </Box>
  );
};

export default ExtractList;
