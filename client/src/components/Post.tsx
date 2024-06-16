import React, {ReactElement, useState} from "react";
import { PostWithRelations } from "../../../types";
import { Link } from "react-router-dom";
import MarkDown from "./MarkDown";

import Card from "@mui/material/Card";
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box'

const Post = ({content} : {content: PostWithRelations}): ReactElement => {
  return (
    <Card>
      <Box sx={{display: 'flex', flexDirection:'row'}}>
        <Link to={`/user/${content.author.id}/profile`}>
        <Avatar alt={content.author.username!} src={content.author.picture!}>
          {'?'}
          </Avatar>
        </Link>
        {content.author.username || content.author.name}
      </Box>
      <Box sx={{display:"flex", flexDirection:'column'}}>
        <MarkDown text={content.title} />
        <MarkDown text={content.body} />
      </Box>
    </Card>
  )
};

export default Post;