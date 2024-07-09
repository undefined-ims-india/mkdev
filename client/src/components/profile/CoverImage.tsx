import React, { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserProfile } from '../../../../types';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import CardMedia from '@mui/material/CardMedia';
import axios from 'axios';

interface UserInfoProps {
  profileData: UserProfile;
}

const CoverImage = ({ profileData }: UserInfoProps): ReactElement => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [userInfo, setUserInfo]: [UserProfile | null, Function] =
    useState(profileData);
  const [coverImage, setCoverImage] = useState('');

  const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files![0]);
      const imageUrl = URL.createObjectURL(e.target.files![0]);
      UpdateCoverImage({ ...profileData, coverImage: imageUrl });
    }
  };

  const handleCancel = () => {
    navigate(0);
  };

  const UpdateCoverImage = (userInfo: UserProfile) => {
    axios
      .patch(`/api/users/${userInfo.id}`, userInfo)
      .then(({ data }): void => {
        setUserInfo(data);
      })
      .catch((err) => console.error(err));
    setUserInfo(userInfo);
  };

  return (
    <Box component='form' onSubmit={handleUpdate}>
      {coverImage && (
        <CardMedia component='img' image={profileData.coverImage} alt='' />
      )}
      <InputLabel htmlFor='coverImage'>Upload Cover Image</InputLabel>
      <Input id='coverImage' type='file' onChange={handleFileChange} />
      <Button type='submit'>Update</Button>
      <Button onClick={handleCancel}>Cancel</Button>
    </Box>
  );
};

export default CoverImage;
