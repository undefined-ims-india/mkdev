import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { UserProfile } from '../../../types';

const Following = (): React.ReactElement => {
  const { id } = useParams();
  const [followingData, setFollowingData]: [UserProfile[] | null, Function] =
    useState<UserProfile[] | null>(null);
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(() => {
    axios.get(`/api/follows/following/${id}`).then(({ data }) => {
      console.log('following', data);
      setFollowingData(data);
    });
    axios.get(`/api/follows/count/${id}`).then(({ data }) => {
      setFollowingCount(data.following_count);
    });
  }, [id]);

  return (
    <div>
      <h3>Following</h3>
      <p>
        {followingData
          ? `Number of followers: ${followingData.length}`
          : 'Loading...'}
      </p>
      <ul>
        {followingData &&
          followingData.map((following) => (
            <div key={following.id}>{following.name}</div>
          ))}
      </ul>
    </div>
  );
};

export default Following;
