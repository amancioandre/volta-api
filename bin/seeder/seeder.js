const mongoose = require('mongoose');

/* Seeds */
const userSeed = require('./user.json');
const orgSeed = require('./orgSeed.json');
const personSeed = require('./personSeed.json')

/* Models */
const User = require('../../models/user');
const Organization = require('../../models/organization');
const Person = require('../../models/person');


mongoose
  .connect(`mongodb://localhost/${process.env.DATABASE_NAME}`, { useNewUrlParser: true })
User.collection.drop();
Organization.collection.drop();
Person.collection.drop();

const createPersons = personSeed.forEach(person =>{
  const newPerson = new Person({person});
  return newPerson.save()
    .then(res => {
      return person.name
    })
    .catch(err => {
      throw new Error(`Impossible to add the person. ${error}`);
    })
})


