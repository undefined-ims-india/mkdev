import React from 'react';
import { Link } from "react-router-dom";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
import { PostWithRelations } from "../../../../../types";

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'

export default ({content}: {content: PostWithRelations}) => (
  <Box sx={{display: "flex", flexDirection: "row", overflow: 'wrap', justifyContent: "start", alignItems: 'center'}}>
    <Link to={`/user/${content.author.id}/profile`} style={{textDecoration: 'none'}}>
      <Avatar
        alt={content.author.username! || content.author.name}
        src={content.author.picture!}
        sx={{
          width: '2.5vw', height: '2.5vw',
          minWidth: 40, minHeight: 40
        }}
      >
        {content.author.username![0] || content.author.name[0] || '?'}
      </Avatar>
    </Link>
    <Box sx={{display:"flex", flexDirection:'column',  marginLeft: 2, marginRight: 2, flexGrow: 1}}>
      <Typography variant="h1" sx={{fontSize: 23}}>{content.author.username || content.author.name}</Typography>
      <Typography variant="body2" sx={{color: 'silver'}}>{dayjs(content.createdAt).fromNow()}</Typography>
    </Box>
  </Box>
)