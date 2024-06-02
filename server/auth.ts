const dotenv = require('dotenv');
require('express, Router, app, path, PORT');
// require('Router');
// require('app');
// require('path');
// require('PORT');
const { auth, requiresAuth } = require('express-openid-connect');
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

dotenv.load();

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: `http://localhost:${PORT}`,
};

const port = process.env.PORT || 3000;
if (
  !config.baseURL &&
  !process.env.BASE_URL &&
  process.env.PORT &&
  process.env.NODE_ENV !== 'production'
) {
  config.baseURL = `http://localhost:${PORT}`;
}

app.use(auth(config));

Router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Auth0 Webapp sample Nodejs',
    isAuthenticated: req.oidc.isAuthenticated(),
  });
});

Router.get('/profile', requiresAuth(), function (req, res, next) {
  res.render('profile', {
    userProfile: JSON.stringify(req.oidc.user, null, 2),
    title: 'Profile page',
  });
});

// Middleware to make the `user` object available for all views
app.use(function (req, res, next) {
  res.locals.user = req.oidc.user;
  next();
});
