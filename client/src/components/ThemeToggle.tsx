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

  const styling = {marginRight: 2, color: theme.palette.primary.main}

  return (
      <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
        <Box sx={{display: 'flex', flexDirection: 'row', ...styling}}>
        {theme.palette.mode === 'dark' ?
          <>
            <Typography sx={styling}>Light Mode</Typography>
            <Brightness7Icon />
          </>
        :
          <>
            <Typography sx={styling}>Dark Mode</Typography>
            <Brightness4Icon />
          </>
        }
          </Box>
      </IconButton>
  );
}
