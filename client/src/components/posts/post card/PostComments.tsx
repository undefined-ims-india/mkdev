import React, {useState, useContext} from 'react';
import { Comment } from '../../../../../types';
import axios from 'axios';
import { UserContext } from '../../UserContext';
import CommentCard from './CommentCard';

import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';

export default ({comments, refreshParent, postID}:{comments: Comment[], refreshParent: Function, postID: number}) => {

  const user = useContext(UserContext);
  const [body, setBody] = useState('');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    switch (e.target.name) {
      case ('commentBody'): setBody(e.target.value);
    }
  }

  const postComment = () => {
    axios.put(`/api/posts/${postID}/comment`, {body})
      .then(() => refreshParent())
  }

  return (
    <Grid spacing={0} container className="glass-card bottom-curve">
      {
        user.id ? (
          <>
          <Grid item xs={12} sx={{padding: 2}}>
            <Card sx={{display: 'flex', flexDirection: 'row', justifyContent:'center', alignItems: 'center', flexGrow: 1, paddingX: 2, paddingY: 1}}>
              <Grid container spacing={1} >
                <Grid item xs={1} sx={{display: 'flex', justifyContent:'center', alignItems: 'center'}}>
                  <Avatar
                  src={user.picture}
                  sx={{
                    width: '2.3vw', height: '2.3vw',
                    minWidth: 30, minHeight: 30
                  }}
                  />
                </Grid>
                <Grid item xs={11} md={10} sx={{display: 'flex', justifyContent:'center', alignItems: 'center', paddingRight: '1vw'}}>
                  <TextField
                    onChange={handleInput}
                    name="commentBody"
                    value={body}
                    variant="outlined"
                    size="small"
                    label="Comment"
                    placeholder='Add A Comment'
                    fullWidth
                  />
                </Grid>
                <Grid item md={1} xs={12} sx={{display: 'flex', justifyContent:'end', alignItems: 'center'}}>
                  <Button
                    onClick={postComment}
                    variant="contained"
                    size="small"
                    >
                    <SendIcon />
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Divider variant='middle' sx={{flexGrow: 1}} />
          </>
        ) :
        <></>
      }
      {
        comments.length ?
        <Grid item xs={12}>
          {comments.slice(0, 2).map((comment, index) => (<CommentCard comment={comment} refreshParent={refreshParent} key={comment.body.slice(20) + index}/> ))}
        </Grid>
        :
        <></>
      }
    </Grid>
  )
}