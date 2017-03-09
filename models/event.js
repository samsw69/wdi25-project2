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
  henName: { type: String, required: true },
  activity: { type: String, required: true },
  date: { type: String },
  time: { type: String },
  image: { type: String },
  address1: { type: String, required: true },
  address2: { type: String, required: true },
  postcode: { type: String, required: true },
  createdBy: {type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  description: { type: String },
  lat: {type: Number },
  lng: {type: Number },
  comments: [ commentSchema ]

});

module.exports = mongoose.model('Event', eventSchema);
