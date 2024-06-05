// const path = require('path');
import path from 'path';
import dotEnv from 'dotenv';
dotEnv.config({ path: '../.env' }); //???
import express, { Request, Response } from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

import routes from './routes';

const { PORT = 3000 } = process.env;

const CLIENT = path.resolve(__dirname, '..', 'dist');

const app = express();
const socket = express();
const server = createServer(socket);
const io = new Server(server, {
  connectionStateRecovery: {},
  cors: {
    origin: 'http://localhost:3000',
    methods:['GET','POST']
  }
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(CLIENT));
app.use('/api', routes);

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(CLIENT, 'index.html'));
});

// socket handling ----------------------------------------- //
io.on('connection', (socket) => {
  console.log('A user has connected');
});
// socket handling ----------------------------------------- //

// websocket server
io.listen(4000);

app.listen(PORT, () => {
  console.info(`\nhttp://localhost:${PORT}\nhttp://127.0.0.1:${PORT}`);
});

export default app;
