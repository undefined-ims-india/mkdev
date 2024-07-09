import React from 'react'
import { Link } from 'react-router-dom'
import { SimpleUser } from '../../../../../types'
import Avatar from '@mui/material/Avatar';

export default ({user}: {user : SimpleUser}) => (
  <Link to={`/user/${user.id}/profile`} style={{textDecoration: 'none'}}>
      <Avatar
        alt={user.username! || user.name}
        src={user.picture!}
        sx={{
          width: '2.5vw', height: '2.5vw',
          minWidth: 40, minHeight: 40
        }}
      >
        {user.username![0] || user.name[0] || '?'}
      </Avatar>
    </Link>
)