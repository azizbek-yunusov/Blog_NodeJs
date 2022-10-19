const Post = require("../models/Post");
const path = require("path");

module.exports = (req, res) => {
  const { image } = req.files;
  // create post qilinganda "image" object qaytaradi shunda "mv" funksiya bu funksiya orqali fayllarga yo'l ko'rsatiladi 
  image.mv(path.resolve(__dirname, "..", "public/posts", image.name), (err) => {
    if (err) {
      console.log(err);
    }
    // req.body orqali inputdagi barcha element olinadi
    Post.create({ ...req.body, image: `/posts/${image.name}` }, (err, post) => {
      // yangi post jo'natilgandan keyin bosh sahiga redirect qilinadi
      res.redirect("/");
    })
  })
}