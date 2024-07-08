import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { PostWithRelations } from "../../../../../types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import MarkDown from "../MarkDown";
import RepoDisplay from "./RepoDisplay";
import PostComments from '../post card/PostComments';
import PostUserInfo from '../post card/PostUserInfo'
import LikeButton from "../post card/LikeButton";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Backdrop from '@mui/material/Backdrop'
import FullscreenIcon from '@mui/icons-material/Fullscreen';

const FullPost = (): React.ReactElement => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [content, setContent]: [PostWithRelations | null, Function] =
    useState(null);
  const contentREF = useRef(content);

  const getPost = () => {
    axios.get(`/api/posts/${id}`).then(({ data }) => {
      setContent(data);
    });
  };

  const openDrawer = () => {
    setOpen(true);
  }

  const closeDrawer = () => {
    setOpen(false);
  }

  useEffect(getPost, [contentREF]);

  try {
    return (
      <>
      {content!.s3_key ? (
        <Backdrop open={open} onClick={closeDrawer} sx={{zIndex: 10000}}>
          <img alt="cover image" src={`https://mkdev-ims-india.s3.us-east-2.amazonaws.com/${content!.s3_key}`} />
        </Backdrop>
      ) :
      <></>
      }
      <Grid container spacing={0} paddingTop={'5vh'}>
        <Grid item xs={1} />
        <Grid item xs={10}>
            {content!.s3_key ? (
              <Grid container sx={{height: '30vh'}} className="glass-card top-curve">
              <Grid item xs={1} md={2}/>
              <Grid item xs={10} md={8} sx={{display: 'flex', justifyContent: 'center', height: '30vh'}}>
                {content!.s3_key ? <img alt="cover image" src={`https://mkdev-ims-india.s3.us-east-2.amazonaws.com/${content!.s3_key}`} /> : <></>}
                <IconButton sx={{justifySelf: 'end', alignSelf: 'end'}} onClick={openDrawer}>
                  <FullscreenIcon />
                </IconButton>
              </Grid>
              <Grid item xs={1} md={2}/>
            </Grid>
            ):
            <></>
            }
          <Paper sx={{paddingY: 2}}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                marginLeft: 1,
                alignItems: "center",
              }}
            >
              <PostUserInfo author={content!.author} createdAt={content!.createdAt} />
              <LikeButton postID={content!.id} liked={content!.likedByUser} numLikes={content!.liked.length} refreshParent={getPost} />
            </Box>
            <Box
              sx={{ display: "flex", flexDirection: "column", marginLeft: 2 }}
            >
              <Box sx={{ marginTop: 2 }}>
                <MarkDown text={content!.title} />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: 1,
                  marginTop: -1,
                  alignItems: "center",
                }}
              >
                {content!.tags.length ? (
                  content!.tags.map((tag) => (
                    <Chip
                      label={tag.name}
                      variant="outlined"
                      size="small"
                      key={tag.name + content!.id}
                    />
                  ))
                ) : (
                  <></>
                )}
              </Box>
              <Box>
                <MarkDown text={content!.body} />
              </Box>
            </Box>
            <Box>
              {content!.repo ? <RepoDisplay content={content!.repo} /> : <></>}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={1} />
        {content!.comments ?(
          <>
        <Grid item xs={1} />
          <Grid item xs={10}>
            <PostComments refreshParent={getPost} postID={content!.id} comments={content!.comments} />
          </Grid>
          <Grid item xs={1} />
        </>
        ):
        <></>
      }
      </Grid>
      </>
    );
  } catch (err) {
    console.error(err);
    return <></>;
  }
};

export default FullPost;
