require('dotenv').config();

const mongoose = require('mongoose');

/* Seeds */
// const userSeed = require('./user.json');
// const orgSeed = require('./orgSeed.json');
const personSeed = require('./personSeed')

/* Models */
const User = require('../../models/user');
const Organization = require('../../models/organization');
const Person = require('../../models/person');

const dbName = 'volta-api';


mongoose
  .connect(`mongodb://localhost/${dbName}`, { useNewUrlParser: true })
  .then(output => {
  console.log(`Connected to Mongo: Database name: ${output.connections[0].name}`);
  })
  .catch(err => {
  console.log('Error: ', err);
  })
// User.collection.drop();
// Organization.collection.drop();
Person.collection.drop();

personSeed.forEach(person =>{
  const newPerson = new Person(person);
  return newPerson.save()
    .then(res => {
      console.log("create", newPerson.name);
      return `Person created`
    })
    .catch(err => {
      throw new Error(`Impossible to add the person. ${err}`);
    })
})


