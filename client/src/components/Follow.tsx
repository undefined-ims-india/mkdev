import React, { ReactElement, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UserProfile } from '../../../types';
import axios from 'axios';

const Follow = (): ReactElement => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    axios.get(`/api/follows/${id}`).then(({ data }) => {
      setUser(data);
      setIsFollowing(data.followedBy.includes(id));
    });
  }, [id]);

  const follow = () => {
    axios
      .post(`/api/follows/follow`, {
        id: user,
        followingId: id,
      })
      .then(() => {
        setIsFollowing(true);
      });
  };

  const unfollow = () => {
    axios.delete(`/api/follows/unfollow`).then(() => {
      setIsFollowing(false);
    });
  };

  return (
    <div>
      {!user ? (
        <div>Loading...</div>
      ) : (
        <>
          <button onClick={isFollowing ? unfollow : follow}>
            {isFollowing ? 'Unfollow' : 'Follow'}
          </button>
        </>
      )}
    </div>
  );
};

export default Follow;
