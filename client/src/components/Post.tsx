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
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'

const Post = ({content, refreshParent} : {content: PostWithRelations, refreshParent: Function}): ReactElement => {

  const userId = useContext(UserContext);

  const handleLike = () => {
    axios.patch(`/api/posts/${content!.id}/${content!.likedByUser ? 'dislike' : 'like'}`)
      .then(() => {refreshParent()})
  };

  return (
    <Card sx={{marginBottom: 3, maxWidth: 3/4, borderRadius: 2}}>
      <Box sx={{display:"flex", flexDirection:'row', marginLeft: 2, marginTop: 2, alignItems: 'center'}}>
          <Link to={`/user/${content.author.id}/profile`}>
            <Avatar alt={content.author.username!} src={content.author.picture!}>
              {'?'}
              </Avatar>
          </Link>
        <Box sx={{display:"flex", flexDirection:'column',  marginLeft: 2, marginRight: 2}}>
          <Typography variant="h1" sx={{fontSize: 23}}>{content.author.username || content.author.name}</Typography>
          <Typography variant="body2" sx={{color: 'silver'}}>{dayjs(content.createdAt).fromNow()}</Typography>
        </Box>
      </Box>
      <Box sx={{display:"flex", flexDirection:'column', marginLeft: 9}}>
        <MarkDown text={content.title} />
        <Box sx={{display:"flex", flexDirection:'row', alignItems: 'center'}}>
          {
            content.tags.length ?
            content.tags.map((tag) => (
              <Chip
                label={tag.name}
                variant="outlined"
                size="medium"
                key={tag.name + content.id}
              />
            ))
            :
            <></>
          }
        </Box>
      </Box>
      <Box sx={{display: "flex", flexDirection: "row", alignItems: 'center', marginLeft: 9, marginBottom: 2, justifyContent: 'space-between'}}>
        <Box sx={{display: "flex", flexDirection: "row", alignItems: 'center'}}>
          <IconButton aria-label='Like' onClick={handleLike} disabled={!userId}>
            {content!.likedByUser ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <Typography variant="body1">{content!.liked.length} Likes</Typography>
        </Box>
        <Box sx={{marginRight: 1}}>
          <Link to={`/post/${content.id}`} style={{justifySelf:'end'}}>
            <Button>
              {'See Full Post'}
            </Button>
          </Link>
        </Box>
      </Box>
    </Card>
  );
};

export default Post;
