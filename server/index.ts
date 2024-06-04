// const path = require('path');
import path from 'path';
require('dotenv').config();
import express, { Request, Response } from 'express';
import { auth } from 'express-openid-connect';
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, PORT = 3000 } = process.env;

import route from './routes';

const CLIENT = path.resolve(__dirname, '..', 'dist');

const app = express();

app.use(express.json());
app.use(express.static(CLIENT));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(CLIENT));
app.use('/api', route);

// app.get('*', (req: Request, res: Response) => {
//   res.sendFile(path.join(CLIENT, 'index.html'));
// });

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: `http://localhost:${PORT}`,
  clientID: GOOGLE_CLIENT_ID,
  secret: GOOGLE_CLIENT_SECRET,
  issuerBaseURL: 'https://dev-uatvgw7p2cq7mmm0.us.auth0.com',
};

app.use(auth(config));

app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated());
});

app.listen(PORT, () => {
  console.info(`\nhttp://localhost:${PORT}\nhttp://127.0.0.1:${PORT}`);
});
