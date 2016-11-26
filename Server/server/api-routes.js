const apiRouter = require('express').Router({ mergeParams: true });
const Snake = require('./models/snake');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require('./models/user');

// TODO: CSRF TOKEN!!!

module.exports = function apiRoutes() {

  apiRouter.use(cors({
    // TODO: Add origin whitelist to configs.
    origin: ['http://localhost:3000'],
    credentials: true
  }));

  apiRouter.use(cookieParser());

  apiRouter.use((req, res, next) => {
    // TODO: rename token to something less generic.
    // TODO: Check, is session is too old.
    if(!req.cookies.token) return res.status(403).json({ error: 'Not allowed to access this resource.'});
    const sessionUser = jwt.decode(req.cookies.token);
    User.findOne({ email: sessionUser.email }, (err, user) => {
      if(err) return res.status(500).json(err);
      if(!user) return res.status(403).json({ error: 'Not allowed to access this resource.'});
      if(!err && user) {
        next();
      }
    });
  });

  apiRouter.get('/snakes', (req, res) => {
    Snake.find({}, (err, snakes) => {
      if(err) return res.status(500).json({ error: err });
      res.status(200).json(snakes);
    });
  });

  return apiRouter;
}
