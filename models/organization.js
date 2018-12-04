const mongoose = require('mongoose'),
       Schema = mongoose.Schema;

const organizationSchema = new Schema({
  name: String,
  type: { type: String, enums: ['ONG', 'Shelter', ''] },
  contact: {
    email: String,
    responsible: { type: mongoose.SchemaTypes.ObjectId, ref: 'Agent' },
    address: {
      city: String,
      state: String,
      street: String,
    },
  },
  agents: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Agent' }],
  persons: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Person' }],
},
{
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
});

const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;
