import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { UserProfile } from '../../../types';

const Following = (): React.ReactElement => {
  const { id } = useParams();
  const [followingData, setFollowingData]: [UserProfile[] | null, Function] =
    useState<UserProfile[] | null>(null);

  useEffect(() => {
    axios.get(`/api/follows/following/${id}`).then(({ data }) => {
      setFollowingData(data);
    });
  }, [id]);

  return (
    <div>
      <h3>Following</h3>
      {followingData && followingData.length === 0 ? (
        <p>Not Currently Following Any Developers</p>
      ) : (
        <ul>
          {followingData &&
            followingData.map((following) => (
              <li key={following.id}>{following.name}</li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Following;
