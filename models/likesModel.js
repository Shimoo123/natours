const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
    required: [true, 'like must belong to a Tour!']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'like must belong to a User!']
  }
 
});
likeSchema.index({ tour: 1, user: 1 }, { unique: true });
likeSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'tour',
    select: 'name'
  });

  next();
});

const Like = mongoose.model('Like',likeSchema);
module.exports = Like;