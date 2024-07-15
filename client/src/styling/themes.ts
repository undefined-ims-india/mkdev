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
      main: '#21764e',
    },
    secondary: {
      main: '#21764e',
    },
    background: {
      default: '#f6f8fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#1f2328',
      secondary: '#fff',
      disabled: '#8c959f',
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00ff88',
    },
    secondary: {
      main: '#434343',
    },
    background: {
      default: '#000000',
      paper: '#060401',
    },
    text: {
      primary: '#fff',
      secondary: '#fff'
    },
  },
});
