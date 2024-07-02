import React, {ReactElement, useContext} from "react";
import { UserContext } from './UserContext';
import { PostWithRelations } from "../../../types";
import { Link } from "react-router-dom";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
import axios from 'axios';

import MarkDown from "./MarkDown";
import PostTagsChips from "./PostTagsChips";

import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

const Post = ({content, refreshParent} : {content: PostWithRelations, refreshParent: Function}): ReactElement => {

  const userId = useContext(UserContext);

  const handleLike = () => {
    axios.patch(`/api/posts/${content!.id}/${content!.likedByUser ? 'dislike' : 'like'}`)
      .then(() => {refreshParent()})
  };

  return (
    <Card className="glass-card" sx={{
      borderRadius: 2,
      maxWidth: '55vw',
      backgroundColor: 'rgba(37, 55, 60, 0.67)',
      backdropFilter: 'blur(14px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.125)',
      boxShadow: '0 1px 12px rgba(0, 0, 0, 0.25)',
      padding: '10px'
    }} >
      <Box className="fill top-curve" sx={{maxHeight: "250px"}}>
        {content!.s3_key ? <img alt="cover image" src={`https://mkdev-ims-india.s3.us-east-2.amazonaws.com/${content!.s3_key}`} /> : <></>}
      </Box>
      <Grid container spacing={0} sx={{background:'aliceblue', padding: '1vh',}} className={content.s3_key ? "bottom-curve" : "rounded"}>
        <Grid item lg={3} xs={12}>
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
                {content.author.username![0] || content.author.firstName[0] || '?'}
              </Avatar>
            </Link>
            <Box sx={{display:"flex", flexDirection:'column',  marginLeft: 2, marginRight: 2, flexGrow: 1}}>
              <Typography variant="h1" sx={{fontSize: 23}}>{content.author.username || content.author.name}</Typography>
              <Typography variant="body2" sx={{color: 'silver'}}>{dayjs(content.createdAt).fromNow()}</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item lg={9} xs={0}/>
        <Grid item xs={12}>
          <Box sx={{overflow: 'wrap'}}>
            <MarkDown text={content.title} />
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Post;






























/*
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
        {
          content.tags.length ?
          <PostTagsChips tags={content.tags} /> :
          <></>
        }
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
    */