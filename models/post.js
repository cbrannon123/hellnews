var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  body: String,
  require: true
}, {
  timestamps: true
});

var PostSchema = new mongoose.Schema({
  title: String,
  body: String,
  upvotes: { type: Number, default: 0 },
  comments: [CommentSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model("Post", PostSchema);