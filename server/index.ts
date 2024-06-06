import path from 'path';
import dotEnv from 'dotenv';
import express, { Request, Response } from 'express';
import { auth } from 'express-openid-connect';
import routes from './routes';

const { CLIENT_ID, SECRET, PORT = 3000 } = process.env;

dotEnv.config();
const CLIENT = path.resolve(__dirname, '..', 'dist');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(CLIENT));

/*** AUTH ***/
const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: `http://localhost:${PORT}`,
  clientID: CLIENT_ID,
  secret: SECRET,
  issuerBaseURL: 'https://dev-uatvgw7p2cq7mmm0.us.auth0.com',
};

app.use(auth(config));

app.use((req: Request, res: Response) => {
  res.locals.user = req.oidc.user;
});

app.use('/api', routes);

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(CLIENT, 'index.html'));
});

app.listen(PORT, () => {
  console.info(`\nhttp://localhost:${PORT}\nhttp://127.0.0.1:${PORT}`);
});
