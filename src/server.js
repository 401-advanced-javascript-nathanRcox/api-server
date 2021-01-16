'use strict';

const express = require('express');
const app = express();

// Middleware
const logger = require('./middleware/logger');
const notFoundHandler = require('./error-handlers/404');
const serverError = require('./error-handlers/500');
const routeClothes = require('./routes/clothes');
//const routeTwo

const mongoose = require('mongoose');
const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(process.env.MONGOOSE_URI, options);

app.use(express.json());
app.use(logger);
app.use(routeClothes);
//app.use(routeTwo);

app.use('*', notFoundHandler);
app.use(serverError);

module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Where\'s the port?'); };
    app.listen(port, () => console.log(`Order up on ${port}!`)
    .catch(err => console.error('Server failed to start.', err)))
  }
}
