import { Router } from 'express';
import { requiresAuth } from 'express-openid-connect';

const auth = Router();

auth.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated());
});

auth.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user, null, 2));
});

export default auth;
