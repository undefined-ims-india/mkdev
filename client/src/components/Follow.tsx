import React, { ReactElement, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UserProfile } from '../../../types';
import axios from 'axios';

const Follow = (): ReactElement => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    axios.get(`/api/follows/isFollowing/${user?.id}/${id}`).then(() => {
      if (isFollowing) {
        setIsFollowing(true);
      } else {
        setIsFollowing(false);
      }
    });
  }, [id, user]);

  const follow = () => {
    axios.post(`/api/follows/follow/${user?.id}/${id}`).then(() => {
      setIsFollowing(true);
    });
  };

  const unfollow = () => {
    axios.delete(`/api/follows/unfollow/${user?.id}/${id}`).then(() => {
      setIsFollowing(false);
    });
  };

  return (
    <div>
      <>
        <button onClick={isFollowing ? unfollow : follow}>
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
      </>
    </div>
  );
};

export default Follow;
