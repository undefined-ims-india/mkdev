import React, {useState} from "react";
import axios from 'axios';
import { Comment } from "../../../../../types";
import PostUserInfo from "./PostUserInfo";
import MarkDown from "../MarkDown";

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';

export default ({comment} : {comment: Comment}) => {
  return (
    <Card sx={{marginY: 2, padding: 2}}>
      <Grid container>
        <Grid item xs={12}>
          <PostUserInfo createdAt={comment.createdAt} author={comment.author}/>
        </Grid>
        <Grid item xs={0} md={1}/>
        <Grid xs={12} md={10}>
          <MarkDown text={comment.body}/>
        </Grid>
        <Grid item xs={0} md={1}/>
      </Grid>
    </Card>
  )
}