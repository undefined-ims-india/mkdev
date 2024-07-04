import React, {ReactElement, useContext} from "react";
import { UserContext } from '../../UserContext';
import { PostWithRelations } from "../../../../../types";
import { Link } from "react-router-dom";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
import axios from 'axios';
import { useTheme } from "@mui/material";

import MarkDown from "../MarkDown";
import PostTagsChips from "../PostTagsChips";
import PostUserInfo from "./PostUserInfo";

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
  const theme = useTheme().palette.mode;

  const handleLike = () => {
    axios.patch(`/api/posts/${content!.id}/${content!.likedByUser ? 'dislike' : 'like'}`)
      .then(() => {refreshParent()})
  };

  return (
    <>
      <Box className="fill top-curve" sx={{maxHeight: "250px"}}>
        {content!.s3_key ? <img alt="cover image" src={`https://mkdev-ims-india.s3.us-east-2.amazonaws.com/${content!.s3_key}`} /> : <></>}
      </Box>
      <Grid container spacing={0} sx={{background: theme === 'light' ? 'white' : '#171717', padding: '1vh',}} className={content.s3_key ? "bottom-curve" : "rounded"}>
        <Grid item lg={3} xs={12} >
          <PostUserInfo content={content}/>
        </Grid>
        <Grid item lg={9} xs={0}/>
        <Grid item xs={12} sx={{overflow: 'wrap'}}>
          <MarkDown text={content.title} />
        </Grid>
        <Grid item xs={12} sx={{display: "flex", alignContent: 'center'}}>
          {
          content.tags.length ?
          <PostTagsChips tags={content.tags} /> :
          <></>
          }
        </Grid>
        <Grid item lg={2} xs={4} sx={{display: "flex", flexDirection: "row", alignItems: 'center'}}>
          <IconButton aria-label='Like' onClick={handleLike} disabled={!userId}>
            {content!.likedByUser ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <Typography variant="body1">{content!.liked.length} Likes</Typography>
        </Grid>
        <Grid item lg={8} xs={4}/>
        <Grid item lg={2} xs={4} sx={{display: 'flex', justifyContent: 'right'}}>
          <Link to={`/post/${content.id}`}>
            <Button>
              {'See Full Post'}
            </Button>
          </Link>
        </Grid>
      </Grid>
    </>
  );
};

export default Post;