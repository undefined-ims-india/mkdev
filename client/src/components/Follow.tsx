import React, { ReactElement, useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {UserContext} from './UserContext'
import axios from 'axios';

const Follow = (): ReactElement => {
  const userId = useContext(UserContext);
  const { id } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    axios.get(`/api/follows/isFollowing/${userId}/${id}`).then(({data}) => {
      console.log('following', data)
      setIsFollowing(data.isFollowing);
    });
  }, [userId, id]);;

  const follow = () => {
    axios
      .post(`/api/follows/follow/${id}`)
      .then((): void => {
        setIsFollowing(true);
      })
      .catch((err) => console.error(err));
  };

  const unfollow = () => {
    axios
      .delete(`/api/follows/unfollow/${id}`)
      .then((): void => {
        setIsFollowing(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
    {isFollowing ? (
      <button onClick={unfollow}>Unfollow</button>
    ) : (
      <button onClick={follow}>Follow</button>
    )}
  </div>
  );
};

export default Follow;
