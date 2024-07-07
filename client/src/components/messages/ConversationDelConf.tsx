import React, { ReactElement } from 'react';
import axios from 'axios';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Conversations } from '@prisma/client';

interface PropsType {
  con: Conversations;
  hidden: boolean;
  setCons: () => void;
  deleteCon: () => void;
  handleClose: () => void;
}

const ConversationDelConf: React.FC<PropsType> =
  ({
    con,
    hidden,
    setCons,
    deleteCon,
    handleClose }): ReactElement => {

  const deleteConversation = () => {
    axios
      .delete(`/api/conversations/${con.id}`)
      .then(() => { deleteCon(); })
      .then(() => { setCons(); })
      .catch((err) => {
        console.error('Failed to delete conversation', err);
      });
  }

  return (
      <Dialog
        open={ hidden }
        onClose={ handleClose }
        aria-labelledby='delete-confirmation-title'
        aria-describedby='delete-confirmation-description'
      >
        <DialogTitle id='delete-confirmation-title'>
          { 'Are you sure?' }
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='delete-confirmation-description'>
            This will delete this conversation permanently and cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={ handleClose }>
            Cancel
          </Button>
          <Button variant='contained' color='error' onClick={ deleteConversation }>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
  )
}

export default ConversationDelConf;