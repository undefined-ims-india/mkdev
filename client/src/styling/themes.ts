import { ThemeOptions } from '@mui/material/styles';

export const light: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#0288d1',
    },
    secondary: {
      main: '#f6f8fa',
    },
    background: {
      default: '#f6f8fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#1f2328',
      secondary: '#636c76',
      disabled: '#8c959f',
    },
    info: {
      main: '#0288d1',
    },
  },
  typography: {
    fontFamily: 'Roboto',
  },
};

// returns theme based on mode chosen
export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: amber,
          divider: amber[200],
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: deepOrange,
          divider: deepOrange[700],
          background: {
            default: deepOrange[900],
            paper: deepOrange[900],
          },
          text: {
            primary: '#fff',
            secondary: grey[500],
          },
        }),
  },
});