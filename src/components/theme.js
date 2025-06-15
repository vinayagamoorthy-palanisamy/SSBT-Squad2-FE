// theme.js (or wherever you call createTheme)
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  components: {
    MuiStepIcon: {
      styleOverrides: {
        root: {
          '&.Mui-active': {
            color: '#4b5bdc',
          },
          '&.Mui-completed': {
            color: '#0033cc',
          },
        },
      },
    },
  },
});

export default theme;
