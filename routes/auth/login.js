const express = require('express');

const router = express.Router();
const { authenticate } = require('../../src/helpers/auth-middleware');
const User = require('../../models/user');

router.post('/', (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({ username })
    .then((user) => {
      if (authenticate(user, password)) {
        req.session.user = user;
        res.status(200).json(user);
      } else res.status(401).json({ message: 'Incorrect user or password' });
    })
    .catch((err) => {
      res.json(err);
    });
});


module.exports = router;
