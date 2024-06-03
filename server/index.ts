require('dotenv').config();
const path = require('path');
const express = require('express');

const { auth, requiresAuth } = require('express-openid-connect');
const CLIENT = path.resolve(__dirname, 'client/index.html');
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, PORT = 3000 } = process.env;

const app = express();

app.use(express.static(CLIENT));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated()); // * Returns 'false' at the moment
});

app.use((req, res) => {
  res.locals.user = req.oidc.user;
});

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user, null, 2));
});
/*** AUTH ***/

app.listen(PORT, () => {
  console.info(`http://localhost:${PORT} \n\n http://127.0.0.1:${PORT}`);
});
