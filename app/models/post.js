var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  title: String,
  modifiedOn: { type: Date, default: Date.now },
  createdOn: { type: Date, default: Date.now },
  entry: String,
  upVotes: [{ user_id : mongoose.Schema.Types.ObjectId , type: String }],
  downVotes: [{ user_id : mongoose.Schema.Types.ObjectId , type: String }],
  postedBy: { type: String, ref: 'User' }
});

module.exports = mongoose.model( 'Post', postSchema );