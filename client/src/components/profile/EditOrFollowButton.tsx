import React, { useContext } from 'react';
import { UserContext } from '../UserContext';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Follow from './Follow';

interface EditProps {
  profileData: any;
  handleEdit: () => void;
}

const EditOrFollowButton = ({
  profileData,
  handleEdit,
}: EditProps): React.ReactElement => {
  const { id } = useContext(UserContext);
  return (
    <>
      {id === profileData!.id ? (
        <IconButton aria-label='edit' onClick={handleEdit} sx={{ mt: -1 }}>
          <EditIcon />
        </IconButton>
      ) : (
        <Follow />
      )}
    </>
  );
};

export default EditOrFollowButton;
