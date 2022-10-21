const Post = require("../models/Post");

module.exports = async (req, res) => {
  // console.log(req.session);
  // find orqali bazada barcha postlar olinadi posts massiv qaytdaradi
  const posts = await Post.find().populate("author", "username");
  console.log(posts);
  res.render("index", {posts});
}