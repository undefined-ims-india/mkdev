import React, { useState, useContext, ReactElement } from 'react';
import DesktopInbox from './DesktopInbox';
import MobileInbox from './MobileInbox';
import { UserContext } from '../UserContext';

import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


const Messages = (): ReactElement => {

  const userId = useContext(UserContext).id;
  const mobileLayout = useMediaQuery<boolean>('(max-width:650px)');

  return (
    <Box>
      { !userId ? (
        <Box
          sx={{
            display: 'flex',
            padding: 2
          }}
        >
          <Typography variant="h3">
            You must be logged in to view conversations
          </Typography>
        </Box>
        ) : (
          mobileLayout ? ( <MobileInbox /> ) : ( <DesktopInbox /> )
        )
      }
    </Box>
  );
}

export default Messages;
