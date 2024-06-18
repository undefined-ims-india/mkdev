import React, { ReactElement } from 'react';
import axios from 'axios';

const Logout = (): ReactElement => {
  React.useEffect(() => {
    axios
      .post('/logout')
      .then(({ data }) => {
        console.log(data);
        if (!data.ok) {
          console.log('Logout failed');
        }
        window.location.href = '/login';
      })
      .catch((err) => console.error('Logout failed:', err));
  }, []);

  return (
    <>
      <h2>You have successfully logged out!</h2>
    </>
  );
};

export default Logout;
