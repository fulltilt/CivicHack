var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  title: String,
  modifiedOn: { type: Date, default: Date.now },
  createdOn: { type: Date, default: Date.now },
  entry: String,
  voteCount: { type: Number, default: 0 },
  votes: [{ user_id : mongoose.Schema.Types.ObjectId , type: Number }],
  postedBy: { type: String, ref: 'User' }
});

module.exports = mongoose.model( 'Post', postSchema );