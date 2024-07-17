import React, { useContext } from "react";
import axios from "axios";
import { UserContext } from "../../UserContext";

import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default ({postID, liked, numLikes, refreshParent} : {postID: number, liked: boolean | undefined, numLikes: number, refreshParent : Function}) => {

  const user = useContext(UserContext);

  const handleLike = () => {
    axios.patch(`/api/posts/${postID}/${liked ? 'dislike' : 'like'}`)
      .then(() => {refreshParent()})
  };

  return (
    <Box sx={{display: "flex", flexDirection: "row", alignItems: 'center'}}>
      <IconButton aria-label='Like' onClick={handleLike} disabled={!user.id}>
        {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
      <Typography variant="body1">{numLikes}</Typography>
    </Box>
  )
}