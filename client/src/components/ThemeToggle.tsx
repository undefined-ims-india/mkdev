import React, { createContext, ReactElement, useContext } from 'react';

import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Box from '@mui/material/Box';

export const ColorModeContext = createContext({ toggleColorMode: () => {}});

export const ThemeToggle = (): ReactElement => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <>
      <IconButton onClick={colorMode.toggleColorMode} sx={{color: theme.palette.mode === 'light' ? '#000000' : '#ffffffff'}}>
        {theme.palette.mode === 'dark' ?
          <>
            <Brightness7Icon />
          </>
        :
          <>
            <Brightness4Icon />
          </>
        }
      </IconButton>
    </>
  );
}
