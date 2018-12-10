const mongoose = require('mongoose'), 
        Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    firstName: String,
    lastName: String,
  },
  email: String,
  username: String,
  password: String,
  organization: { type: mongoose.SchemaTypes.ObjectId, ref: 'Organization' },
  dateOfBirth: { type: Date },
  people: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Person' }],
  role: { type: String, enums: ['Agent', 'Conventional'] },
}, {
  timestamps: { createdAt: 'createdAd', updatedAt: 'updatedAt' },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
