import { Router } from 'express';
import { requiresAuth } from 'express-openid-connect';

const auth = Router();

// auth.get('/', (req, res) => {
//   res.render('index', {
//     title: 'Auth0 Webapp sample Nodejs',
//     isAuthenticated: req.oidc.isAuthenticated(),
//   });
// });

// req.isAuthenticated is provided from the auth router
auth.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

auth.get('/profile', requiresAuth(), (req, res) => {
  res.render('profile', {
    userProfile: JSON.stringify(req.oidc.user, null, 2),
    title: 'Profile page',
  });
});

export default auth;
