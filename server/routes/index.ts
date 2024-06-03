const { Router } = require('express')
/*
* all the routes for features
*/
const messages = require('./messages.ts')

const api = Router();
const routeHandler = Router();

// api.use(/*'/something', model? */)
api.all('/messages', messages);

// export default api
module.exports = api