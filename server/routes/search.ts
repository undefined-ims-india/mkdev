import { Router, Response, Request } from 'express';

const search = Router();

search.get('/', (req: Request, res: Response) => {
  res.status(200).send('you rang!');
});

module.exports = search;
