import React, {useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';

export default ({id, refreshParent}: {id: number, refreshParent: Function}) => {

  const [anchorEl, setAnchor] = useState<null | HTMLElement>(null)
  const open = !!anchorEl;
  const navigate = useNavigate();

  const openMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(e.currentTarget);
  }
  const closeMenu = () => {
    setAnchor(null);
  }

  const deletePost = async () => {
    await axios.delete(`/api/posts/${id}`);
    refreshParent();
  }

  return (
    <>
      <IconButton onClick={openMenu}>
        <MoreVertIcon/>
      </IconButton>
      <Menu
      open={open}
      anchorEl={anchorEl}
      onClose={closeMenu}
      >
        <MenuItem sx={{textDecoration: 'none'}} onClick={() => {navigate(`/post/${id}/edit`)}}>
          <EditIcon/>
          <Typography variant="body1"> Edit</Typography>
        </MenuItem>
        <MenuItem onClick={deletePost}>
          <DeleteForeverIcon/>
          <Typography variant="body1"> Delete</Typography>
        </MenuItem>
      </Menu>
    </>
  )
}