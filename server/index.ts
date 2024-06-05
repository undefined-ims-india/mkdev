// const path = require('path');
import path from 'path';
import dotEnv from 'dotenv';
dotEnv.config({ path: '../.env' }); //???
import express, { Request, Response } from 'express';

import routes from './routes';

const { PORT = 3000 } = process.env;

const CLIENT = path.resolve(__dirname, '..', 'dist');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(CLIENT));
app.use('/api', routes);

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(CLIENT, 'index.html'));
});

app.listen(PORT, () => {
  console.info(`\nhttp://localhost:${PORT}\nhttp://127.0.0.1:${PORT}`);
});
