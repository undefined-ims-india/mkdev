import path from 'path';
import dotEnv from 'dotenv';
dotEnv.config();
import express from 'express';
import { auth } from 'express-openid-connect';
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, PORT = 3000 } = process.env;

import routes from './routes';

const CLIENT = path.resolve(__dirname, '..', 'dist');

const app = express();

app.use(express.json());
app.use(express.static(CLIENT));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(CLIENT));
app.use('/api', routes);

app.get('*', (req, res) => {
  res.sendFile(path.join(CLIENT, 'index.html'));
});

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: `http://localhost:${PORT}`,
  clientID: GOOGLE_CLIENT_ID,
  secret: GOOGLE_CLIENT_SECRET,
  issuerBaseURL: 'https://dev-uatvgw7p2cq7mmm0.us.auth0.com',
};

app.use(auth(config));

app.use((req, res) => {
  res.locals.user = req.oidc.user;
});

app.listen(PORT, () => {
  console.info(`\nhttp://localhost:${PORT}\nhttp://127.0.0.1:${PORT}`);
});
