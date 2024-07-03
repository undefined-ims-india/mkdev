import React, { ReactElement, useEffect, useState, useContext } from 'react';
import { UserProfile } from '../../../../types';
import { UserContext } from '../UserContext';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  Input,
  InputLabel,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

interface UserInfoProps {
  profileData: UserProfile;
  UpdateUserInfo: (userInfo: UserProfile) => void;
  getProfile: () => void;
}

const AboutMe = ({
  profileData,
  UpdateUserInfo,
}: UserInfoProps): ReactElement => {
  const userId = useContext(UserContext);
  const owner = userId === profileData.id;
  const [userInfo, setUserInfo]: [UserProfile | null, Function] =
    useState(profileData);
  const [edit, setEdit] = useState(false);
  const [editAboutMe, setEditAboutMe] = useState<string | null>(
    profileData.aboutMe
  );

  const toggleEditMode = () => {
    setEdit(!edit);
  };

  const saveAboutMe = () => {
    UpdateUserInfo({ ...profileData, aboutMe: editAboutMe } as UserProfile);
    setEditAboutMe(profileData.aboutMe);
    toggleEditMode();
  };

  useEffect(() => {
    if (profileData.aboutMe) {
      setUserInfo({ ...userInfo, aboutMe: profileData.aboutMe });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'aboutMe') {
      setEditAboutMe(value);
    } else {
      setUserInfo({ ...userInfo, [name]: value });
    }
  };

  return (
    <Card sx={{ maxWidth: 600, m: 2 }}>
      <CardContent>
        {owner && edit ? (
          <FormControl sx={{ p: 2, my: 1, mx: 1, width: '100%' }}>
            <InputLabel htmlFor='aboutMe'>About Me</InputLabel>
            <Input
              id='aboutMe'
              name='aboutMe'
              multiline
              minRows={5}
              placeholder='Tell everyone about yourself!'
              value={profileData.aboutMe || ''}
              onChange={handleChange}
              fullWidth
            />
          </FormControl>
        ) : (
          <Typography variant='body1' paragraph>
            {profileData.aboutMe || 'No information provided.'}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        {owner && edit ? (
          <Button onClick={saveAboutMe} variant='contained' color='primary'>
            Save
          </Button>
        ) : (
          <Button onClick={toggleEditMode}>
            <EditIcon />
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default AboutMe;
