const express = require('express');
const uploadCloud = require('../../src/cloudinary');
const router = express.Router();

/* Models */
const Person = require('../../models/person');

/* Middlewares */
const { validateId } = require('../../src/helpers/middleware');
const { personBuilder } = require('../../src/helpers/builder');

/* RESTFUL ROUTES */
/* Show and Create */
router.get('/', (req, res, next) => {
  let query = {};
  console.log(req.query.q);
  if (req.query.q && req.query.q.length > 0) {
    query = { };
  }
  console.log(query);

  Person.find(query)
    // .populate
    .then((persons) => {
      res.json(persons);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post('/', uploadCloud.single('picture'), (req, res, next) => {
  console.log(req.file.originalname);
  const person = personBuilder(req.body, req.file);
  console.log(person);
  Person.create(person)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

/* Show Specific and Update/Patch */
router.get('/:personId', validateId, (req, res, next) => {
  Person.findOne(req.params.personId)
    // .populate()
    .then((person) => {
      res.json(person);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.patch('/:personId', validateId, uploadCloud.single('picture'), (req, res, next) => {
  const person = personBuilder(req.body, req.file);
  const personId = req.params.personId;

  Person.findOneAndUpdate({ _id: personId }, person)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
    });
});

/* Delete Route */
router.delete('/:personId', validateId, (req, res, next) => {
  Person.findOneAndDelete(req.params.personId)
    .then(() => {
      res.json({ message: `Person with ${req.params.personId} has been removed.` });
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
