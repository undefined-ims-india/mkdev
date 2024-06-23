import React, {ReactElement, useContext} from "react";
import { UserContext } from './UserContext';
import { PostWithRelations } from "../../../types";
import { Link } from "react-router-dom";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
import axios from 'axios';

import MarkDown from "./MarkDown";

import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Post = ({content, refreshParent} : {content: PostWithRelations, refreshParent: Function}): ReactElement => {

  const userId = useContext(UserContext);

  const handleLike = () => {
    axios.patch(`/api/posts/${content!.id}/${content!.likedByUser ? 'dislike' : 'like'}`)
      .then(() => {refreshParent()})
  };

  return (
    <Card sx={{marginBottom: 5}}>
      <Box sx={{display:"flex", flexDirection:'row', marginLeft: 1, marginTop: 1, alignItems: 'center'}}>
        <Link to={`/user/${content.author.id}/profile`}>
          <Avatar alt={content.author.username!} src={content.author.picture!}>
            {'?'}
            </Avatar>
        </Link>
        <Typography variant="h1" sx={{fontSize: 20, marginLeft: 2, marginRight: 2}}>{content.author.username || content.author.name}</Typography>
        <Typography variant="body2" sx={{color: 'lightgrey'}}>{dayjs(content.createdAt).fromNow()}</Typography>
      </Box>
      <Box sx={{display:"flex", flexDirection:'column', marginLeft: 2}}>
        <MarkDown text={content.title} />
        <Box sx={{maxHeight: 200, overflow: 'hidden'}}>
          <MarkDown text={content.body} />
        </Box>
      </Box>
      <Box sx={{display:"flex", flexDirection:'row', marginLeft: 1, marginTop: 1, alignItems: 'center'}}>
      <IconButton aria-label='Like' onClick={handleLike} disabled={!userId}>
            {content!.likedByUser ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
      <Typography variant="body2">
        <Link to={`/post/${content.id}`}>
          {'See More -->'}
        </Link>
      </Typography>
      </Box>
    </Card>
  );
};

export default Post;
