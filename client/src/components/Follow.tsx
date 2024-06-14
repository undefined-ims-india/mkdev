import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface FollowButtonProps {
  currentUserId: number;
  userIdToFollow: number;
}

const FollowButton: React.FC<FollowButtonProps> = ({
  currentUserId,
  userIdToFollow,
}) => {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    // Check if the current user is following the other user when the component mounts
    axios
      .get(`/follows/${currentUserId}/isFollowing/${userIdToFollow}`)
      .then((response) => setIsFollowing(response.data.isFollowing))
      .catch((error) => console.error('Error:', error));
  }, [currentUserId, userIdToFollow]);

  const follow = () => {
    axios
      .post('/follow', {
        followerId: currentUserId,
        followedId: userIdToFollow,
      })
      .then(() => setIsFollowing(true))
      .catch((error) => console.error('Error:', error));
  };

  const unfollow = () => {
    axios
      .delete(`/follows/${currentUserId}/unfollow/${userIdToFollow}`)
      .then(() => setIsFollowing(false))
      .catch((error) => console.error('Error:', error));
  };

  return (
    <button onClick={isFollowing ? unfollow : follow}>
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
};

export default FollowButton;
