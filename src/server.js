'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
// const parser = require('body-parser');
// const urlencodedParser = parser.urlencoded({extended : false});

// Middleware
const logger = require('./middleware/logger');
const notFoundHandler = require('./error-handlers/404');
const serverError = require('./error-handlers/500');
const routeClothes = require('./routes/clothes');
const routeTodo = require('./routes/todo');

const mongoose = require('mongoose');
const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(process.env.MONGOOSE_URI, options);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(parser .json());
// app.use(urlencodedParser) 
app.use(logger);
app.use(routeClothes);
app.use(routeTodo);

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", '*');
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
//   next();
// });

app.use('*', notFoundHandler);
app.use(serverError);

module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Where\'s the port?') };
    app.listen(port, () => console.log(`Order up on ${port}!`))
  }
}
