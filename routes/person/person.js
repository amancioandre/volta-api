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
  console.log(req.query.q);
  if (req.query.q && req.query.q.length > 0) {
    const reg = new RegExp(req.query.q, 'i');
    Person.find().or([{ 'name.firstName': reg }, { 'name.lastName': reg }])
    // .populate
      .then((persons) => {
        res.json(persons);
      })
      .catch((err) => {
        res.json(err);
      });
  } else {
    Person.find()
    // .populate
      .then((persons) => {
        res.json(persons);
      })
      .catch((err) => {
        res.json(err);
      });
  }
});

router.post('/', uploadCloud.single('picture'), (req, res, next) => {
  console.log('REQ BODY ->', req.body);
  let person = {};
  if (req.file) {
    person = personBuilder(req.body.person, req.file);

    console.log(person);
    Person.create(person)
      .then((response) => {
        res.json(response);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  } else {
    person = personBuilder(req.body.person);
    console.log(person);
    Person.create(person)
      .then((response) => {
        res.json(response);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  }
});

/* Show Specific and Update/Patch */
router.get('/:personId', validateId, (req, res, next) => {
  const personId = req.params.personId;
  Person.findOne({ _id: personId })
    // .populate()
    .then((person) => {
      res.json(person);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.patch('/:personId', validateId, (req, res, next) => {
  const person = personBuilder(req.body.person, req.file);
  const personId = req.params.personId;

  console.log(req.body.person);
  Person.findOneAndUpdate({ _id: personId }, person)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.patch('/:personId/picture', validateId, uploadCloud.single('picture'), (req, res, next) => {
  const picture = {
    picture: {
      picName: req.file.originalname,
      picPath: req.file.url,
    },
  };
  const personId = req.params.personId;

  Person.findOneAndUpdate({ _id: personId }, picture)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.patch('/:personId/position', validateId, (req, res, next) => {
  const { position } = req.body;
  const personId = req.params.personId;
  console.log('POSITION ->', position);
  Person.findOneAndUpdate({ _id: personId }, { 'locations.geoReferences': position })
    .then((response) => {
      console.log(response);
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
