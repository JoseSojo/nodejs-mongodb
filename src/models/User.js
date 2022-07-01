const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcryptjs = require('bcryptjs');

const UserSchema = new Schema({
  username: {type: String, require: true},
  email: {type: String, require: true},
  password: {type: String, require: true},
  date: {type: Date, default: Date.now}
});

UserSchema.methods.encryptPassword = async (password) => {
  const salt = await bcryptjs.genSalt(10);
  const hash = await bcryptjs.hash(password, salt);
  return hash;
};

UserSchema.methods.matchPassword = async function (password) {
  return await bcryptjs.compare(password, this.password)
};

module.exports = mongoose.model('User', UserSchema);
