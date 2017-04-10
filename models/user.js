const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  username: { type: String },
  email: { type: String },
  password: { type: String },
  profileImage: { type: String },
  facebookId: { type: String },
  knowHen: { type: String },
  funnyStory: { type: String }
});

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema
  .virtual('profileImageSRC')
  .get(function getprofileImageSRC() {
    if(!this.profileImage) return null;
    if(this.profileImage.match(/^http/)) return this.profileImage;
    return `https://s3-eu-west-1.amazonaws.com/wdi25-samsw69-project/${this.profileImage}`;
  });

userSchema.pre('validate', function checkPassword(next) {
  if(!this.password && !this.facebookId) {
    this.invalidate('password', 'required');
  }
  if(this.isModified('password') && this._passwordConfirmation !== this.password) this.invalidate('passwordConfirmation', 'does not match');
  next();
});

userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

userSchema.methods.validatePassword = function validatePassword(password) {
  console.log(password, this.password);
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
