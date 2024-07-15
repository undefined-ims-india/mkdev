import React, { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';

interface State extends SnackbarOrigin {
  open: boolean;
}

const Logout = (): ReactElement => {
  const navigate = useNavigate();
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

  useEffect(() => {
    axios
      .post('/auth/logout')
      .then(() => {
        setState({ ...state, open: true });
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (open) {
      timer = setTimeout(() => {
        setState({ ...state, open: false });
        navigate('/');
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [open, navigate]);

  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        message='You have been successfully logged out. Redirecting to home page.'
        key={vertical + horizontal}
      />
    </Box>
  );
};

export default Logout;
