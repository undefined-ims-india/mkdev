import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
import { SimpleUser } from "../../../../../types";
import AvatarLink from './AvatarLink';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'

export default ({author, createdAt}: {author: SimpleUser, createdAt: Date}) => (
  <Box sx={{display: "flex", flexDirection: "row", overflow: 'wrap', justifyContent: "start", alignItems: 'center'}}>
    <AvatarLink user={author} />
    <Box sx={{display:"flex", flexDirection:'column',  marginLeft: 2, marginRight: 2, flexGrow: 1}}>
      <Typography variant="h1" sx={{fontSize: 23}}>{author.username || author.name}</Typography>
      <Typography variant="body2" sx={{color: 'silver'}}>{dayjs(createdAt).fromNow()}</Typography>
    </Box>
  </Box>
)