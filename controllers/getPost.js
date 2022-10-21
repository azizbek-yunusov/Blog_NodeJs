const Post = require("../models/Post")

module.exports = async (req, res) => {
  // findById orqali biron postga bosganda shu post "id" si orqali fopadi va post object qaytaradi
  const post = await Post.findById(req.params.id)
  console.log(post);
  res.render("post", {post})
}