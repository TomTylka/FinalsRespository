import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#f6f6f7' },
    secondary: { main: '#2d5b82' },
    mode: 'light',
    background: { default: '#f6f6f7' },
    text: {
      primary: '#000000',
    },
  },
});

export { theme };
