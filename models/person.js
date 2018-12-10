const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const personSchema = new Schema({
  name: {
    firstName: String,
    lastName: String,
    alias: String,
  },
  dateOfBirth: Date,
  status: { type: String, enums: ['Missing', 'Deceased', 'Pendent', 'Homeless'] },
  sex: { type: String, enums: ['Male', 'Female'] },
  locations: {
    ofBirth: {
      city: String,
      address: String,
      state: String,
      zip: Number,
    },
    geoReferences: [{ geoHash: { type: String } }, { timestamps: { createdAt: 'created_at' } }],
  },
  background: {
    profession: String,
    degree: { type: String, enums: ['Non-alphabetized', 'Basic', 'College', 'Master'] },
    maritalStatus: { type: String, enums: ['maried', 'single', 'widwed'] },
  },
  picture: String, // <<<<<<< ---- FIX THIS!!!!
  appearance: {
    bodyType: { type: String, enums: ['Skinny', 'Athletical', 'Fat'] },
    eyeColor: { type: String, enums: ['Brown', 'Green', 'Blue'] },
    skinColor: { type: String, enums: ['Black', 'Dark Brown', 'Brown', 'Yellow', 'Caucasian'] },
    hairType: { type: String },
    height: Number,
    weight: Number,
    tattoos: [{ type: String }],
  },
  health: {
    drugs: [{ type: Boolean }],
    amputhee: [{ type: String, enums: ['No', 'Left Arm/Hands', 'Right Arm/Hands', 'Left Leg/Feet', 'Right Leg/Feet'] }],
    mental: [{ type: String }],
    diseases: [{ type: String }],
  },
  documents: {
    registry: Number,
    economicReg: Number,
    driverLicense: Number,
    birthCertificate: Number,
    professionalLicense: Number,
  },
}, {
  timestamps: { createdAt: 'Created_at', updatedAt: 'Updated_at' },
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
