import React, { ReactElement, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UserProfile } from '../../../types';
import axios from 'axios';

const Follow = (): ReactElement => {
  const { id } = useParams<{ id: string }>();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    axios.get(`/api/follows/${id}`).then(({ data }) => {
      setUserProfile(data);
      setIsFollowing(data.followedBy.includes(id));
    });

    axios.get(`/api/users/${id}/followers/count`).then(({ data }) => {
      setUserProfile((prevState) =>
        prevState ? { ...prevState, follower_count: data.count } : null
      );
    });
  }, [id]);

  const follow = () => {
    axios.post(`/api/follows/follow`).then(() => {
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
      {!userProfile ? (
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
