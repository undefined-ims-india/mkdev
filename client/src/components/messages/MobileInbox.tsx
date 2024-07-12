import React, { useState, useEffect, useContext, useRef, ReactElement } from 'react';
import ConversationList from './ConversationList';
import ConversationView from './ConversationView';
import { UserContext } from '../UserContext';

import io from 'socket.io-client';
import axios from 'axios';
import { User, Conversations } from '@prisma/client';
import { ConversationWithParticipants } from '../../../../types';

import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CreateIcon from '@mui/icons-material/Create';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const socket = io('http://localhost:4000');

const MobileInbox = (): ReactElement => {


  return (
    <Typography>
      Mobile Inbox Component
    </Typography>
  );
}

export default MobileInbox;
