const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String },
  isUnfluencer: { type: Boolean, default: false },
  likes: [{ type: mongoose.Schema.ObjectId, ref: 'Image' }],
  dislikes: [{ type: mongoose.Schema.ObjectId, ref: 'Image' }],
  following: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  images: [{type: mongoose.Schema.ObjectId, ref: 'Image' }]
});

schema
  .virtual('followers', {
    localField: '_id',
    foreignField: 'following',
    ref: 'User'
  });

// set up the passwordConfirmation virtual
schema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    // store the password on the user model temporarily so we can access it in our pre-validate hook
    // `this` refers to the user object
    this._passwordConfirmation = passwordConfirmation;
  });

// set up a pre-validate hook
schema.pre('validate', function checkPassword(next) {
  // check if the password has been modified and if so whether the password and the passwordConfirmation match
  // if not invalidate the passwordConfirmation, so that the validations fail
  if(this.isModified('password') && this._passwordConfirmation !== this.password) this.invalidate('passwordConfirmation', 'does not match');

  // otherwise continue to the next step (validation)
  next();
});

schema.pre('save', function hashPassword(next) {
  // if the password has been modified, it needs to be hashed
  if(this.isModified('password')) {
    // hash the password with bcrypt and store the hashed password on the user object
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }

  // continue to the next step (save)
  next();
});
// methods is like prototype so validatePassword. passin plain text and looks on user object if we hashed password is it the same as this.password
schema.methods.validatePassword = function validatePassword(password) { //password in red is us passing in plain text password
  return bcrypt.compareSync(password, this.password);
};

schema.methods.hasLiked = function hasLiked(image) {
  // .some method returns true if one item in the array passes the test
  // we loop over the user's likes array (array of ids)
  // we check to see if any of those ids matches the id of the image that we have passed in
  return this.likes.some((like) => {
    return like.equals(image._id);
  });
};

schema.set('toJSON', { virtuals: true });


module.exports = mongoose.model('User', schema);
