import React, { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserProfileType } from '../../../types';
import axios from 'axios';

const Followers = (): ReactElement => {
  const { id } = useParams();
  const [followerData, setFollowerData] = useState<UserProfileType[] | null>(
    null
  );

  useEffect(() => {
    axios
      .get(`/api/follows/followers/${id}`)
      .then(({ data }) => {
        console.log(data);
        setFollowerData(data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div>
      <h3>Followers</h3>
      <ul>
        {followerData &&
          followerData.map((follower) => (
            <li key={follower.id}>{follower.name}</li>
          ))}
      </ul>
    </div>
  );
};

export default Followers;
