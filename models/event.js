const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

commentSchema.methods.ownedBy = function ownedBy(user) {
  return this.createdBy.id === user.id;
};

const eventSchema = new mongoose.Schema({
  activity: { type: String, required: true},
  date: { type: String },
  time: { type: String },
  image: { type: String, required: true },
  address1: { type: String, required: true },
  address2: { type: String, required: true },
  postcode: { type: String, required: true },
  createdBy: {type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  comments: [ commentSchema ]
});

module.exports = mongoose.model('Event', eventSchema);
