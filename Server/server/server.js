const express = require('express');
const resolve = require('path').resolve;
const app = express();
const apiRoutes = require('./api-routes');
const authRoutes = require('./auth-routes');
const connectDb = require('./database');

connectDb();

app.use('/auth', authRoutes());
app.use('/api', apiRoutes());

app.use(express.static((resolve(process.cwd(), 'public'))));

app.use((req, res, next) => {
  res.status(404).send('Page not found...');
  next();
});

app.listen(8080, () => {
  console.log('Express server is running!');
});

