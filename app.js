require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

/* APP INITIALIZATION */
const app_name = require('./package.json').name;

const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

/* DATABASE CONNECTION */
const databaseName = process.env.DATABASE_NAME;

mongoose
  .connect(`mongodb://localhost/${databaseName}`, { useNewUrlParser: true })
  .then((output) => {
    console.log(`Connected to Mongo: Database name: ${output.connections[0].name}`);
  })
  .catch((err) => {
    console.log('Error: ', err);
  });

/* APP SETUP */
/* Middlewares */
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Add authentication and session middlewares.

app.use(session({
  secret: 'some secret goes here',
  resave: true,
  cookie: { maxAge: 60000 },
  saveUninitialized: true,
}));

/* Cors */

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000'],
}));

/* Static Files */
app.use(express.static(path.join(__dirname, 'public')));

/* APP ROUTES */
// const index = ('./routes/index');

// app.use('/', index)
const personsRoute = require('./routes/persons/persons');
const usersRoute = require('./routes/user/user');
const loginRoute = require('./routes/auth/login');
// const orgsRoute = require('./routes/organization/organization');

app.use('/api/persons', personsRoute);
app.use('/api/users', usersRoute);
app.use('/api/auth', loginRoute);

module.exports = app;
