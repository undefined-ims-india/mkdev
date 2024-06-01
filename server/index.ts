const path = require('path');
const express = require('express');
require('dotenv').config({path: '../.env'}) //???

const route = require('./routes/index.ts')
const {PORT = 3000} = process.env;

const CLIENT = path.resolve(__dirname, 'client/index.html')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static(CLIENT))
app.use('/api', route);

app.listen(PORT, () => {
  console.info(`http://localhost:${PORT} \n\n http://127.0.0.1:${PORT}`)
})

module.exports = {
  app,
}