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

export default ({comments}:{comments: Comment[]}) => {

  const {userId, userImage} = useContext(UserContext);
  const [body, setBody] = useState('');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    switch (e.target.name) {
      case ('commentBody'): setBody(e.target.value);
    }
  }

  const postComment = () => {
    axios.put('/api/posts/:id/comment', {body})
  }

  return (
    <Grid spacing={0} container className="glass-card bottom-curve" sx={{paddingY: '1vh', paddingX: "1vw"}}>
      <Grid item xs={12} sx={{marginBottom: 2}}>
        <Card sx={{display: 'flex', flexDirection: 'row', justifyContent:'center', alignItems: 'center', flexGrow: 1, paddingX: 2, paddingY: 1}}>
          <Grid container spacing={1} >
            <Grid item xs={1} sx={{display: 'flex', justifyContent:'center', alignItems: 'center'}}>
              <Avatar
              src={userImage}
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
        <Divider />
      </Grid>
        {
          comments.length ?
          <Grid item xs={12} sx={{marginY: 1}}>
            {comments.slice(0, 2).map((comment, index) => (<CommentCard comment={comment} key={comment.body.slice(20) + index}/> ))}
          </Grid>
          :
          <></>
        }
    </Grid>
  )
}