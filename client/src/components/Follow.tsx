import React, { ReactElement, useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from './UserContext';
import axios from 'axios';
import Button from '@mui/material/Button';

const Follow = (): ReactElement => {
  const userId = useContext(UserContext);
  const { id } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    axios.get(`/api/follows/isFollowing/${id}`).then(({ data }) => {
      setIsFollowing(data.isFollowing);
    });
  }, []);

  const follow = () => {
    axios.post(`/api/follows/follow/${id}`).then((): void => {
      if (userId === Number(id)) {
        return;
      }
      setIsFollowing(true);
    });
  };

  const unfollow = () => {
    axios.delete(`/api/follows/unfollow/${id}`).then((): void => {
      if (userId === Number(id)) {
        return;
      }
      setIsFollowing(false);
    });
  };

  return (
    <>
      {isFollowing ? (
        <Button
          size='small'
          variant='outlined'
          color='error'
          onClick={unfollow}
        >
          Unfollow
        </Button>
      ) : (
        <Button
          size='small'
          variant='contained'
          color='success'
          onClick={follow}
        >
          Follow
        </Button>
      )}
    </>
  );
};

export default Follow;
