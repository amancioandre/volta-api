require('dotenv').config();

const express = require('express'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      session = require('express-session');

/* APP INITIALIZATION */
const app_name = require('./package.json').name,
      debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);
      app = express();

/* DATABASE CONNECTION */
mongoose
.connect('http://localhost/database-name:27017', { useNewUrlParser: true })
.then(output => {
  console.log(`Connected to Mongo: Database name: ${output.connections[0].name}`);
})
.catch(err => {
  console.log('Error: ', err);
})

/* APP SETUP */ 
/* Middlewares */
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParter.urlencoded({ extended: false }));
app.use(cookieParser());
// Add authentication and session middlewares.

/* Static Files */
app.use(express.static(path.join(__dirname, 'public')));

/* APP ROUTES */
const index = ('./routes/index');

app.use('/', index)

module.export = app;