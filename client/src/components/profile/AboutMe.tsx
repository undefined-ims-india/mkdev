import React, { ReactElement, useEffect, useState } from 'react';
import { UserProfile } from '../../../../types';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface UserInfoProps {
  profileData: UserProfile;
  UpdateUserInfo: (userInfo: UserProfile) => void;
  getProfile: () => void;
}

const AboutMe = ({ profileData }: UserInfoProps): ReactElement => {
  const [userInfo, setUserInfo]: [UserProfile | null, Function] =
    useState(profileData);

  useEffect(() => {
    if (profileData.aboutMe) {
      setUserInfo({ ...userInfo, aboutMe: profileData.aboutMe });
    }
  }, []);

  return (
    <Card sx={{ maxWidth: 600, m: 2 }}>
      <CardContent>
        {profileData.aboutMe.length > 0 ? (
          <Typography variant='body1' paragraph>
            {profileData.aboutMe}
          </Typography>
        ) : (
          <Typography variant='body1' paragraph>
            'Nothing, yet...'
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default AboutMe;
