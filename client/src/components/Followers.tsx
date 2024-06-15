import React, { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserProfile } from '../../../types';
import axios from 'axios';

const Followers = (): ReactElement => {
  const { id } = useParams<{ id: string }>();
  const [followerData, setFollowerData] = useState<UserProfile[] | null>(null);

  useEffect(() => {
    axios
      .get(`/api/follows/followers/${id}`)
      .then(({ data }): void => {
        setFollowerData(data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div>
      <h3>Followers</h3>
      {followerData && followerData.length === 0 ? (
        <p>Developer Currently Has No Followers</p>
      ) : (
        <ul>
          {followerData &&
            followerData.map((follower) => (
              <li key={follower.id}>{follower.name}</li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Followers;
