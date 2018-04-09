const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String },
  user: { type: mongoose.Schema.ObjectId, ref: 'User'}
}, {
  timestamps: true
});

commentSchema
  .virtual('formattedDate')
  .get(function getFormattedDate() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return monthNames[this.createdAt.getMonth()] + '-' + this.createdAt.getFullYear();
  });

commentSchema.methods.isOwnedBy = function(user) {
  return this.user && user._id.equals(this.user._id);
};

// const likeSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.ObjectId, ref: 'User'}
// });
// const dislikeSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.ObjectId, ref: 'User'}
// });

const schema = new mongoose.Schema({
  image: { type: String, required: true },
  caption: { type: String, maxlength: 380 },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' },
  comments: [ commentSchema ]
});

module.exports = mongoose.model('Image', schema);
