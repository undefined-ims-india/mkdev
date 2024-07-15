import React, { useState, useContext } from "react";
import { Tags } from "@prisma/client";
import { useLocation } from "react-router-dom";
import { PostWithRelations, RepoWithFiles, SimpleUser, Comment } from "../../../../../types";
import { UserContext } from "../../UserContext";

import MarkDown from "../MarkDown";
import RepoDisplay from "./RepoDisplay";
import PostComments from '../post card/PostComments';
import PostUserInfo from '../post card/PostUserInfo'
import LikeButton from "../post card/LikeButton";
import ActionMenu from "../post card/ActionMenu";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Backdrop from '@mui/material/Backdrop'
import FullscreenIcon from '@mui/icons-material/Fullscreen';

const FullPost = ({content, imageLink, getPost} :
  {
    content:
    {
        createdAt: Date,
        title: string,
        body: string,
        tags: Tags[]
        repo: RepoWithFiles,
        author: SimpleUser,

        id: undefined | number,
        likedByUser: undefined | boolean,
        liked: undefined | {id: number}[],
        comments: undefined | Comment[]
      },
    imageLink: string,
    getPost?: Function
  }
  ): React.ReactElement => {

  const editMode = useLocation().pathname.includes('edit');
  const [open, setOpen] = useState(false);
  const userId = useContext(UserContext).id

  const openBackdrop = () => {
    setOpen(true);
  }

  const closeBackdrop = () => {
    setOpen(false);
  }

  try {
    return (
      <>
      {imageLink ? (
        <Backdrop open={open} onClick={closeBackdrop} sx={{zIndex: 10000}}>
          <img alt="cover image" src={imageLink} />
        </Backdrop>
      ) :
      <></>
      }
      <Grid container spacing={0} paddingTop={'5vh'}>
        <Grid item xs={1} />
        <Grid item xs={10}>
            {imageLink ? (
              <Grid container sx={{height: '30vh'}} className="glass-card top-curve">
              <Grid item xs={1} md={2}/>
              <Grid item xs={10} md={8} sx={{display: 'flex', justifyContent: 'center', height: '30vh'}}>
                {imageLink ? <img alt="cover image" src={imageLink} /> : <></>}
                <IconButton sx={{justifySelf: 'end', alignSelf: 'end'}} onClick={openBackdrop}>
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
              <Box sx={{ display: 'flex', justifyContent: 'space-between', flexGrow: 1}}>
                <PostUserInfo author={content!.author} createdAt={content!.createdAt} />
                <Box>
                  {editMode ? <LikeButton postID={content!.id!} liked={content!.likedByUser} numLikes={content!.liked!.length} refreshParent={getPost!} /> : <></>}
                  {!editMode && userId === content.author.id ? <ActionMenu id={content.id!} refreshParent={getPost!}/> : <></>}
                </Box>
              </Box>
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
        {!editMode && content!.comments ?(
          <>
        <Grid item xs={1} />
          <Grid item xs={10}>
            <PostComments refreshParent={getPost!} postID={content!.id!} comments={content!.comments} />
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
