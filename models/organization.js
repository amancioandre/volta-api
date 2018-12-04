const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const organizationSchema = new Schema({
  name: String,
  type: { type: String, enums: ['ONG', 'Shelter', ''] },
  contact: {
    email: String,
    responsible: { type: mongoose.SchemaType.ObjectId, ref: 'Agent' },
    address: {
      city: String,
      state: String,
      street: String,
    },
  },
  agents: [{ type: mongoose.SchemaType.ObjectId, ref: 'Agent' }, { timestamps: { createdAt: 'created_at' } }],
  persons: [{ type: mongoose.SchemaType.ObjectId, ref: 'Person' }, { timestamps: { createdAt: 'created_at' } }],
},
{
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
});

const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;
