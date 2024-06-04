import { Router } from 'express';
import { requiresAuth } from 'express-openid-connect';

const auth = Router();

auth.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated());
  // res.render('index', {
  //   title: 'Auth0',
  //   isAuthenticated: req.oidc.isAuthenticated(),
  // });
});

auth.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user, null, 2));
  // res.render('profile', {
  //   userProfile: JSON.stringify(req.oidc.user, null, 2),
  //   title: 'Profile page',
  // });
});

export default auth;
