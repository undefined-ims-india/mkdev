import { Router } from 'express';

const messages = Router();

messages.get('/', (req, res) => {
  res.send('Reached messages GET route successfully');
});

export default messages;