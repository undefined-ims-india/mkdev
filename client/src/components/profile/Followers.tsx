import React, { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserProfile } from '../../../../types';
import axios from 'axios';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Box } from '@mui/material';

const Followers = (): ReactElement => {
  const { id } = useParams();
  const [followerData, setFollowerData] = useState<UserProfile[] | null>(null);

  useEffect(() => {
    axios
      .get(`/api/follows/followers/${id}`)
      .then(({ data }): void => setFollowerData(data))
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <Box>
      {followerData && followerData.length === 0 ? (
        <Typography variant='h1' component='h2' fontSize={'1rem'}>
          No Followers
        </Typography>
      ) : (
        <>
          <List>
            {followerData &&
              followerData.map((follower) => (
                <ListItem key={follower.id}>
                  <ListItemAvatar>
                    <Link href={`/user/${follower.id}/profile`}>
                      <Avatar
                        alt={follower.username || ''}
                        src={follower.picture || ''}
                      />
                    </Link>
                  </ListItemAvatar>
                  <ListItemText primary={follower.username} />
                </ListItem>
              ))}
          </List>
        </>
      )}
    </Box>
  );
};

export default Followers;
