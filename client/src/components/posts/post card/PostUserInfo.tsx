import React from 'react';
import { Link } from "react-router-dom";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
import { SimpleUser } from "../../../../../types";

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'

export default ({author, createdAt}: {author: SimpleUser, createdAt: Date}) => (
  <Box sx={{display: "flex", flexDirection: "row", overflow: 'wrap', justifyContent: "start", alignItems: 'center'}}>
    <Link to={`/user/${author.id}/profile`} style={{textDecoration: 'none'}}>
      <Avatar
        alt={author.username! || author.name}
        src={author.picture!}
        sx={{
          width: '2.5vw', height: '2.5vw',
          minWidth: 40, minHeight: 40
        }}
      >
        {author.username![0] || author.name[0] || '?'}
      </Avatar>
    </Link>
    <Box sx={{display:"flex", flexDirection:'column',  marginLeft: 2, marginRight: 2, flexGrow: 1}}>
      <Typography variant="h1" sx={{fontSize: 23}}>{author.username || author.name}</Typography>
      <Typography variant="body2" sx={{color: 'silver'}}>{dayjs(createdAt).fromNow()}</Typography>
    </Box>
  </Box>
)