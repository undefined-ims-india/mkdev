import React, {ReactElement, useState} from "react";
import { PostWithRelations } from "../../../types";
import { Link } from "react-router-dom";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

import MarkDown from "./MarkDown";

import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Chip from '@mui/material/Chip'

const Post = ({content} : {content: PostWithRelations}): ReactElement => {

  const [like, setLike] = useState(false);

  const handleLike = () => {
    setLike(!like);
  }

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
        {
          content.tags.length ?
          content.tags.map((tag) => (
            <Chip
              label={tag.name}
              variant="outlined"
              size="small"
              key={tag.name + content.id}
            />
          ))
          :
          <></>
        }
      </Box>
      <Box sx={{display:"flex", flexDirection:'row', marginLeft: 1, marginTop: 1, alignItems: 'center'}}>
        <IconButton aria-label='Like' onClick={handleLike}>
          {like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        <Box sx={{justifySelf: 'flex-end'}}>
          <Typography variant="body2">
            <Link to={`/post/${content.id}`}>
              {'See More -->'}
            </Link>
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default Post;
