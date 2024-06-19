import React, { ReactElement, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Follow = (): ReactElement => {
  const { id } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    axios.get(`/api/follows/isFollowing/${id}`).then(({ data }) => {
      setIsFollowing(data.isFollowing);
    }).catch;
  }, []);

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
