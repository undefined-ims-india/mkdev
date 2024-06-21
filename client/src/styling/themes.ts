import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  // using the components object, we can define default styling props for components
  components: {
    // Name of the component
    MuiButtonBase: {
      defaultProps: {
        // The props to change the default for.
        // disableRipple: true, // No more ripple, on the whole application
      },
    },
  },
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
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#ce93d8',
    },
    background: {
      default: '#000000',
      paper: '#060401',
    },
  },
});
