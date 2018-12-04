const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const personSchema = new Schema({
  name: {
    fistName: String,
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
    lastKnownCity: String,
    geoReferences: [{ type: mongoose.SchemaType.ObjectId, ref: 'Local' }],
  },
  background: {
    profession: String,
    degree: { type: String, enums: ['Non-alphabetized', 'Basic', 'College', 'Master'] },
    maritalStatus: [{ enum: ['maried', 'single', 'widwed'] }],
  },
  picture: String, // <<<<<<< ---- FIX THIS!!!!
  appearance: {
    bodyType: { type: String, enums: ['Skinny', 'Athletical', 'Fat'] },
    eyeColor: { type: String, enums: ['Brown', 'Green', 'Blue'] },
    skinColor: { type: String, enums: ['Black', 'Dark Brown', 'Brown', 'Yellow', 'Caucasian'] },
    hairType: { type: String, enums: [''] },
    height: Number,
    weight: Number,
    tattoos: [{ type: String }],
  },
  health: {
    drugs: [{ type: String, enums: ['None', ''] }],
    amputhee: [{ type: String, enums: ['No', 'Left Arm/Hands', 'Right Arm/Hands', 'Left Leg/Feet', 'Right Leg/Feet'] }],
    mental: [{ type: String, enums: ['CID'] }],
    diseases: [{ type: String, enums: ['CID'] }],
  },
  documents: {
    registry: Number,
    economicReg: Number,
    driverLicense: Number,
    birthCertificate: Number,
    professionalLicense: Number,
  },
}, {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
