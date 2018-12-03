/* Server Modules */
const http = require('http');

/* Server Scripts */
const app = require('../app');

/* ERROR HANDLING */
/* Catch 404 and send not-found route */
app.use((req, res, next) => {
  res.status(404, { message: 'API Route not find '});
})

/* Catch 500 error status */
app.use((req, res, next) => {
  // Error Logger
  console.log('Error', req.method, req.path, err);

  if(!res.headersSent) {
    res.status(500);
    res.send({ message: 'Error: 500' });
  }
})

/* SERVER INITIALIZATION */
const server = http.createServer(app)

server.on('error', err => {
  if(err.syscall !== 'listen') { throw err }

  // handle specific listen errors with friendly messages
  switch(err.code) {
    case 'EACCES':
      console.error(`Port ${process.env.PORT} requires elevated privileges.`);
      process.exit();
      break;
    case 'EADDRINUSE':
      console.log(`Port ${process.env.PORT} is already in use.`);
      process.exit();
      break;
    default:
      throw err;
  }
});

server.listen(process.env.PORT, () => {
  console.log(`Listening on http://localhost:${process.env.PORT}`);
})

