import React from "react";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
import { Comment } from "../../../../../types";
import AvatarLink from './AvatarLink'
import MarkDown from "../MarkDown";
import LikeButton from './LikeButton'

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'

export default ({comment, refreshParent} : {comment: Comment, refreshParent: Function}) => {
  if (window.screen.availWidth > 425) {
    return (
      <Grid container spacing={2} sx={{marginY: 2}}>
        <Grid item xs={1} sx={{display: 'flex', justifyContent: 'end'}}>
          <AvatarLink user={comment.author} />
        </Grid>
        <Grid item xs={10}>
          <Card sx={{padding: 2}}>
            <Grid container>
              <Grid item xs={3}>
                <Typography variant="body1" color={'silver'}>{comment.author.username}</Typography>
              </Grid>
              <Grid item xs={6}/>
              <Grid item xs={3} sx={{display: 'flex', justifyContent: 'end'}}>
              <Typography variant="body2" color='silver'>{dayjs(comment.createdAt).fromNow()}</Typography>
              </Grid>
              <Grid item xs={12}>
                <MarkDown text={comment.body} />
              </Grid>
              <Grid item xs={11}/>
              <Grid item xs={1} sx={{display: 'flex', justifyContent: 'end'}}>
                <LikeButton postID={comment.id} liked={comment.likedByUser} numLikes={comment.liked.length} refreshParent={refreshParent}/>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={1}/>
      </Grid>
    )
  }
  else {
    return (
      <Card sx={{padding: 2, margin: 2}}>
        <Grid container>
          <Grid item xs={3}>
            <AvatarLink user={comment.author}/>
          </Grid>
          <Grid item xs={3} sx={{display: 'flex', alignItems: 'center'}}>
            <Typography variant="body1" color={'silver'}>{comment.author.username}</Typography>
          </Grid>
          <Grid item xs={2}/>
          <Grid item xs={4} sx={{display: 'flex', justifyContent: 'end', alignItems: 'center'}}>
            <Typography variant="body2" color='silver'>{dayjs(comment.createdAt).fromNow()}</Typography>
          </Grid>
          <Grid item xs={12} sx={{marginTop: 1}}>
            <MarkDown text={comment.body} />
          </Grid>
          <Grid item xs={11}/>
          <Grid item xs={1} sx={{display: 'flex', justifyContent: 'end'}}>
            <LikeButton postID={comment.id} liked={comment.likedByUser} numLikes={comment.liked.length} refreshParent={refreshParent}/>
          </Grid>
        </Grid>
      </Card>
    )
  }
}