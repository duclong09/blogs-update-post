const mongoose = require("mongoose");
const commentSchema = mongoose.Schema({
  commentUser: String,
  commentContent: String,
  createAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Comment", commentSchema);


// const mongoose = require("mongoose");

// const postSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     description: { type: String, required: true },
//     date: { type: Date, default: Date.now },
//     userId: { type: mongoose.Schema.ObjectId, ref: "User" }
// });

// const Post = mongoose.model("Post", postSchema);

// module.exports = Post;
