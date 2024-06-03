const express = require('express');
const messageRoutes = express.Router();

messageRoutes.get('/', (req, res) => {
  res.send('Reached messages GET route successfully');
});

module.exports = messageRoutes;