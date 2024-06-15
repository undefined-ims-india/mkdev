import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { UserProfile } from '../../../types';

const Following = (): React.ReactElement => {
  const { id } = useParams();
  let [followingData, setFollowingData]: [UserProfile[] | null, Function] =
    useState<UserProfile[] | null>(null);

  useEffect(() => {
    axios.get(`/api/follows/following${id}`).then(({ data }) => {
      console.log('following', data);
      setFollowingData(data);
    });
  }, [id]);

  return (
    <div>
      <h3>Following</h3>
      <ul>
        {followingData &&
          followingData.map((following) => (
            <li key={following.id}>{following.name}</li>
          ))}
      </ul>
    </div>
  );
};

export default Following;
