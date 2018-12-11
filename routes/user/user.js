const express = require('express');
const uploadCloud = require('../../src/cloudinary');
const router = express.Router();
const { userBuilder } = require('../../src/helpers/builder');
const { validateId } = require('../../src/helpers/middleware');
const User = require('../../models/user');
const { createPassword } = require('../../src/helpers/auth-middleware');

/* Model */
// const User = require('../../models/user');

/* RESTFUL ROUTES */
/* Show and Create */
router.get('/', (req, res, next) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.json(err);
    });
});

/* Create and Send Picture to CDN */
router.post('/', (req, res, next) => {
  const user = userBuilder(req.body.user);

  createPassword(user).then((hash) => {
    user.password = hash;

    User.create(user)
      .then((response) => {
        res.json(response);
      })
      .catch((err) => {
        res.json(err);
      });
  });
});

// Verify with user is logged

router.get('/loggedin', (req, res, next) => {
  console.log('$$$$$$', req.session);
  if (req.session.user) {
    res.status(200).json(req.session.user);
    return;
  }
  res.status(403).json({ message: 'Unauthorized' });
});

// Logout 
router.get('/logout', (req, res, next) => {
  console.log('estoyaqui!!');
  req.session.destroy(err => console.log(err));
  console.log(req.session);
  res.status(200).json({ message: 'Log out success!' });
});


/* Show Specific and Update/Patch */
router.get('/:userId', validateId, (req, res, next) => {
  User.findOne({ _id: req.params.userId })
    // .populate()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.patch('/:userId', validateId, (req, res, next) => {
  const user = userBuilder(req.body);

  User.findOneAndUpdate({ _id: req.params.userId }, user)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
    });
});

/* Delete */
router.delete('/:userId', validateId, (req, res, next) => {
  User.findOneAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `User with ${req.params.userId} has been removed.` });
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
