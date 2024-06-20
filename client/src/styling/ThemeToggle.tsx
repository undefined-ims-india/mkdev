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
      <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ?
          <Box sx={{display: 'flex', flexDirection: 'row'}}>
            <Typography sx={{marginRight: 2}}>Light Mode</Typography>
            <Brightness7Icon />
          </Box>
        :
          <Box sx={{display: 'flex', flexDirection: 'row'}}>
            <Typography sx={{marginRight: 2}}>Dark Mode</Typography>
            <Brightness4Icon />
          </Box>
        }
      </IconButton>
  );
}
