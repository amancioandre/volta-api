const mongoose = require('mongoose');

const  Schema = mongoose.Schema;

const localSchema = new Schema({
  geoHash: String,
},
{ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

const Local = mongoose.model('Local', localSchema);

module.exports = Local;
