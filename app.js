const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const Routeruser = require('./routes/userRoutes');
const swaggerSetup = require('./Swagger');

const bodyParser = require('body-parser');

const app = express();

app.use(logger('dev'));
app.use(express.json());

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/api', Routeruser);
swaggerSetup(app);

module.exports = app;
