const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const validateId = require('../../src/helpers/middleware').validateId;

/* Model */
const User = require('../../models/user');

/* RESTFUL ROUTES */
/* Show and Create */
router.get('/', (req, res, next) => {
  User.find()
    .then(users => {
      res.json(users)
    })
    .catch(err => {
      res.json(err)
    })
});

router.post('/', (req, res, next) => {
  // Destructure form

  Person.create()
    .then(response => {
      res.json(response)
    })
    .catch(err => {
      res.json(err)
    })
});

/* Show Specific and Update/Patch */
router.get('/:userId', validateId, (req, res, next) => {
  Person.findOne(req.params.userId)
    // .populate()
    .then(user => {
      res.json(user)
    })
    .catch(err => {
      res.json(err)
    })
});

router.post('/:userId', validadeId, (req, res, next) => {
  // Destructure Form

  User.findOneAndUpdate(req.params.userId)
    .then(response => {
      res.json(response)
    })
    .catch(err => {
      res.json(err)
    })
});

/* Delete */
router.delete('/:userId', validadeId, (req, res, next) => {
  User.findOneAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `User with ${req.params.userId} has been removed.`})
    })
    .catch(err => {
      res.json(err);
    })
})

module.exports = router;