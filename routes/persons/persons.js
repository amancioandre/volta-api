const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

/* Models */
const Person = require('../../models/person');

/* Middlewares */
const validateId = require('../../src/helpers/middleware').validateId
console.log(validateId)

/* RESTFUL ROUTES */
/* Show and Create */
router.get('/', (req, res, next) => {
  Person.find()
    // .populate
    .then(persons => {
      res.json(persons)
    })
    .catch(err => {
      res.json(err)
    })
})

router.post('/', (req, res, next) => {
  // Destructure form

  Person.create({})
    .then(response => {
      res.json(response)
    })
    .catch(err => {
      res.json(err)
    })
});

/* Show Specific and Update/Patch */
router.get('/:personId', validateId, (req, res, next) => {

  Person.findOne(req.params.personId)
    // .populate()
    .then(person => {
      res.json(person)
    })
    .catch(err => {
      res.json(err)
    })
})

router.put('/:personId', validateId, (req, res, next) => {
  // Destructure form body

  Person.findOneAndUpdate(req.params.id)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    })
})

/* Delete Route */
router.delete('/:personId', validateId, (req, res, next) => {
  Person.findOneAndDelete(req.params.personId)
    .then(() => {
      res.json({ message: `Person with ${req.params.personId} has been removed.`})
    })
    .catch(err => {
      res.json(err);
    })
})

module.exports = router;