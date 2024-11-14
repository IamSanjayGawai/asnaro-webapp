const mongoose = require('mongoose');

// Define the schema
const securityAuthoritySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rank: {
    type: Number,
    required: true
  }
});

// Create the model
const SecurityAuthority = mongoose.model('SecurityAuthority', securityAuthoritySchema);

module.exports = SecurityAuthority;
