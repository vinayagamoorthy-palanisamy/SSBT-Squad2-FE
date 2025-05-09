import React from "react";
import { Button, Grid } from "@mui/material";
import WithCustomTheme from "./WithCustomTheme";

const DynamicButtonGroup = ({
  direction = "row",
  buttons,
  justifyContent = "flex-end",
}) => {
  return (
    <Grid
      container
      direction={direction}
      spacing={2}
      justifyContent={justifyContent}
    >
      {buttons.map((button) => (
        <Grid key={button?.seq}>
          <Button
            variant={button?.variant || "contained"}
            color={button?.color || "primary"}
            onClick={button?.onClick}
            disabled={button?.disabled}
            sx={{color: 'FFF'}}
          >
            {button?.label}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default WithCustomTheme(DynamicButtonGroup);
