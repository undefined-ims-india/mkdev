import React, { useContext, ReactElement } from 'react';
import DesktopInbox from './DesktopInbox';
import MobileInbox from './MobileInbox';
import { UserContext } from '../UserContext';

import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';


const Messages = (): ReactElement => {

  const userId = useContext(UserContext).id;
  const mobileLayout = useMediaQuery<boolean>('(max-width:650px)');

  return (
    <Box>
      { userId &&
        mobileLayout ? ( <MobileInbox /> ) : ( <DesktopInbox /> )
      }
    </Box>
  );
}

export default Messages;
