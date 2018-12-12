const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const personSchema = new Schema({
  name: {
    firstName: String,
    lastName: String,
    alias: String,
  },
  dateOfBirth: Date,
  status: { type: String, enums: ['Missing', 'Deceased', 'Pendent', 'Homeless'], default: 'Homeless' },
  sex: { type: String, enums: ['Male', 'Female'] },
  locations: {
    ofBirth: {
      city: { type: String, default: 'Unknown' },
      address: { type: String, default: 'Unknown' },
      state: { type: String, default: 'Unknown' },
      zip: { type: String, default: 'Unknown' },
    },
    geoReferences: [{ lat: Number, lng: Number }],
  },
  background: {
    profession: { type: String, default: 'Unknown' },
    degree: { type: String, enums: ['Non-alphabetized', 'Basic', 'College', 'Master', 'PhD', 'Unknown'], default: 'Unknown' },
    maritalStatus: { type: String, enums: ['Maried', 'Single', 'Widwed', 'Unknown'], default: 'Unknown' },
  },
  picture: {
    picName: { type: String, default: 'Avatar' },
    picPath: { type: String, default: 'https://res.cloudinary.com/stormamnc/image/upload/v1544470625/volta-api/people/person_picture_alt.png'},
  },
  appearance: {
    bodyType: { type: String, enums: ['Skinny', 'Athletical', 'Fat'], default: 'Skinny' },
    eyeColor: { type: String, enums: ['Brown', 'Green', 'Blue'] },
    skinColor: { type: String, enums: ['Black', 'Dark Brown', 'Brown', 'Yellow', 'Caucasian'] },
    hairType: { type: String },
    height: Number,
    weight: Number,
    tattoos: [{ type: String, default: 'None' }],
  },
  health: {
    drugs: [{ type: Boolean, default: 'Unknown' }],
    amputhee: [{ type: String, enums: ['No', 'Left Arm/Hands', 'Right Arm/Hands', 'Left Leg/Feet', 'Right Leg/Feet'], default: 'No' }],
    mental: [{ type: String, default: 'Unknown' }],
    diseases: [{ type: String, default: 'Unknown' }],
  },
  documents: {
    registry: { type: String, default: 'Unknown' },
    economicReg: { type: String, default: 'Unknown' },
    driverLicense: { type: String, default: 'Unknown' },
    birthCertificate: { type: String, default: 'Unknown' },
    professionalLicense: { type: String, default: 'Unknown' },
  },
}, {
  timestamps: { createdAt: 'Created_at', updatedAt: 'Updated_at' },
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
