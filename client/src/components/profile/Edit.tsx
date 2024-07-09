import React, { useContext } from 'react';
import { UserContext } from '../UserContext';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Follow from './Follow';

interface EditProps {
  profileData: any;
  handleEdit: () => void;
}

const EditOrFollow = ({
  profileData,
  handleEdit,
}: EditProps): React.ReactElement => {
  const { userId } = useContext(UserContext);
  return (
    <>
      {userId === profileData!.id ? (
        <IconButton aria-label='edit' onClick={handleEdit} sx={{ mt: -1 }}>
          <EditIcon />
        </IconButton>
      ) : (
        <Follow />
      )}
    </>
  );
};

export default EditOrFollow;
