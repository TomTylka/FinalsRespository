import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#238636' },
    secondary: { main: '#b62324' },
    mode: 'light',
    background: { default: '#3f1b40' },
    text: {
      primary: '#000000',
    },
  },
});

export { theme };
