const express = require('express');
const uploadCloud = require('../../src/cloudinary');

const router = express.Router();

/* Models */
const Person = require('../../models/person');
const User = require('../../models/user');
/* Middlewares */
const { validateId } = require('../../src/helpers/middleware');
const { personBuilder } = require('../../src/helpers/builder');

/* RESTFUL ROUTES */
/* Show and Create */
router.get('/', (req, res, next) => {
  if (req.query.q && req.query.q.length > 0) {
    const reg = new RegExp(req.query.q, 'i');
    Person.find().or([{ 'name.firstName': reg }, { 'name.lastName': reg }, { 'name.alias': reg }])
      .then((people) => {
        res.json(people);
      })
      .catch((err) => {
        res.json(err);
      });
  } else {
    Person.find()
      .then((people) => {
        res.json(people);
      })
      .catch((err) => {
        res.json(err);
      });
  }
});

router.post('/', uploadCloud.single('picture'), (req, res, next) => {
  let person = {};
  const { id } = req.body;
  if (req.file) {
    person = personBuilder(req.body.person, req.file);
    Person.create(person)
      .then((response) => {
        res.json(response);
      })
      .catch((err) => {
        res.json(err);
      });
  } else {
    person = personBuilder(req.body.person);
    Person.create(person)
      .then((response) => {
        const personId = { people: response._id };
        User.findOneAndUpdate(
          id,
          { $addToSet: personId },
          {
            new: true,
          },
        ).then(() => {
        }).catch((err) => {
          res.json(err);
        });
        res.json(response);
      })
      .catch((err) => {
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
