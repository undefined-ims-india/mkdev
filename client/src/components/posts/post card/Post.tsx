import React, {ReactElement, useContext, useState} from "react";
import { UserContext } from '../../UserContext';
import { PostWithRelations } from "../../../../../types";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material";

import MarkDown from "../MarkDown";
import PostTagsChips from "../PostTagsChips";
import PostUserInfo from "./PostUserInfo";
import PostComments from "./PostComments";
import LikeButton from "./LikeButton";
import ActionMenu from "./ActionMenu";

import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const Post = ({content, refreshParent} : {content: PostWithRelations, refreshParent: Function}): ReactElement => {

  const theme = useTheme().palette.mode;
  const userId = useContext(UserContext).id;

  return (
    <>
      <Box className="fill top-curve" sx={{maxHeight: "250px"}}>
        {content!.s3_key ? <img alt="cover image" src={`https://mkdev-ims-india.s3.us-east-2.amazonaws.com/${content!.s3_key}`} /> : <></>}
      </Box>
      <Grid container spacing={0} sx={{background: theme === 'light' ? 'white' : '#171717', padding: '1vh',}} className={content.s3_key ? "" : "top-curve"}>
        <Grid item lg={3} xs={9} >
          <PostUserInfo createdAt={content.createdAt} author={content.author}/>
        </Grid>
        <Grid item lg={6} xs={0}/>
        <Grid item xs={3} sx={{display: 'flex', justifyContent: "end", alignItems: 'start'}}>
          {userId === content.author.id || true ?
          <ActionMenu id={content.id} refreshParent={refreshParent}/>
          :
          <></>
          }
        </Grid>
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
        <Grid item lg={1} xs={3} sx={{display: "flex", flexDirection: "row", alignItems: 'center'}}>
          <LikeButton postID={content.id} refreshParent={refreshParent} numLikes={content.liked.length} liked={content.likedByUser} />
        </Grid>
        <Grid item lg={1} xs={3} sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <ChatBubbleOutlineOutlinedIcon sx={{color: 'silver', marginRight: 1}} />
          <Typography variant="body1">{content!.comments!.length}</Typography>
        </Grid>
        <Grid item lg={8} xs={0}/>
        <Grid item lg={2} xs={6} sx={{display: 'flex', justifyContent: 'right'}}>
          <Link to={`/post/${content.id}`}>
            <Button>
              {'See Full Post'}
            </Button>
          </Link>
        </Grid>
      </Grid>
      {
        content.comments?
        <Box>
        <PostComments comments={content.comments} refreshParent={refreshParent} postID={content.id} />
      </Box>
      :
      <></>
      }
    </>
  );
};

export default Post;