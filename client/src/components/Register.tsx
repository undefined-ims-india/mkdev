import React, { ReactElement, useState } from 'react';
import axios from 'axios';

import Container from '@mui/material/Container';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Register = (): ReactElement => {
  const [username, setUsername] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const userInfo = { username, firstName, lastName, email, password };
    axios
      .post('/api/users/', userInfo)
      .then(({ data }) => {
        setUsername(username);
        setFirstName(firstName);
        setLastName(lastName);
        setEmail(email);
        setPassword(password);
      })
      .catch((err) => console.error(err));
  };
  return (
    <Container maxWidth='sm'>
      <Box
        className='glass-card'
        component='form'
        onSubmit={handleSubmit}
        noValidate
        autoComplete='off'
        sx={{ '& .MuiInput-root': { margin: 4 } }}
      >
        <Typography variant='h4' component='h1' gutterBottom align='center'>
          Sign Up
        </Typography>
        <Input
          type='text'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder='First Name'
        />
        <Input
          type='text'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder='Last Name'
        />
        <Input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Username'
        />
        <Input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
        />
        <Input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
        />
        <Box>
          <Box display='flex' justifyContent='space-between'>
            <Button onClick={() => (window.location.href = '/login')}>
              Cancel
            </Button>
            <Button type='submit'>Register</Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
