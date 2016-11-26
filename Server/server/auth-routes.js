const authRouter = require('express').Router({ mergeParams: true });
const jwt = require('jsonwebtoken');
const cors = require('cors');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const config = require('./configs');

const User = require('./models/user');

module.exports = function authRoutes() {

  authRouter.use(cors({
    // TODO: Add origin whitelist to configs.
    origin: ['http://localhost:3000'],
    credentials: true
  }));

  authRouter.use(bodyParser.json());
  authRouter.use(cookieParser());

  authRouter.post('/login', (req, res) => {
    const { email, password } = req.body;
    // TODO: Check if user has valid token.
    User.findOne({ email }, (err, user) => {
      if(err) return res.status(500).json({ error: 'There was a problem.'});
      if(!err && user) {
        user.checkPassword(password, (err, match) => {
          if(err) return res.status(500).json({ error: 'There was a problem.'});
          if(!match) return res.status(403).json({ error: 'Wrong credentials.'});
          if(!err && match) {
            const sessionUser = { _id: user.id, name: user.name, email: user.email };
            const JWT = jwt.sign(sessionUser, config.get('APP_SECRET'));
            res.status(200).cookie('token', JWT, {
              secure: config.get('HTTPS'),
              // TODO: Add session expiration to configs.
              // TODO: Add domain to config.
              maxAge: 7200000, // 2 hrs
              httpOnly: true
            }).json({ success: 'You\'re logged in. Enjoy.'});
          }
        });
      } else {
        res.status(403).json({ error: 'User not found.'});
      }
    });
  });

  authRouter.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    User.findOne({ email }, (err, user) => {
      if (err) return res.status(500).status({ error: 'There was a problem.' });
      if(!err && user) {
        res.status(403).json({ error: 'Could not register.'})
      } else {
        User.create({ name, email, password }, (err, user) => {
          if (err) return res.status(500).json({ error: 'There was a problem.' });
            const sessionUser = { _id: user.id, name: user.name, email: user.email };
            const JWT = jwt.sign(sessionUser, config.get('APP_SECRET'));

            res.status(200).cookie('token', JWT, {
              secure: config.get('HTTPS'),
              // TODO: add session expire to config
              maxAge: 7200000, // 2 hrs
              httpOnly: true
            }).json({ success: 'You\'re logged in. Enjoy.'});
        });
      }
    });
  });

  authRouter.post('/logout', (req, res) => {
    if(req.cookies.token) {
      res.clearCookie('token');
    }
    res.status(200).json({ success: 'Thank you come again.' });
  });

  authRouter.get('/checktoken', (req, res) => {
    if(req.cookies.token) {
      res.sendStatus(200);
    } else {
      res.sendStatus(403);
    }
  });

  return authRouter;
}
