import React, { ReactElement } from 'react';
import '../styling/index.css';
import { Link } from 'react-router-dom';
import Nav from './Nav';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = (): ReactElement => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Nav />
    </ThemeProvider>
  );
};

export default App;
