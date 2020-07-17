const mongoose = require('mongoose');
// uniqueValidator is a plugin - feature provided by moongose
// cannot add plugins directly to schema
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// extra hook that is checked before save
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
