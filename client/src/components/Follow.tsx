import React, { ReactElement, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TabPanel from '@mui/lab/TabPanel';

interface User {
  followers: any;
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  linkedinId: string;
  githubId: string;
  devId: string;
  username: string;
  picture: string;
  followedBy: User[];
  following: User[];
}
interface UserProps {
  id: number;
  user: User;
  userId: number;
  following: User[];
  select: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    followedId: number
  ) => void;
}

const Follow = ({ userId, select }: UserProps): ReactElement => {
  let { id } = useParams();
  const [user, setUser] = useState<User>({} as User);
  const [following, setFollowing] = useState<User[]>([]);
  const [followedBy, setFollowedBy] = useState<User[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);

  const selectFollow = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    followedId: number
  ): void => {
    select(e, followedId);
  };

  const follow = (followedId: number) => {
    axios
      .post('/api/follows/follow', {
        followerId: user?.id,
        followedId: followedId,
      })
      .then(({ data }) => {
        setIsFollowing(true);
        setFollowing((prevList) => [...prevList, data.followedUser]);
      })
      .catch((err) => console.error('Failed to Follow user:', err));
  };

  useEffect(() => {
    // Get follower List
    axios
      .get(`/api/follows/followers/${user?.id}`)
      .then(({ data }) => {
        console.log(data);
        setFollowedBy(data);
      })
      .catch((err) => console.error('Could not get list of Followers:', err));

    // Get following List
    axios
      .get(`/api/follows/following/${user?.id}`)
      .then(({ data }) => setFollowing(data.following))
      .catch((err) => console.error('Could not get list of Following:', err));
  }, [user?.id]);

  return (
    <>
      <TabPanel value='3'>
        {user.followers.length > 0 ? (
          <Follow
            following={user.followers}
            id={user.id}
            user={user}
            userId={user.id}
            select={selectFollow}
          />
        ) : (
          <p>No followers</p>
        )}
      </TabPanel>

      <TabPanel value='4'>
        {user.following.length > 0 ? (
          <div>
            <h2>Followers</h2>
            {followedBy.map((follower) => (
              <div key={follower.id}>
                <h3>{follower.name}</h3>
                <p>{follower.picture}</p>
                <Button
                  onClick={(e) => {
                    selectFollow(e, follower.id);
                  }}
                >
                  Follow
                </Button>
              </div>
            ))}

            <h2>Following</h2>
            {following.map((followedUser) => (
              <div key={followedUser.id}>
                <h3>{followedUser.name}</h3>
                <p>{followedUser.picture}</p>
                <Button
                  onClick={(e) => {
                    selectFollow(e, followedUser.id);
                  }}
                >
                  Unfollow
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p>Not following anyone</p>
        )}
      </TabPanel>
    </>
  );
};

export default Follow;
