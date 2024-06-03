require('dotenv').config();
const path = require('path');
const express = require('express');

const { auth, requiresAuth } = require('express-openid-connect');
const CLIENT = path.resolve(__dirname, 'client/index.html');
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, PORT = 3000 } = process.env;
// const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL, PORT, NODE_ENV } = process.env;
console.log(GOOGLE_CLIENT_SECRET);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(CLIENT));
app.use(express.json());

/*** AUTH ***/
const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: `http://localhost:${PORT}`,
  clientID: GOOGLE_CLIENT_ID,
  secret: GOOGLE_CLIENT_SECRET,
  issuerBaseURL: `https://dev-uatvgw7p2cq7mmm0.us.auth0.com`,
};

app.use(auth(config));

app.get('/', (req: any, res: any) => {
  res.send(req.oidc.isAuthenticated()); // * Returns 'false'
  // res.render('index', {
  //   title: '0Auth',
  //   isAuthenticated: req.oidc.isAuthenticated(),
  // });
});

app.use((req: any, res: any) => {
  res.locals.user = req.oidc.user;
});

app.get('/profile', requiresAuth(), (req: any, res: any) => {
  res.send(JSON.stringify(req.oidc.user, null, 2));
  // res.render('profile', {
  //   userProfile: JSON.stringify(req.oidc.user, null, 2),
  //   title: 'Profile page',
  // });
});

app.listen(PORT, () => {
  console.info(`http://localhost:${PORT} \n\n http://127.0.0.1:${PORT}`);
});
